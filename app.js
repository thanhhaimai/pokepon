
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var server = require('http').createServer(app);

var routes = require('./routes');
var game = require('./routes/game');
var soundcloud = require('./routes/soundcloud');
var http = require('http');
var path = require('path');
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', game.list);
app.get('/games', game.list);
app.get('/games/create', game.create);
app.get('/games/:id', game.view);

app.get('/soundcloud', soundcloud.index);

io.sockets.on('connection', function (socket) {
  var myGame;
  var myPlayer;

  socket.on('join', function(data) {
    myGame = game.games[data.id];
    if (!myGame) {
      console.err("game does not exist");
      return;
    }

    myPlayer = myGame.createPlayer(socket.id);

    // if (myGame.players.length === 2) {
    //   myGame.start();
    // }

    socket.emit('joined', {
      type: "player",
      id: socket.id
    });
 });

  socket.on('start', function() {
    // TODO(thanhhaimai): need to check if both users are ready
    myGame.start();
  });

  socket.on('print', function() {
    console.log(myGame);
  });

  socket.on('keyPressed', function(data) {
  });

  socket.on('attack', function(data) {
    console.log(myPlayer);
    myPlayer.attack();
  });
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
