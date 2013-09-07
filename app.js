
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();

var routes = require('./routes');
var game = require('./routes/game');
var http = require('http');
var path = require('path');
var io = require('socket.io').listen(app);

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

io.sockets.on('connection', function (socket) {
  socket.emit('welcome', {msg: "welcome"});
  socket.on('ack', function(data) {
    console.log(data);
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
