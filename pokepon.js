Pokepon = function(game) {
  this.name = "no name";
  this.sequence = [];
  this.game = game;
  this.HP = 100;
  this.maxHP = 100;
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
