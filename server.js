// VMware���CentOS6�œ��삳�����Ƃ��̗�
// 8888�ԃ|�[�g�ŃN���C�A���g�̐ڑ���҂��󂯂�
var ws = require('socket.io');
var server = ws.listen(8080, function () {
  console.log('\033[96m Server running at 172.16.145.136:8080 \033[39m');
});

// �N���C�A���g����̐ڑ��C�x���g������
server.on('connection', function(socket) {
  // �N���C�A���g����̃��b�Z�[�W��M�C�x���g������
  socket.on('message', function(data) {
    // ���s���Ԃ�ǉ�
    var data = JSON.parse(data);
    var d = new Date();
    data.time = d.getFullYear()  + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    data = JSON.stringify(data);
    console.log('\033[96m' + data + '\033[39m');
    
    // ��M�������b�Z�[�W��S�ẴN���C�A���g�ɑ��M����
    server.clients.forEach(function(client) {
      client.send(data);
    });
  });
});