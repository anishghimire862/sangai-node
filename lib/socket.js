const socketio = require('socket.io');
const user = require('../functions/user');
let users = [], connections = [];

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
    });

    socket.on('notify_user_about_incoming_message', (data) => {
      socket.broadcast.to(data.room).emit('render_incoming_message_notification', {
        notification_tab: data.notification_tab,
        room: data.room
      });
      console.log('Message received on server', data);
    });

    socket.on('disconnect', function() {
      users = users.filter((user) => user !== socket.username);
      io.emit('render_new_users', [...new Set(users)]);
      console.log('A user disconnected', socket.username)
    });
    console.log('A user connected', socket.id);
  })
}
