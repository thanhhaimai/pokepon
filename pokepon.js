var Firebase = require('firebase');
var dataRef = new Firebase('https://pokepon.firebaseio.com');
var gameRef = dataRef.child('games');
var configRef = dataRef.child('config');

Pokepon = function(game, configVal) {
  this.name = "no name";
  this.sequence = [];
  this.game = game;
  this.maxHP = configVal.maxHP;
  this.HP = this.maxHP;
}

Pokepon.prototype.onKeyPress = function(key) {
  // check if we receive the event at the right time
  // if not, reset sequence
  // check if it's a valid key for the sequence
  // if not, reset sequence
  // check if it's the last key for the sequence
  // if yes, reset sequence, and dispatch actions
}

Pokepon.prototype.attack = function() {
}

module.exports = Pokepon;
