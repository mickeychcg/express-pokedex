var express = require('express');
var router = express.Router();
var request = require('request');
const db = require('../models');


/* GET - / - gets all records from the DB and render to view */
router.get('/', function (req, res) {
  db.pokemon.findAll().then(function (pokemons) {
    res.render('pokemon/pokedex', { pokemons })
  })
});

/* POST - /pokemon - receive the name of a 
pokemon and add it to the database */
router.post('/', function (req, res) {
  db.pokemon.create({
    name: req.body.name
  }).then(function () {
    res.redirect('/pokemon')
  });
});

/* GET /pokemon - return a page with favorited Pokemon
and displays card attributes */
router.get("/:name", function (req, res) {
  let uri = ("http://pokeapi.co/api/v2/pokemon/" + req.params.name);
  request(uri, function (error, response, body) {
    let api = JSON.parse(body)
    res.render('pokemon/show', { api })
  });
});

// /* POST - / Get form data and add a new record to DB
// and displays card attributes - NOT WORKING! */
// router.post("/:name", function (req, res) {
//   let uri = ("http://pokeapi.co/api/v2/pokemon/" + req.params.name);
//   request(uri, function (error, response, body) {
//     let stats = JSON.parse(body)
//     res.render('pokemon/show', { stats })
//   });
// });

// // TODO: Get form data and add a new record to DB
module.exports = router;
