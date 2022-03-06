import db from "./db";
export default async function handler(req, res) {
  if (!req.query.building) {
    res.status(400).json({ error: "no building" });
  }
  const response = await db.query(
    "SELECT * FROM locations WHERE building_id = $1",
    [req.query.building]
  );
  const locations = response.rows;
  res.status(200).json({ locations: locations });
}
