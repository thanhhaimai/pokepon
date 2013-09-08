var baseUrl = 'https://pokepon.firebaseio.com/';

Client = function() {
  this.isStarted = false;
}

Client.prototype.connect = function() {
  var self = this;
  var url = window.location.href;
  self.gameId = url.substr(url.lastIndexOf('/') + 1);

  var urlToConnect = url.split('/')[2];
  self.socket = io.connect(urlToConnect);
  console.log(urlToConnect);

  self.socket.on('joined', function(player) {
    self.id = player.id;

    if (player.type !== 'player') {
      // which means there are more than 2 players in the game, and this player becomes a spectator.
      // disable key input for this player
      return;
    }

    $('#mypokepon').attr("src", 'http://sprites.pokecheck.org/i/' + player.pic + '.gif');

    // SC.stream('/tracks/108831064', function(s) {
    SC.stream('/tracks/90304600', function(s) {
      self.sound = s;
    });
  });

  self.socket.on('gameStart', function(data) {
    if (data.gameId !== self.gameId) {
      return;
    }

    self.isStarted = true;

    var url1 = baseUrl +  "games/" + self.gameId + '/' + data.player1 + '/pokepon';
    var url2 = baseUrl +  "games/" + self.gameId + '/' + data.player2 + '/pokepon';
    self.pic1 = data.pokepon1;
    self.pic2 = data.pokepon2;
    console.log(data.beats);
    beatsUI.setup(data.beats);
    beatsUI.play();
    self.sound.play();

    // TODO(melanie: set the right ref based on my self.id
    if (data.player1 === self.id) {
      self.pokeponRef = new Firebase(url1);
      self.enemyRef = new Firebase(url2);
      $('#mypokepon').attr("src", 'http://sprites.pokecheck.org/i/' + data.pokepon1 + '.gif');
      $('#enemypokepon').attr("src", 'http://sprites.pokecheck.org/i/' + data.pokepon2 + '.gif');
    } else {
      self.pokeponRef = new Firebase(url2);
      self.enemyRef = new Firebase(url1);
      $('#mypokepon').attr("src", 'http://sprites.pokecheck.org/i/' + data.pokepon2 + '.gif');
      $('#enemypokepon').attr("src", 'http://sprites.pokecheck.org/i/' + data.pokepon1 + '.gif');
    }

    // this is the my pokepon data.
    self.pokeponRef.on('value', function(snapshot) {
      // this function will get called everytime my HP changed.
      var pokepon = snapshot.val();
      console.log(pokepon.HP);
      // example of how to update the HP bar
      setHealth($('#you .health-bar'), pokepon.HP / 100.0);
    });

    self.enemyRef.on('value', function(snapshot) {
      enemy = snapshot.val();
      console.log(enemy.HP);
      setHealth($('#opponent .health-bar'), enemy.HP / 100.0);
    });
  });

  self.socket.on('gameover', function() {
    if (window.confirm("Game over!! Do you want to start a new game?")) {
      window.location.href = "/games/create";
    } else {
      window.location.href = "/";
    }
  });

  self.socket.emit('join', {id: self.gameId});
}

Client.prototype.requestMusic = function(track) {
}

Client.prototype.attack = function() {
  if (this.isStarted) {
    this.socket.emit('attack', {type: "basic"});
  }
}
