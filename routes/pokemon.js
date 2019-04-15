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
  db.pokemon.findOne(req.body.name).then(function(pokemon) {
    let name = pokemon.name;
    let uri = ("http://pokeapi.co/api/v2/pokemon/" + name + "/");
    request(uri, function (error, response, body) {
      let api = JSON.parse(body);
      let image = JSON.parse(body).sprites.front_default;
      let height = JSON.parse(body).height;
      let abilities = JSON.parse(body).abilities;
      res.render('pokemon/show', { pokemon, api, image, height, abilities });
    });
  });
});

// DELETE ONE
router.delete('/:name', function (req, res) {
  db.pokemon.destroy({
    where: { name: req.params.name }
  }).then(function () {
    res.redirect('/pokemon');
  })
})

module.exports = router;
