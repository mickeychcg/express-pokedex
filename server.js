require('dotenv').config();
var express = require('express');
var request = require('request');
const methodOverride = require('method-override');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

// app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// GET / - main index of site
app.get('/', function (req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';
  // Use request to call the API
  request(pokemonUrl, function (error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', { pokemon: pokemon });
  });
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
