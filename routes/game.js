var Moniker = require('moniker');

var Firebase = require('firebase');
var dataRef = new Firebase('https://pokepon.firebaseio.com');

var Game = require('../game.js');
var Pokepon = require('../pokepon.js');
var Player = require('../player.js');

var games = {};
exports.games = games;

exports.list = function(req, res) {
  res.render('index', {"games": games});
};

exports.create = function(req, res) {
  var id = Moniker.choose();
  var gameRef = dataRef.child('games/').child(id);
  dataRef.child('games/' + id + '/id').set(id);
  games[id] = new Game(gameRef, id);
  res.redirect('/games/' + id);
}

exports.view = function(req, res) {
  var id = req.params.id;
  var game = games[id];
  if (!game) {
    console.log('Attempt to view a non-existant game');
    res.redirect('/');
  }

  console.log("viewing a game: " + id);
  res.render('game', game);
}
