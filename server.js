const express = require("express");
const cors = require("cors");
const { insertClick } = require("./db");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/track-click", (req, res) => {
  const { browser, timestamp } = req.body;
  insertClick(browser, timestamp);
  res.json({ success: true });
});

app.get("/data", (req, res) => {
  db.all("SELECT * FROM clicks ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
