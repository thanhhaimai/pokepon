var Player = requires('./player.js');

Game = function (id) {
  this.pokepons = new Array();
  this.id = id;
}

Game.prototype.start = function() {
}

Game.prototype.stop = function() {
}

Game.prototype.createPlayer = function() {
  return new Player();
}

module.exports = Game;
