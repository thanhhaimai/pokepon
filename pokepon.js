Pokepon = function(index, pokeponRef) {
  this.HP = 100;
  this.pokeponRef = pokeponRef;
  this.pokeponRef.set({
    name: "no name",
    maxHP: 100,
    HP: 100,
    urlNumber: this.getRandomNum()
  });
}

Pokepon.prototype.getRandomNum = function() {
  console.log(Math.floor(Math.random * 649) + 1);
  return (Math.floor(Math.random * 649) + 1);
}

Pokepon.prototype.damage = function(dmg) {
  this.HP -= dmg;
  if (this.HP < 0) {
  }
  this.pokeponRef.child('HP').set(this.HP);
}

module.exports = Pokepon;
