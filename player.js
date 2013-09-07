Pokepon = require('./pokepon.js');

var Firebase = require('firebase');
var dataRef = new Firebase('https://pokepon.firebaseio.com');
var gameRef = dataRef.child('games');
var configRef = dataRef.child('config');

Player = function(game) {
  this.game = game;
  var playerIndex = this.game.getNextPlayerIndex();
  this.pokepon = new Pokepon(playerIndex, configRef.val());
}

Player.prototype.attack = function() {
  this.enemy.HP -= 10;
}

module.exports = Player;
