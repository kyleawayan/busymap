import db from "./db";
export default async function handler(req, res) {
  if (!req.query.building) {
    res.status(400).json({ error: "no building" });
  }
  const response = await db.query(
    `SELECT DISTINCT locations.*, data.* FROM locations, data WHERE building_id = $1 AND
    date = (SELECT MAX(date) FROM data WHERE data.location_id = locations.id)
    ORDER BY id, date DESC;`,
    [req.query.building]
  );
  const locations = response.rows;
  res.status(200).json({ locations: locations });
}
