(() => {
  const socket = io();

  let messageList = document.querySelector('ul'),
      chatForm = document.querySelector('#typing-box'),
      lightbox = document.querySelector('#lightbox'),
      nicknameForm = lightbox.querySelector('#nickname-form'),
      nameInput = document.querySelector('.nickname'),
      chatMessage = document.querySelector('.message'),
      typingMessage = document.querySelector('.typing'),
      nickname = null;

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
    msg = `<span>${nickname}</span> has entered the chat`;
    socket.emit('connect message', msg);
    nicknameForm.removeEventListener('submit', setNickname, false);
    chatMessage.addEventListener('keyup', isTyping, false);
    chatForm.addEventListener('submit', handleSendMessage, false);
  }

  // fire on typing and send message with user's nickname
  function isTyping(e) {
    console.log('from isTyping');
    msg = `${nickname} is typing`;
    socket.emit('typing message', msg);
    // set timeout to erase 'is typing' message
    timeout = setTimeout(timeoutTyping, 2000);
  }

  // send empty message to erase 'is typing' message
  function timeoutTyping() {
      socket.emit('typing message', '');
  }

  // write 'is typing' message on screen
  function writeTyping(msg) {
    typingMessage.innerHTML = msg.message;
  }

  // append chat messages
  function appendMessage(msg) {
    let newMsg = `<li><p>${msg.message}</p></li>`;
    messageList.innerHTML += newMsg;
  }

  // append 'has entered' and 'has left' messages
  function appendInOutMessage(msg) {
    let newMsg = `<li class="in-out"><p>${msg.message}</p></li>`;
    messageList.innerHTML += newMsg;
  }

  // set message to be sent and emit it
  function handleSendMessage(e) {
    e.preventDefault();
    // check if message is not empty
    if(chatMessage.value) {
      nickname = (nickname && nickname.length > 0) ? nickname : 'user';
      msg = `<span>${nickname}</span>: ${chatMessage.value}`;
      socket.emit('chat message', msg);
      chatMessage.value = '';
      return false;
    }
  }

  window.addEventListener('load', addNicknameHandler, false);
  socket.addEventListener('chat message', appendMessage, false);
  socket.addEventListener('connect message', appendInOutMessage, false);
  socket.addEventListener('disconnect message', appendInOutMessage, false);
  socket.addEventListener('typing message', writeTyping, false);

})();
