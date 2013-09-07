var pokeponRef;
var gameId;
var baseUrl = 'https://pokepon.firebaseio.com/';

var connectGame = function () {
  var socket = io.connect('http://localhost:3000');

  socket.on('welcome', function(data) {
    var url = window.location.href;
    gameId = url.substr(url.lastIndexOf('/') + 1);
    socket.emit('join', {id: gameId});
  });

  socket.on('joined', function(data) {
    var url = baseUrl +  "games/" + gameId + '/' + data.id + '/pokepon';
    console.log(url);
    pokeponRef = new Firebase(url);
    pokeponRef.on('value', function(snapshot) {
      pokepon = snapshot.val();
      $('#youhealthy').width(pokepon.HP + "%");
    });
  });
}
