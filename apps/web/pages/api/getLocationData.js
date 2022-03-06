import db from "./db";
export default async function handler(req, res) {
  if (!req.query.location) {
    res.status(400).json({ error: "no location" });
  }
  const response = await db.query("SELECT * FROM data WHERE location_id = $1", [
    req.query.location,
  ]);
  const locations = response.rows;
  res.status(200).json({ data: locations });
}
