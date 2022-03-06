import React, { useState, useEffect } from "react";
import DeckGL, { OrthographicView, COORDINATE_SYSTEM } from "deck.gl";
import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer } from "@deck.gl/layers";
import { load } from "@loaders.gl/core";
import { clamp } from "math.gl";

export default function MapViewer({
  INITIAL_VIEW_STATE,
  ROOT_URL,
  fileName,
  autoHighlight = false,
  getTooltip,
  initZoom,
}) {
  const [dimensions, setDimensions] = useState(null);

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

  return (
    <div>
      <DeckGL
        views={[new OrthographicView({ id: "ortho" })]}
        layers={[tileLayer]}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        getTooltip={getTooltip}
      />
    </div>
  );
}