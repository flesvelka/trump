/*
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
*/

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
 
// '/'にアクセスがきたらindex.htmlを返す
// こういう部分は普通apacheとかでやらせる？
app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});
 
io.sockets.on('connection', function(socket){
 
  // 接続直後にクライアントにメッセージ送る
  socket.emit('news', { msg: 'hello world from server'});
 
  // 上記メッセージを受け取ったクライアントの返事を受け取る
  // このへんは単なるテスト。
  socket.on('resp', function(resp){
    console.log(resp.resp);
  });
 
  // クライアントが何か言った(say)ら、ブロードキャストする
  socket.on('say', function(msg){
    console.log('said: ' + msg.msg);
    socket.broadcast.emit('said', {msg: msg.msg});
  });
 
});