import { Pool } from "pg";

const pool = new Pool();
const db = {
  query: (text, params) => pool.query(text, params),
};
export default db;
