const express = require('express');
const app = express();
const io = require('socket.io')();

// server up static files
app.use(express.static('public'));

//add routes
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/portfolio'));

const server = app.listen(3000, () => {
  console.log('listening on port 3000');
});

io.attach(server);

io.on('connection', socket => {
  console.log('a user has connected');

  socket.on('connect message', msg => {
    io.emit('connect message', {for: 'everyone', message: msg});
  });

  socket.on('chat message', msg => {
    io.emit('chat message', {for: 'everyone', message: msg, id: socket.id});
  });

  socket.on('typing message', msg => {
    io.emit('typing message', {for: 'everyone', message: msg, id: socket.id});
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
    io.emit('disconnect message', {for: 'everyone', message: `<span>${socket.id}</span> has left the chat`});
  });
});
