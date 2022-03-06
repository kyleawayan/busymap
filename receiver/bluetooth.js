const noble = require("@abandonware/noble");

class BluetoothReciever {
  constructor(devices, running) {
    this.devices = 0;
    this.running = running;
    this.subscribed = false;
  }

  async scan() {
    return new Promise(async (resolve, reject) => {
      console.log("start scanning");
      await noble.startScanning();

      if (!this.subscribed) {
        this.subscribed = true;
        noble.on("discover", async (peripheral) => {
          this.devices = this.devices + 1;
        });
      }

      setTimeout(async () => {
        console.log("stop");
        await noble.stopScanning();
        await noble.reset();
        resolve();
      }, 3000);
    });
  }

  startScanning() {
    this.running = true;
    this.scan();
  }

  stopScanning() {
    this.running = false;
  }

  resetDeviceCount() {
    this.devices = 0;
  }
}

exports.BluetoothReciever = BluetoothReciever;
