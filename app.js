const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

// DB CONNECTION
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT)
});

// CONNECT
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to Aiven MySQL ✅");
});

// ROUTE
app.get("/", (req, res) => {
  db.query("SELECT NOW() AS time", (err, result) => {
    if (err) {
      return res.status(500).send("Database query error");
    }
    res.send("Database Connected Successfully: " + result[0].time);
  });
});

// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});