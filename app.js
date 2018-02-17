const express = require('express');
const app = express();
const io = require('socket.io')();

// server up static files
app.use(express.static('public'));

//add routes
app.use(require('./routes/index'));

const server = app.listen(3000, () => {
  console.log('listening on port 3000');
});

io.attach(server);

io.on('connection', socket => {
  console.log('a user has connected');
  var nickname;

  socket.on('connect message', data => {
    nickname = data.nick;
    io.emit('connect message', {for: 'everyone', message: data.msg});
  });

  socket.on('chat message', msg => {
    io.emit('chat message', {for: 'everyone', message: msg, id: socket.id});
  });

  socket.on('typing message', msg => {
    io.emit('typing message', {for: 'everyone', message: msg, id: socket.id});
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
    io.emit('disconnect message', {for: 'everyone', message: `<span>${nickname}</span> has left the chat`});
  });
});
