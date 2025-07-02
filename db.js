require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Automatically create the "clicks" table if it doesn't exist
pool
  .query(
    `
  CREATE TABLE IF NOT EXISTS clicks (
    id SERIAL PRIMARY KEY,
    element_id TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    user_agent TEXT NOT NULL
  )
`
  )
  .then(() => {
    console.log("✅ Clicks table is ready");
  })
  .catch((err) => {
    console.error("❌ Failed to create clicks table:", err.message);
  });

module.exports = {
  query: (text, params) => pool.query(text, params),
};
