require('dotenv').config();
const express = require('express');
const db = require('./db');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// test DB route
app.get('/test-db', (req, res) => {
  db.query('SELECT NOW() AS time', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});