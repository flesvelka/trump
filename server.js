var fs = require('fs');
var app = require('http').createServer( function (req, res) {
    fs.readFile(__dirname + '/game.html', function (err, data) {
        if (err) return res.writeHead(500);

        res.writeHead(200);
        res.end(data);
    });
});

var io = require('socket.io').listen(app, { log: false });
io.sockets.on('connection', function (socket) {
    socket.on('pulse', function (data) {
        socket.emit('pulse', data ? data * 2 : 0);
    });
});

app.listen(80);

var app = require('express').createServer()
  , io = require('socket.io').listen(app);
 
io.configure('production', function(){
  io.set('transports', [
    'websocket',
    'htmlfile',
    'xhr-polling'
  ]);
});
 
app.listen(80);