(() => {
  const socket = io();

  let messageList = document.querySelector('ul'),
      chatForm = document.querySelector('form'),
      chatMessage = document.querySelector('.message');

  function appendMessage(msg) {
    // debugger;
    // console.log(msg);
    let newMsg = `<li>${msg.message}</li>`;
    // messageList.appendChild(newMsg);
    messageList.innerHTML += newMsg;
  }

  function appendDiscMessage(msg) {
    // debugger;
    // console.log(msg);
    let newMsg = `<li>${msg}</li>`;
    messageList.innerHTML += newMsg;
  }

  function handleSendMessage(e) {
    e.preventDefault();
    // debugger;
  }

  chatForm.addEventListener('submit', handleSendMessage, false);
  socket.addEventListener('chat message', appendMessage, false);
  socket.addEventListener('disconnect message', appendDiscMessage, false);
})();
