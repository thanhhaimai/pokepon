var baseUrl = 'https://pokepon.firebaseio.com/';

Client = function() {
  this.isStarted = false;
}

Client.prototype.connect = function() {
  var self = this;
  var url = window.location.href;
  self.gameId = url.substr(url.lastIndexOf('/') + 1);

  self.socket = io.connect('http://localhost:3000');

  self.socket.on('joined', function(player) {
    self.id = player.id;

    if (player.type !== 'player') {
      // which means there are more than 2 players in the game, and this player becomes a spectator.
      // disable key input for this player
      return;
    }
  });

  self.socket.on('gameStart', function(data) {
    if (data.gameId !== self.gameId) {
      return;
    }

    self.isStarted = true;

    var url1 = baseUrl +  "games/" + self.gameId + '/' + data.player1 + '/pokepon';
    var url2 = baseUrl +  "games/" + self.gameId + '/' + data.player2 + '/pokepon';
    console.log(url1);
    console.log(url2);

    // TODO(melanie: set the right ref based on my self.id
    self.pokeponRef = new Firebase(url1);
    self.enemyRef = new Firebase(url2);

    // this is the my pokepon data.
    self.pokeponRef.on('value', function(snapshot) {
      // this function will get called everytime my HP changed.
      var pokepon = snapshot.val();
      console.log(pokepon.HP);
      // example of how to update the HP bar
      $('#youhealthy').width(pokepon.HP + "%");
    });

    self.enemyRef.on('value', function(snapshot) {
      enemy = snapshot.val();
      console.log(enemy.HP);
      $('#opponenthealthy').width(enemy.HP + "%");
    });
  });

  self.socket.emit('join', {id: self.gameId});
}

Client.prototype.attack = function() {
  if (this.isStarted) {
    this.socket.emit('attack', {type: "basic"});
  }
}
