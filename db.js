const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./clicks.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clicks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      browser TEXT,
      timestamp TEXT
    )
  `);
});

function insertClick(browser, timestamp) {
  const stmt = db.prepare(
    "INSERT INTO clicks (browser, timestamp) VALUES (?, ?)"
  );
  stmt.run(browser, timestamp);
  stmt.finalize();
}

module.exports = { insertClick };
