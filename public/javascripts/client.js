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
    console.log(data);
  });
}
// $(function () {
//   var socket = io.connect('http://localhost:3000');
// 
//   var dataRef = new Firebase('https://pokepon.firebaseio.com');
//   var connectionRef = dataRef.child('.info/connected');
// 
//   var songsRef = dataRef.child('songs');
// 
//   var roomsRef = dataRef.child('rooms');
//   var currentRoom = '0'; // hard code default room to the first room
//   var roomRef = roomsRef.child(currentRoom);
// 
//   connectionRef.on('value', function(snapshot) {
//     if (snapshot.val() === true) {
//       // alert('connected');
//     } else {
//       // alert('disconnected');
//     }
//   });
// }
