const bt = require("./bluetooth");

var reciever = new bt.BluetoothReciever();

reciever.startScanning();

setInterval(() => {
  console.log(reciever.devices);
  reciever.stopScanning();
  reciever.resetDeviceCount();
  reciever.startScanning();
}, 5000);
// setTimeout(() => {
//   console.log(reciever.devices);
//   console.log("sending stop");
//   reciever.stopScanning();
//   reciever.startScanning();
// }, 10000);
