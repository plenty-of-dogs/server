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

//Database setup

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

//application middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//api inputs

//Add app.gets here with our API
//app.get()

//botton of file
app.get('*', (req, res) => res.redirect(CLIENT_URL));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));