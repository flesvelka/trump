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
 
// '/'�ɃA�N�Z�X��������index.html��Ԃ�
// �������������͕���apache�Ƃ��ł�点��H
app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});
 
io.sockets.on('connection', function(socket){
 
  // �ڑ�����ɃN���C�A���g�Ƀ��b�Z�[�W����
  socket.emit('news', { msg: 'hello world from server'});
 
  // ��L���b�Z�[�W���󂯎�����N���C�A���g�̕Ԏ����󂯎��
  // ���̂ւ�͒P�Ȃ�e�X�g�B
  socket.on('resp', function(resp){
    console.log(resp.resp);
  });
 
  // �N���C�A���g������������(say)��A�u���[�h�L���X�g����
  socket.on('say', function(msg){
    console.log('said: ' + msg.msg);
    socket.broadcast.emit('said', {msg: msg.msg});
  });
 
});