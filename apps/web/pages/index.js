import Head from "next/head";
import MapViewer from "../components/MapViewer/MapViewer";
import db from "../pages/api/db";

const INITIAL_VIEW_STATE = {
  target: [20000, 20000, 0],
  zoom: -6,
};

const ROOT_URL =
  "https://storage.googleapis.com/ucmerced_bm_maptiles/merced_map";
const fileName = "merced_map";

function getTooltip({ tile, bitmap, coordinate }) {
  if (tile && bitmap) {
    return `\
    tile: x: ${tile.x}, y: ${tile.y}, z: ${tile.z}
    (${bitmap.pixel[0]},${bitmap.pixel[1]}) in ${bitmap.size.width}x${bitmap.size.height}
    map coordaintes: ${coordinate[0]}, ${coordinate[1]}`;
  }
  return null;
}

export default function Home({ buildings }) {
  return (
    <div>
      <Head>
        <title>UC Merced — BusyMap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MapViewer
        INITIAL_VIEW_STATE={INITIAL_VIEW_STATE}
        ROOT_URL={ROOT_URL}
        fileName={fileName}
        initZoom={15}
        getTooltip={getTooltip}
        autoHighlight
        buildings={buildings}
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
