(() => {
  const socket = io();

  let messageList = document.querySelector('ul'),
      chatForm = document.querySelector('#typing-box'),
      lightbox = document.querySelector('#lightbox'),
      nicknameForm = lightbox.querySelector('#nickname-form'),
      nameInput = document.querySelector('.nickname'),
      chatMessage = document.querySelector('.message'),
      nickname = null;

  function addNicknameHandler() {
    nicknameForm.addEventListener('submit', setNickname, false);
  }

  function setNickname(e) {
    // nickname = this.value;
    e.preventDefault();
    nickname = nicknameForm.querySelector('.nickname').value;
    lightbox.classList.add('nickname-selected');
    msg = `<span>${nickname}</span> has entered the chat`;
    socket.emit('connect message', msg);
    // socket.nickname = nickname;
    nicknameForm.removeEventListener('submit', setNickname, false);
    chatForm.addEventListener('change', isTyping, false);
    chatForm.addEventListener('submit', handleSendMessage, false);
  }

  function isTyping(e) {
    msg = `${nickname} is typing`;
    socket.emit('typing message', msg);
  }

  function writeTyping(msg) {
    let newMsg = `<li class="typing"><p>${msg.message}</p></li>`;
    messageList.innerHTML += newMsg;
  }

  function appendMessage(msg) {
    let newMsg = `<li><p>${msg.message}</p></li>`;
    messageList.innerHTML += newMsg;
  }

  function appendInOutMessage(msg) {
    console.log(msg);
    console.log('i am here');
    let newMsg = `<li class="in-out"><p>${msg.message}</p></li>`;
    messageList.innerHTML += newMsg;
  }

  // function createDiscMessage() {
  //   // debugger;
  //   // console.log(msg);
  //   // let newMsg = `<li class="in-out"><span>${nickname}</span> has left the room</li>`;
  //   msg = `<span>${nickname}</span> has left the chat`;
  //   console.log(msg);
  //   socket.emit('disconnect message', msg);
  //   // messageList.innerHTML += newMsg;
  // }

  function handleSendMessage(e) {
    e.preventDefault();
    nickname = (nickname && nickname.length > 0) ? nickname : 'user';
    msg = `<span>${nickname}</span>: ${chatMessage.value}`;
    socket.emit('chat message', msg);
    chatMessage.value = '';
    return false;
  }

  window.addEventListener('load', addNicknameHandler, false);
  // chatForm.addEventListener('submit', handleSendMessage, false);
  // nicknameForm.addEventListener('submit', setNickname, false);
  // nameInput.addEventListener('change', setNickname, false);
  // chatForm.addEventListener('submit', handleSendMessage, false);
  socket.addEventListener('chat message', appendMessage, false);
  socket.addEventListener('connect message', appendInOutMessage, false);
  // socket.addEventListener('disconnect message', appendInOutMessage, false);
  // socket.addEventListener('disconnect', createDiscMessage, false);
  socket.addEventListener('disconnect message', appendInOutMessage, false);
  socket.addEventListener('typing message', writeTyping, false);

})();
