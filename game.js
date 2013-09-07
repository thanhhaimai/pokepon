var Player = require('./player.js');

Game = function (gameRef, id) {
  this.players = new Array();
  this.gameRef = gameRef;
  this.id = id;
  this.isStarted = false;
}

Game.prototype.start = function() {
  if (!this.isStarted) {
    console.log("started");
    this.isStarted = true;
    this.players[0].enemy = this.players[1];
    this.players[1].enemy = this.players[0];
  }
}

Game.prototype.stop = function() {
  this.players = new Array();
}

Game.prototype.isFull = function() {
  return this.players.length >= 2;
}

Game.prototype.createPlayer = function(socketId) {
  console.log(this.gameRef);
  console.log(socketId);
  var player = new Player(this, this.gameRef.child(socketId), this.players.length + 1);
  this.players.push(player);
  return player;
}

module.exports = Game;
