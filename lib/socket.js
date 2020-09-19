const socketio = require('socket.io');
const user = require('../functions/user');
let users = [], connections = [], onlineClients = {};

module.exports.listen = function(http) {
  const io = require('socket.io')(http);
  io.on('connection', (socket) => {
    connections.push(socket);

    socket.on('new_user', function(data) {
      socket.username = data;
      users.push(socket.username);
      io.emit('render_new_users', [...new Set(users)]);
    })

    socket.on('subscribe', (room) => {
      socket.join(room);
    });

    socket.on('send_private_message', (data) => {
      socket.broadcast.to(data.room).emit('receive_private_message_on_client', {
        message: data.message,
        from: data.from,
        room: data.room
      });
      console.log('sending to', data.room)
    })

    socket.on('disconnect', function() {
      console.log(socket.username)
    })
    console.log('A user connected', socket.id);
  })
}
