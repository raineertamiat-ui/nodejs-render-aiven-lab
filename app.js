const express = require("express");
const mysql = require("mysql2");

require("dotenv").config();

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT)
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to Aiven MySQL ✅");
});

app.get("/", (req, res) => {
  db.query("SELECT NOW() AS time", (err, result) => {
    if (err) return res.status(500).send("DB error");
    res.send("Connected: " + result[0].time);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});