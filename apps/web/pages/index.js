import React, { useState } from "react";
import Head from "next/head";
import MapViewer from "../components/MapViewer/MapViewer";
import db from "../pages/api/db";
import InfoCard from "../components/InfoCard/InfoCard";
import { Transition } from "react-transition-group";

const INITIAL_VIEW_STATE = {
  target: [20000, 20000, 0],
  zoom: -6,
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

export default function Home({ buildings }) {
  const [cardOpen, setCardOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState();

  const onBuildingClick = (building) => {
    setCardOpen(true);
    setSelectedBuilding(building);
  };

  return (
    <div>
      <Head>
        <title>UC Merced — BusyMap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Transition in={cardOpen} timeout={duration}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <InfoCard />
          </div>
        )}
      </Transition>
      <MapViewer
        INITIAL_VIEW_STATE={INITIAL_VIEW_STATE}
        ROOT_URL={ROOT_URL}
        fileName={fileName}
        initZoom={15}
        getTooltip={getTooltip}
        buildings={buildings}
        tileLayerPickable={false}
        onMarkerClick={onBuildingClick}
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
