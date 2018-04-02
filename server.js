'use strict'

//Application dependencies

const express = require('express');
const pg = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

//application setup

const app = express();
const PORT = procss.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

//Database setup

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

//api inputs

//Add app.gets here with our API
//app.get()

//botton of file
app.get('*', (req, res) => res.redirect(CLIENT_URL));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));