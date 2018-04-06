'use strict'

//Application dependencies
const express = require('express');
const pg = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const superagent = require('superagent');

//application setup
const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;
const TOKEN = process.env.TOKEN;

//Database setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

//app middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app Queries
app.post('/api/v1/users', (req, res) => {
  client.query(
    `INSERT INTO users(username, password)
    VALUES($1, $2) ON CONFLICT DO NOTHING;`,
    [req.body.username, req.body.password]
  )
    .then( function () {
      res.send('insert complete')
    }) 
  .catch(function(err) {
    console.error(err);
});
});

app.get('/api/v1/users', (req, res) => {
  client.query(`SELECT * FROM users;`)
  .then(results => res.send(results.rows))
  .catch(console.error);
}); 

app.put('/api/v1/users/:id', (req, res) => {
  client.query(
    `UPDATE users
    SET vote_counter=$1
    WHERE user_id=$2`,
    [req.body.vote_counter, req.params.id]
  )
  .then( function () {
    res.send('update complete')
  })
  .catch(function(err) {
    console.error(err);
  })
})

//botton of file
app.get('*', (req, res) => res.redirect(CLIENT_URL));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));