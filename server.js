const express = require('express');
const cors = require('cors');
const { insertClick } = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/track-click', (req, res) => {
  const { browser, timestamp } = req.body;
  insertClick(browser, timestamp);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));