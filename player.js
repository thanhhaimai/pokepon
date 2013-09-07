Pokepon = require('./pokepon.js');

var Firebase = require('firebase');
var dataRef = new Firebase('https://pokepon.firebaseio.com');
var gameRef = dataRef.child('games');
var configRef = dataRef.child('config');

Player = function(playerRef, playerIndex) {
  this.playerRef = playerRef;
  this.playerIndex = playerIndex;
  this.pokepon = new Pokepon(playerIndex, this.playerRef.child('pokepon'));
}

Player.prototype.attack = function() {
  this.enemy.pokepon.damage(10);
}

module.exports = Player;
