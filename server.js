'use strict'

//Application dependencies

const express = require('express');
const pg = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const superagent = require('superagent');

//application setup

const app = express();
const PORT = procss.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const TOKEN = process.env.TOKEN;

//API key
// const API_KEY = process.env.e71e981fb1330c9361d35b9f8a2bc4b3

//Database setup

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

//app middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//API ENDPOINTS
// app.get('/api endpoint', (req, res) => res.send(TOKEN === parseInt(req.query.token)))

app.get('/api/v1/books', (req, res) => {
  client.query(`SELECT book_id, title, author, image_url, isbn FROM books;`)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

// superagent.get(url)
//   .query({'q': query})
//   .query({'key': API_KEY})
//   .then(response => response.body.items.map(not sure what to map yet))


//Add app.gets here with our API
// for later
//app.get()

//botton of file
app.get('*', (req, res) => res.redirect(CLIENT_URL));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));