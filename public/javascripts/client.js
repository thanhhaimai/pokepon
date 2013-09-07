var baseUrl = 'https://pokepon.firebaseio.com/';
Client = function() {
  this.pokeponRef;
  this.enemyRef;
  this.gameId;
  this.socket;
}

Client.prototype.connect = function() {
  var self = this;
  var url = window.location.href;
  self.gameId = url.substr(url.lastIndexOf('/') + 1);

  self.socket = io.connect('http://158.130.159.141:3000');

  self.socket.on('joined', function(data) {
    var url = baseUrl +  "games/" + self.gameId + '/' + data.id + '/pokepon';
    self.pokeponRef = new Firebase(url);
    self.pokeponRef.on('value', function(snapshot) {
      var pokepon = snapshot.val();
      $('#youhealthy').width(pokepon.HP + "%");
    });
  });

  self.socket.on('gameStart', function(data) {
    var url = baseUrl +  "games/" + self.gameId + '/' + data.p2 + '/pokepon';
    console.log(url);
    self.enemyRef = new Firebase(url);
    self.enemyRef.on('value', function(snapshot) {
      enemy = snapshot.val();
      $('#opponenthealthy').width(enemy.HP + "%");
    });
  });

  self.socket.emit('join', {id: self.gameId});
}

Client.prototype.attack = function() {
  this.socket.emit('attack', {type: "basic"});
}
