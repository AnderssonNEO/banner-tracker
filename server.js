const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db"); // PostgreSQL module
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Save click to PostgreSQL
app.post("/click", async (req, res) => {
  const { elementId, timestamp, userAgent } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO clicks (element_id, timestamp, user_agent)
       VALUES ($1, $2, $3) RETURNING id`,
      [elementId, timestamp, userAgent]
    );

    console.log(`Click stored with ID: ${result.rows[0].id}`);
    res.status(200).json({ message: "Click saved", id: result.rows[0].id });
  } catch (err) {
    console.error("Error saving click:", err.message);
    res.status(500).json({ message: "Database error" });
  }
});

// Protected log view
app.get("/log", async (req, res) => {
  if (req.query.secret !== process.env.ADMIN_SECRET) {
    return res.status(403).send("Access Denied");
  }

  try {
    const result = await db.query(`SELECT * FROM clicks ORDER BY id DESC`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Database read error");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
