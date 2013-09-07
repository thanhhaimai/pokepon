Pokepon = require('./pokepon.js');

var Firebase = require('firebase');
var dataRef = new Firebase('https://pokepon.firebaseio.com');
var gameRef = dataRef.child('games');
var configRef = dataRef.child('config');

Player = function(game, playerRef, playerId) {
  this.game = game;
  this.playerRef = playerRef;
  var playerId = playerId;
  this.pokepon = new Pokepon(playerId, this.playerRef.child('pokepon'));
}

Player.prototype.attack = function() {
  this.enemy.pokepon.damage(10);
}

module.exports = Player;
