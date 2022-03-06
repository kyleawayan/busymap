const bt = require("./bluetooth");
require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool();
// INSERT INTO public.data (date, value, location_id) VALUES ('2022-03-06 00:55:06.932000 +00:00', 2, 0)
var reciever = new bt.BluetoothReciever();

const args = process.argv.slice(2);

reciever.startScanning();

setInterval(() => {
  console.log("devices found:", reciever.devices);
  pool.query(
    "INSERT INTO public.data (date, value, location_id) VALUES ($1, $2, $3)",
    [new Date(), reciever.devices, args[0]]
  );
  reciever.stopScanning();
  reciever.resetDeviceCount();
  reciever.startScanning();
}, 60000);
// setTimeout(() => {
//   console.log(reciever.devices);
//   console.log("sending stop");
//   reciever.stopScanning();
//   reciever.startScanning();
// }, 10000);
