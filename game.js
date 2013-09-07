var Player = requires('./player.js');

Game = function (id) {
  this.players = new Array();
  this.id = id;
}

Game.prototype.start = function() {
  this.players[0].enemy = this.players[1];
  this.players[1].enemy = this.players[0];
}

Game.prototype.stop = function() {
  this.players = new Array();
}

Game.prototype.isFull = function() {
  return pokepons.length >= 2;
}

Game.prototype.createPlayer = function() {
  var player = new Player();
  this.players.push(player);
  return player;
}

module.exports = Game;
