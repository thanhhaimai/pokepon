var dataRef = new Firebase('https://pokepon.firebaseio.com');
var connectionRef = dataRef.child('.info/connected');

var songsRef = dataRef.child('songs');

var roomsRef = dataRef.child('rooms');
var currentRoom = '0'; // hard code default room to the first room
var roomRef = roomsRef.child(currentRoom);

connectionRef.on('value', function(snapshot) {
  if (snapshot.val() === true) {
    // alert('connected');
  } else {
    // alert('disconnected');
  }
});
