Pokepon = function(index, pokeponRef) {
  this.HP = 100;
  this.pokeponRef = pokeponRef;
  this.pokeponRef.set({
    name: "no name",
    maxHP: 100,
    HP: 100,
    imageUrl: "http://static.tumblr.com/yeaa5gt/TTGmngvye/009.gif"
  });
}

Pokepon.prototype.damage = function(dmg) {
  this.HP -= dmg;
  this.pokeponRef.child('HP').set(this.HP);
}

module.exports = Pokepon;
