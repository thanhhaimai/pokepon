
/*
 * GET games listing.
 */

var Firebase = require('firebase');
var dataRef = new Firebase('https://pokepon.firebaseio.com');
var gameRef = dataRef.child('games');

var Game = require('../game.js');
var game = new Game();

exports.list = function(req, res) {
  res.render('index');
};

exports.create = function(req, res) {
  // create a game
  console.log("creating a game");
  gameRef.push(game, function(err) {
    if (err) {
      console.log("error creating game");
    } else {
      console.log("created a game name " );
    }
  });
  res.render('game');
}
