// WebSocket�T�[�o�ɐڑ�
var ws = new WebSocket('ws://trump.c.node-ninja.com:8080/');

// �G���[����
ws.onerror = function(e){
  $('#chat-area').empty()
    .addClass('alert alert-error')
    .append('<button type="button" class="close" data-dismiss="alert">�~</button>',
      $('<i/>').addClass('icon-warning-sign'),
      '�T�[�o�ɐڑ��ł��܂���ł����B'
    );
}

// ���[�U���������_���ɐ���
var userName = '�Q�X�g' + Math.floor(Math.random() * 100);
// �`���b�g�{�b�N�X�̑O�Ƀ��[�U����\��
$('#user-name').append(userName);

// WebSocket�T�[�o�ڑ��C�x���g
ws.onopen = function() {
  $('#textbox').focus();
  // �������𕶎���ɕϊ����đ��M
  ws.send(JSON.stringify({
    type: 'join',
    user: userName
  }));
};

// ���b�Z�[�W��M�C�x���g������
ws.onmessage = function(event) {
  // ��M�������b�Z�[�W�𕜌�
  var data = JSON.parse(event.data);
  var item = $('<li/>').append(
    $('<div/>').append(
      $('<i/>').addClass('icon-user'),
      $('<small/>').addClass('meta chat-time').append(data.time))
  );

  // push���ꂽ���b�Z�[�W�����߂��A�v�f�𐶐�����
  if (data.type === 'join') {
    item.addClass('alert alert-info')
    .prepend('<button type="button" class="close" data-dismiss="alert">�~</button>')
    .children('div').children('i').after(data.user + '���������܂���');
  } else if (data.type === 'chat') {
    item.addClass('well well-small')
    .append($('<div/>').text(data.text))
    .children('div').children('i').after(data.user);
  } else if (data.type === 'defect') {
    item.addClass('alert')
    .prepend('<button type="button" class="close" data-dismiss="alert">�~</button>')
    .children('div').children('i').after(data.user + '���ގ����܂���');
  } else {
    item.addClass('alert alert-error')
    .children('div').children('i').removeClass('icon-user').addClass('icon-warning-sign')
      .after('�s���ȃ��b�Z�[�W����M���܂���');
  }
  $('#chat-history').prepend(item).hide().fadeIn(500);
};


// �����C�x���g
textbox.onkeydown = function(event) {
  // �G���^�[�L�[���������Ƃ�
  if (event.keyCode === 13 && textbox.value.length > 0) {
    ws.send(JSON.stringify({
      type: 'chat',
      user: userName,
      text: textbox.value
    }));
    textbox.value = '';
  }
};

// �u���E�U�I���C�x���g
window.onbeforeunload = function () {
  ws.send(JSON.stringify({
    type: 'defect',
    user: userName,
  }));
};