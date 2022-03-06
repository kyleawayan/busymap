import React, { useState, useEffect } from "react";
import DeckGL, { OrthographicView, COORDINATE_SYSTEM } from "deck.gl";
import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer, IconLayer } from "@deck.gl/layers";
import { load } from "@loaders.gl/core";
import { clamp } from "math.gl";

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

export default function MapViewer({
  INITIAL_VIEW_STATE,
  ROOT_URL,
  fileName,
  autoHighlight = false,
  getTooltip,
  initZoom,
  buildings,
}) {
  const [dimensions, setDimensions] = useState(null);
  console.log(buildings);

  useEffect(() => {
    const getMetaData = async () => {
      const dziSource = `${ROOT_URL}/${fileName}.dzi`;
      const response = await fetch(dziSource);
      const xmlText = await response.text();
      const dziXML = new DOMParser().parseFromString(xmlText, "text/xml");

      if (
        Number(
          dziXML.getElementsByTagName("Image")[0].attributes.Overlap.value
        ) !== 0
      ) {
        console.warn("Overlap parameter is nonzero and should be 0");
      }
      setDimensions({
        height: Number(
          dziXML.getElementsByTagName("Size")[0].attributes.Height.value
        ),
        width: Number(
          dziXML.getElementsByTagName("Size")[0].attributes.Width.value
        ),
        tileSize: Number(
          dziXML.getElementsByTagName("Image")[0].attributes.TileSize.value
        ),
      });
    };
    getMetaData();
  }, [ROOT_URL, fileName]);

  const tileLayer =
    dimensions &&
    new TileLayer({
      pickable: true,
      tileSize: dimensions.tileSize,
      autoHighlight: autoHighlight,
      highlightColor: [60, 60, 60, 100],
      minZoom: -7,
      maxZoom: 0,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      extent: [0, 0, dimensions.width, dimensions.height],
      getTileData: ({ x, y, z }) => {
        return load(
          `${ROOT_URL}/${fileName}_files/${z + initZoom}/${x}_${y}.jpeg`
        );
      },

      renderSubLayers: (props) => {
        const {
          bbox: { left, bottom, right, top },
        } = props.tile;
        const { width, height } = dimensions;
        return new BitmapLayer(props, {
          data: null,
          image: props.data,
          bounds: [
            clamp(left, 0, width),
            clamp(bottom, 0, height),
            clamp(right, 0, width),
            clamp(top, 0, height),
          ],
        });
      },
    });

  const markerLayer = new IconLayer({
    id: "icon-layer",
    data: buildings,
    pickable: true,
    // iconAtlas and iconMapping are required
    // getIcon: return a string
    iconAtlas:
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
    iconMapping: ICON_MAPPING,
    getIcon: (d) => "marker",
    sizeScale: 10,
    getPosition: (d) => [d.coord_x, d.coord_y],
    getSize: (d) => 5,
    getColor: (d) => [0, 200, 0],
  });

  return (
    <div>
      <DeckGL
        views={[new OrthographicView({ id: "ortho" })]}
        layers={[tileLayer, markerLayer]}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        getTooltip={getTooltip}
      />
    </div>
  );
}
