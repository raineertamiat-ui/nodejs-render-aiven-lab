const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to database!");
});

app.get("/", (req, res) => {
  db.query("SELECT NOW()", (err, result) => {
    if (err) {
      res.send("Query error");
      return;
    }
    res.send("Database Connected Successfully: " + result[0]["NOW()"]);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});