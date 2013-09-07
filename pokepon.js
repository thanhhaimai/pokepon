Pokepon = function(index, configVal) {
  this.name = "no name";
  this.sequence = [];
  this.maxHP = configVal.maxHP;
  this.HP = this.maxHP;
  if (index === 0) {
    this.imageUrl = "http://static.tumblr.com/yeaa5gt/TTGmngvye/009.gif";
  } else {
    this.imageUrl = "http://static.tumblr.com/yeaa5gt/i0imngwcd/359.gif";
  }
}

module.exports = Pokepon;
