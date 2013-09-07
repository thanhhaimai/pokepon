var dataRef;

var connectGame = function () {
  var socket = io.connect('http://localhost:3000');

  socket.on('welcome', function(data) {
    console.log('received welcome');
    console.log(data);
    var url = window.location.href;
    var gameId = url.substr(url.lastIndexOf('/') + 1);
    socket.emit('join', {id: gameId});
  });

  socket.on('joined', function(data) {
    console.log('joined as ' + data.type);
    dataRef = new Firebase(data.firebase);
  });
}
