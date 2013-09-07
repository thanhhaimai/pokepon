var Moniker = require('moniker');

var Firebase = require('firebase');

ear Game = require('../game.js');
var Pokepon = require('../pokepon.js');
var Player = require('../players.js');

exports.games = {};

exports.list = function(req, res) {
  res.render('index', {"games": games});
};

exports.create = function(req, res) {
  var id = Moniker.choose();
  games[id] = new Game(id);
  res.redirect('/games/' + id);
}

exports.view = function(req, res) {
  var id = req.params.id;
  var game = games[id];
  if (!game) {
    console.log('Attempt to view a non-existant game');
    res.redirect('/index');
  }

  console.log("viewing a game: " + id);
  res.render('game', game);
}
