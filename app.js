import express from 'express';
import path from 'path';
import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;
const app = express();

const expressPort = 8002;
// const db = new 
const connectionString = process.env.PG_DATABASE_URL; // hiding to prevent hacking?
console.log(connectionString);
const pool = new Pool ({
  connectionString,
});

app.use(express.static('public'));
app.use(express.json());

app.get('/items', (req,res) => {
  pool.query('SELECT * FROM items')
    .then((data) => res.send(data.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).send("Sorry!");
    })
});


app.listen(expressPort, () => {
  console.log(`Listening on port ${expressPort}...`);
})