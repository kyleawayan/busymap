import React, { useState } from "react";
import Head from "next/head";
import MapViewer from "../components/MapViewer/MapViewer";
import db from "../pages/api/db";
import InfoCard from "../components/InfoCard/InfoCard";
import { Transition } from "react-transition-group";
import InfoCardTextOnly from "../components/InfoCard/InfoCardTextOnly";

const INITIAL_VIEW_STATE = {
  target: [7000, 13000, 0],
  zoom: -5,
};

const ROOT_URL =
  "https://storage.googleapis.com/ucmerced_bm_maptiles/merced_map";
const fileName = "merced_map";

// For showing tile/map coordinates
// function getTooltip({ tile, bitmap, coordinate }) {
//   if (tile && bitmap) {
//     return `\
//     tile: x: ${tile.x}, y: ${tile.y}, z: ${tile.z}
//     (${bitmap.pixel[0]},${bitmap.pixel[1]}) in ${bitmap.size.width}x${bitmap.size.height}
//     map coordaintes: ${coordinate[0]}, ${coordinate[1]}`;
//   }
//   return null;
// }

function getTooltip({ object }) {
  if (object) {
    return `\
    ${object.name}`;
  }
  return null;
}

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  zIndex: 999,
  backgroundColor: "white",
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export default function UCMerced({ buildings }) {
  const [cardOpen, setCardOpen] = useState(true);
  const [selectedBuilding, setSelectedBuilding] = useState();

  const onBuildingClick = (marker) => {
    setCardOpen(true);
    setSelectedBuilding(marker.object);
  };

  const onNonMarkerClick = () => {
    setCardOpen(false);
  };

  return (
    <div>
      <Head>
        <title>UC Merced — BusyMap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {cardOpen && !selectedBuilding && (
        <InfoCardTextOnly
          title="Welcome!"
          text="Please select a green marker on the map to view more details."
        />
      )}
      {cardOpen && selectedBuilding && (
        <div>
          <InfoCard building={selectedBuilding} />
        </div>
      )}
      <MapViewer
        INITIAL_VIEW_STATE={INITIAL_VIEW_STATE}
        ROOT_URL={ROOT_URL}
        fileName={fileName}
        initZoom={15}
        getTooltip={getTooltip}
        buildings={buildings}
        onMarkerClick={onBuildingClick}
        onNonMarkerClick={onNonMarkerClick}
      />
    </div>
  );
}

export async function getStaticProps() {
  // TO DO: get DZI image data here too

  const response = await db.query("SELECT * FROM buildings");
  const buildings = response.rows;

  return {
    props: {
      buildings,
    },
  };
}
