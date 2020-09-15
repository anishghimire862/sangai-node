const socketio = require('socket.io');
module.exports.listen = function(http) {
  const io = require('socket.io')(http);
  io.on('connection', (socket) => {
    socket.on('chat message', (message) => {
      io.emit('chat message', message)
      console.log('message', message);
    });
    console.log('A user connected', socket.id);
  })

}
