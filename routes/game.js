var Firebase = require('firebase');
var Moniker = require('moniker');

var Game = require('../game.js');
var Pokepon = require('../pokepon.js');

var dataRef = new Firebase('https://pokepon.firebaseio.com');
var gamesRef = dataRef.child('games');
var pokeponsRef = gamesRef.child('pokepons');

var gameUniqueIndex = 0;
var gameRef = gamesRef.child(gameUniqueIndex);

var games = {};

exports.list = function(req, res) {
  res.render('index', {"games": games});
};

exports.create = function(req, res) {
  var id = Moniker.choose();
  games[id] = new Game(id);
  console.log("created game: " + id);
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
