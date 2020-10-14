$(document).ready(function() {
  $('#notification_icon').click(function() {
    $('#notification_dot').css('background-color', '');
  })
  socket.on('render_notification', function(data) {
    $('#notification_dot').css('background-color', 'red');
  })
})