const socketio = require('socket.io');
const user = require('../functions/user');
let users = [], connections = [];
let chatroomUsers = {};

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

    socket.on('join_chatroom', (room) => {
      socket.join(room);
      if(room in chatroomUsers) {
        chatroomUsers[room].push(socket.username);
      } else {
        chatroomUsers[room] = [];
        chatroomUsers[room].push(socket.username);
      }
      io.emit('user_has_entered', {
        username: socket.username,
        room: room,
        from: room
      })
      socket.emit('chatroom_participants', {
        participants: [...new Set(chatroomUsers[room])],
        room: room,
        from: room
      })
    });

    socket.on('leave_room', (data) => {
      socket.leave(data.room);
      chatroomUsers[data.room] = chatroomUsers[data.room].filter((user) => user !== data.username)
      io.emit('user_has_left', {
        username: data.username,
        room: data.room,
        from: data.room
      })
    })

    socket.on('send_private_message', (data) => {
      socket.broadcast.to(data.room).emit('receive_private_message_on_client', {
        message: data.message,
        from: data.from,
        room: data.room,
        is_chatroom: false
      });
    });

    socket.on('send_room_message', (data) => {
      socket.to(data.room).emit('receive_room_message_on_client', {
        message: data.message,
        from: data.from,
        room: data.room,
        is_chatroom: true
      })
    })

    socket.on('notify_user_about_incoming_message', (data) => {
      socket.broadcast.to(data.room).emit('render_incoming_message_notification', {
        notification_tab: data.notification_tab,
        room: data.room,
        is_chatroom: data.is_chatroom
      });
    });

    socket.on('send_notification', (data) => {
      console.log('hello received ', data.to)
      socket.broadcast.to(data.to).emit('render_notification', {
        data: data
      })
    })

    socket.on('disconnect', function() {
      users = users.filter((user) => user !== socket.username);
      io.emit('render_new_users', [...new Set(users)]);
      console.log('A user disconnected', socket.username)
    });
    console.log('A user connected', socket.id);
  })
}
