var element = $('#ecardBackground');
var getCanvas;
var receiver;

$('.colors').click(function() {
	var chosen_color = $(this).css('background-color');
	$('#canvas').css('background-color', chosen_color);
});

$('.texture').click(function(){
	var chosen_texture = $(this).css('background-image');
	$('#canvas').css('background-image', chosen_texture);
});

$('#ecardMessage').click(function() {
  $('#messageOutput').html($(this).val());
});

$('#recipient').keyup(function() {
  var recipient = $(this).val();
  receiver = $(this).val();
	$('#recipientOutput').html(recipient);
});

$('.stickers').click(function() {
  var new_sticker = $(this).clone();
	new_sticker.addClass('stickers_on_card');
	$('#canvas').prepend(new_sticker);
	new_sticker.draggable({containment:'#canvas'});
});

$('#ecardControls').on('click', '.stickers', function () {
  var new_sticker = $(this).clone();
  new_sticker.addClass('stickers_on_card');
  $('#canvas').prepend(new_sticker);
  new_sticker.draggable({
    containment: '#canvas',
    opacity: .35
  });
});

$('#refreshEcardButton').click(function(e) {
  e.preventDefault();
  $('#messageOutput').text('');
  $('#recipientOutput').text('');
  $('#canvas').css('background-color', '');
  $('#canvas').css('background-image', '');
  $('#canvas img').remove();
});

function aaa () {
  alert()
}

$('#submitEcardButton').click(function(event) {
  event.preventDefault();
  html2canvas(element, {
    onrendered: function (canvas) {
      canvas.toBlob(function(blob) {
        const formData = new FormData();
        formData.append('ecard', blob);
        formData.append('receiver', receiver);
        formData.append('message', 'Hello!! this is custom message along with ecard');
        $.ajax({
          type: 'POST',
          xhrFields: {
            withCredentials: true
          },
          url: '/ecard',
          credentials: 'same-origin', 
          crossDomain: true,
          data: formData,
          contentType: false,
          processData: false,
          success: function(response) {
            socket.emit('send_notification', {
              to: 'private_' +response.receiver,
              from: response.sender,
              type: 'ecard',
              message: 'You have received an ecard.'
            });
            alert('Successfully sent ecard.');
          }
        })
      })
    }
  })
})
