'use strict';

(function () {
  var socket = io();

  var messageList = document.querySelector('#chat-area'),
      chatForm = document.querySelector('#typing-box'),
      lightbox = document.querySelector('#lightbox'),
      nicknameForm = lightbox.querySelector('#nickname-form'),
      nameInput = document.querySelector('.nickname'),
      chatMessage = document.querySelector('.message'),
      typingMessage = document.querySelector('.typing'),
      icon = document.querySelector('#small-icon'),
      nickname = null,
      overBtn = false;

  // avoid undesired resubmissions of form when reload page
  function addNicknameHandler() {
    nicknameForm.addEventListener('submit', setNickname, false);
  }

  // set nickname and emit connection event
  // also create event handlers of chat form
  function setNickname(e) {
    e.preventDefault();
    nickname = nicknameForm.querySelector('.nickname').value;
    lightbox.classList.add('nickname-selected');
    var msg = '<span>' + nickname + '</span> has entered the chat';
    socket.emit('connect message', msg);
    nicknameForm.removeEventListener('submit', setNickname, false);
    chatMessage.addEventListener('keyup', isTyping, false);
    chatForm.addEventListener('submit', handleSendMessage, false);
  }

  // fire on typing and send message with user's nickname
  function isTyping(e) {
    var msg = nickname + ' is typing';
    socket.emit('typing message', msg);
    // set timeout to erase 'is typing' message
    var timeout = setTimeout(timeoutTyping, 2000);
  }

  // send empty message to erase 'is typing' message
  function timeoutTyping() {
    socket.emit('typing message', '');
  }

  // write 'is typing' message on screen
  function writeTyping(msg) {
    var myId = socket.id;
    var msgId = msg.id;

    // check if message is not from the own user
    if (socket.id != msg.id) {
      typingMessage.innerHTML = msg.message;
    }
  }

  // append chat messages
  function appendMessage(msg) {
    var myId = socket.id;
    var msgId = msg.id;
    var newMsg = void 0;

    // check if user is the sender of the message
    if (socket.id === msg.id) {
      newMsg = '<li class="my-msg"><p>' + msg.message + '</p></li>';
    } else {
      newMsg = '<li><p>' + msg.message + '</p></li>';
    }

    messageList.innerHTML += newMsg;
    messageList.scrollTop = messageList.scrollHeight;
  }

  // append 'has entered' and 'has left' messages
  function appendInOutMessage(msg) {
    var newMsg = '<li class="in-out"><p>' + msg.message + '</p></li>';
    messageList.innerHTML += newMsg;
    messageList.scrollTop = messageList.scrollHeight;
  }

  // set message to be sent and emit it
  function handleSendMessage(e) {
    e.preventDefault();
    // check if message is not empty
    if (chatMessage.value) {
      nickname = nickname && nickname.length > 0 ? nickname : 'user';
      var time = new Date();
      var curTime = convertTime(time);

      var msg = '<span>' + nickname + '</span>: ' + chatMessage.value + '<time>' + curTime + '</time>';
      socket.emit('chat message', msg);
      chatMessage.value = '';
      return false;
    }
  }

  // convert time from timestamp to date format
  function convertTime(t) {
    var h = '0' + t.getHours();
    var m = '0' + t.getMinutes();
    var s = '0' + t.getSeconds();

    var convertedTime = h.slice(-2) + ':' + m.slice(-2) + ':' + s.slice(-2);
    return convertedTime;
  }

  // show night mode button
  function showNightOption() {
    var nightBtn = document.querySelector('#night-button');
    nightBtn.style.display = "block";
    icon.addEventListener('mouseout', timeoutNight, false);
    nightBtn.addEventListener('mouseover', function () {
      overBtn = true;
    }, false);
    nightBtn.addEventListener('mouseout', function () {
      overBtn = false;timeoutNight();
    }, false);
    nightBtn.addEventListener('click', toggleNightMode, false);
  }

  // set timeout to hide night mode button
  function timeoutNight() {
    var timeout = setTimeout(hideNightOption, 2000);
  }

  // hide night mode button
  function hideNightOption() {
    if (!overBtn) {
      var nightBtn = document.querySelector('#night-button');
      nightBtn.style.display = "none";
      icon.removeEventListener('mouseout', timeoutNight, false);
      nightBtn.removeEventListener('click', toggleNightMode, false);
    }
  }

  // toggle interface from normal to night mode
  function toggleNightMode(evt) {
    evt.preventDefault();
    var container = document.querySelector('#container');
    var bodyarea = document.querySelector('body');

    if (evt.currentTarget.classList.contains('night-on')) {
      evt.currentTarget.classList.remove('night-on');
      container.classList.remove('night');
      bodyarea.style.backgroundImage = 'url(../images/background.jpg)';
      evt.currentTarget.innerHTML = "Night Mode OFF";
    } else {
      evt.currentTarget.classList.add('night-on');
      container.classList.add('night');
      bodyarea.style.backgroundImage = 'url(../images/background-night.jpg)';
      evt.currentTarget.innerHTML = "Night Mode ON";
    }
  }

  window.addEventListener('load', addNicknameHandler, false);
  socket.addEventListener('chat message', appendMessage, false);
  socket.addEventListener('connect message', appendInOutMessage, false);
  socket.addEventListener('disconnect message', appendInOutMessage, false);
  socket.addEventListener('typing message', writeTyping, false);
  icon.addEventListener('mouseover', showNightOption, false);
})();
//# sourceMappingURL=production.es5.js.map
