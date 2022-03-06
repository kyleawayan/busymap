require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool();

const args = process.argv.slice(2);

setInterval(() => {
  const weightedRandom = [0, 0, 0, 0, 0, 0, 0, 1, 2, 3][
    Math.floor(Math.random() * 10)
  ];
  console.log("devices found:", weightedRandom);
  pool.query(
    "INSERT INTO public.data (date, value, location_id) VALUES ($1, $2, $3)",
    [new Date(), weightedRandom, args[0]]
  );
}, 60000);
