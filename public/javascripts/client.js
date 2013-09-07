var baseUrl = 'https://pokepon.firebaseio.com/';
Client = function() {
  this.pokeponRef;
  this.gameId;
  this.socket;
}

Client.prototype.connect = function() {
  var self = this;
  var url = window.location.href;
  self.gameId = url.substr(url.lastIndexOf('/') + 1);
  console.log(this.gameId);

  self.socket = io.connect('http://158.130.159.141:3000');

  self.socket.on('joined', function(data) {
    var url = baseUrl +  "games/" + self.gameId + '/' + data.id + '/pokepon';
    console.log(url);
    self.pokeponRef = new Firebase(url);
    self.pokeponRef.on('value', function(snapshot) {
      self.pokepon = snapshot.val();
      $('#youhealthy').width(self.pokepon.HP + "%");
    });
  });

  self.socket.emit('join', {id: self.gameId});
}

Client.prototype.attack = function() {
  this.socket.emit('attack', {type: "basic"});
}
