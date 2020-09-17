const socketio = require('socket.io');
const conn = require('../database');
module.exports.listen = function(http) {
  const io = require('socket.io')(http);
  io.on('connection', (socket) => {

    socket.on('subscribe', (room) => {
      console.log('Joining room', room);
      socket.join(room);
    });

    socket.on('send_private_message', (data) => {
      console.log('receiving room ', data.room, 'message ', data.message);
      socket.broadcast.to(data.room).emit('conversation private post', {
        message: data.message,
        room: data.room
      });
    })

    socket.on('chat message', (message) => {
      socket.broadcast.emit('chat message', message)
      console.log('message', message);
    });
    console.log('A user connected', socket.id);
  })

}
