import Head from "next/head";
import MapViewer from "../components/MapViewer/MapViewer";

const INITIAL_VIEW_STATE = {
  target: [20000, 20000, 0],
  zoom: -6,
};

const ROOT_URL =
  "https://storage.googleapis.com/ucmerced_bm_maptiles/merced_map";
const fileName = "merced_map";

function getTooltip({ tile, bitmap, coordinate }) {
  console.log(coordinate);
  if (tile && bitmap) {
    return `\
    tile: x: ${tile.x}, y: ${tile.y}, z: ${tile.z}
    (${bitmap.pixel[0]},${bitmap.pixel[1]}) in ${bitmap.size.width}x${bitmap.size.height}
    map coordaintes: ${coordinate[0]}, ${coordinate[1]}`;
  }
  return null;
}

export default function Home() {
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
      />
    </div>
  );
}
