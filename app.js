const express = require('express');
const cors = require('cors');
var app = express();

const DeportesRutas = require('./src/rutas/deportes.routes')

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use('/api', DeportesRutas);


module.exports = app;