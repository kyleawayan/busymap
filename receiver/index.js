const noble = require("@abandonware/noble");

noble.on("stateChange", async (state) => {
  if (state === "poweredOn") {
    console.log("starting to scan");
    await noble.startScanningAsync();
  }
});

noble.on("discover", async (peripheral) => {
  console.log("device found! distance: ", peripheral.rssi);
});
