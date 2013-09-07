var Firebase = require('firebase');

Game = function (id) {
  this.pokepons = new Array();
  this.id = id;
}

Game.prototype.start = function() {
}

Game.prototype.stop = function() {
}

Game.prototype.createPlayer = function() {
  // if we already have 2 players, throw an error
  // create a player
  // return the player
}

module.exports = Game;
