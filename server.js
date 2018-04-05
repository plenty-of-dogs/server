'use strict'

//Application dependencies

const express = require('express');
const pg = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const superagent = require('superagent');

//application setup

const app = express();
// const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;
const TOKEN = process.env.TOKEN;
const PORT = 3000;

//API key
// const API_KEY = process.env.e71e981fb1330c9361d35b9f8a2bc4b3;

//Database setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

//app middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.get('/github/*', (req, res) => {
//   console.log('Routing a GitHub AJAX request for ', req.params[0]);
//   const url = `https://api.github.com/${req.params[0]}`;
//   superagent.get(url)
//     .set(`Authorization`, `token ${process.env.GITHUB_TOKEN}`)
//     .then(
//       repos => {
//         console.log(repos.text);
//         res.send(repos.text)
//       },
//       err => res.send(err)
//     )
// })
app.post('/api/v1/users', (req, res) => {
  console.log(req.user)
  client.query(
    `INSERT INTO users(username, password, vote_counter)
    VALUES($1, $2, $3);`
    [
      req.body.username,
      req.body.password,
      req.body.vote_counter
    ]
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
  // .then(console.log(results))
  .then(results => res.send(results.rows))
  .catch(console.error);
});

//API ENDPOINTS
// app.get('/api endpoint', (req, res) => res.send(TOKEN === parseInt(req.query.token)))

// superagent.get(url)
//   .query({'q': query})
//   .query({'key': API_KEY})
//   .then(response => response.body.items.map(not sure what to map yet))

//application middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//api inputs


//Add app.gets here with our API
// for later
//app.get()

//botton of file
app.get('*', (req, res) => res.redirect(CLIENT_URL));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));