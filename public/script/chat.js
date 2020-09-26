$(document).ready(function() {
  socket.on('render_new_users', function(data) {
    let users = [];
    let allUsersList = [];
    let allChatroomsList = [];

    $('#usersList').empty();
    $('#chatroomsList').empty();

    parsedAllUsers.map((user) => {
      if(data.includes(user.username)) {
        users.unshift({ username: user.username, presence: 'online' })
      } else {
        users.push({ username: user.username, presence: 'offline' })
      }
    });

    let usersExceptLoggedUser = users.filter((user) => user.username !== conversation_id);
    $.each(usersExceptLoggedUser, function(index, user) {
      let presence = user.presence === 'online' ? `<span class='presence online-presence'></span>` : `<span class='presence offline-presence'></span>`;
      allUsersList.push(`
        <li class="users-list">
          <span>
            ${presence}
          </span>
          <a href="#" class="open-new-tab" id="user_${user.username}">
            ${user.username}
          </a>
        </li>
      `);
    })

    $.each(parsedAllChatrooms, function(index, chatroom) {
      allChatroomsList.push(`
        <li class="users-list">
          <span class='presence online-presence'></span>
          <a href="#" class="open-new-tab" id="room_${chatroom.chatroom_name}">
            ${chatroom.chatroom_name}
          </a>
        </li>
      `);
    })

    $('#usersList').append(allUsersList.join(''));
    $('#chatroomsList').append(allChatroomsList.join(''));
  })

  $(".nav-tabs").on("click", "a", function(e) {
    hideIncomingMessageAlert(receiverUserName);
    e.preventDefault();
    if(!$(this).hasClass('open-new-tab')) {
      $(this).tab('show');
    }
  })
  .on("click", "span", function() {
    var anchor = $(this).siblings('a');
    $(anchor.attr('href')).remove();
    $(this).parent().remove();
    $(".nav-tabs li").children('a').first().click();
  });

  // set receiver userName in the global scope

  $(document).on('click', '.open-new-tab', function(e) {
    receiverUserName = $(this).attr('id').substr(5);
    chatType = $(this).attr('id').substr(0,4);
  });

  $(document).on('click', '.update-user-name', function(e) {
    receiverUserName = $(this).attr('id').substr(5);
    chatType = $(this).attr('id').substr(0,4);
  });
  

  $(document).on('click', '.open-new-tab', function(e){
    e.preventDefault();
    openNewTab(receiverUserName, true, chatType);
  })

  $(function () {
    $(document).on("submit", `#message_container`, function(e) {
      e.preventDefault();
      const message = $(this).find('#messageContent').val();
      if(chatType === 'user') {
        socket.emit('send_private_message', {
          room: 'private_' +receiverUserName,
          from: currentUser,
          message: message
        });
        appendMessage(receiverUserName, currentUser, message, false, false, 'user');
      } else {
        socket.emit('send_room_message', {
          room: receiverUserName,
          from: currentUser,
          message: message
        });
        appendMessage(receiverUserName, currentUser, message, false, false, 'room');
      }

      socket.emit('notify_user_about_incoming_message', {
        notification_tab: chatType === 'user' ? currentUser : receiverUserName,
        room: chatType === 'user' ? 'private_' +receiverUserName : receiverUserName,
        is_chatroom: chatType === 'room' ? true : false
      });
      $(this).find('#messageContent').val('');
      return false;
    })
  });

  socket.on('receive_private_message_on_client', function(message) {
    openNewTab(message.from, false, 'user');
    appendMessage(message.from, message.from, message.message, true, false, 'user');
  });

  socket.on('receive_room_message_on_client', function(message) {
    openNewTab(message.room, false, 'room');
    appendMessage(message.room, message.from, message.message, true, false, 'room');
  });

  socket.on('render_incoming_message_notification', function(data) {
    let type = data.is_chatroom ? 'room' : 'user' 
    $(`#${type}_list_${data.notification_tab}`).addClass('incoming-message-alert');
  });

  socket.on('chatroom_participants', function(data) {
    let fullMessage = 'Currently in the chatroom: ' +data.participants.join(', ') + '.';
    appendMessage(data.room, data.from, fullMessage, true, true, 'room');
  });

  socket.on('user_has_entered', function(data) {
    let fullMessage = `${data.username} has entered.`;
    appendMessage(data.room, data.from, fullMessage, true, true, 'room');
  });

  function appendMessage (messageId, from, message, isReceivedMessage, isInformation, chatType) {
    let color = isReceivedMessage ? 'blue-text' : 'green-text';
    let userNameColor = isInformation ? 'text-orange' : color;
    let textFont = isInformation ? 'font-italic' : 'font-weight-light'
    $(`#messages_${chatType}_${messageId}`).append($(`
      <li> 
        <span class="${userNameColor}">
          ${from}
        </span>
        :
        <span class="${textFont}">
          ${message}
        </span>
      </li>
    `));
  }

  function openNewTab(receiverUserName, shouldRedirectToTab, chatType) {
    hideIncomingMessageAlert(receiverUserName);
    // the if block will execute when a chat tab is already opened
    // this will take user to the opened tab instead of creating a new chat tab
    if($(`.nav-link#${chatType}_${receiverUserName}`).length > 0) {
      // on incoming messages just open the tab but dont redirect to the tab
      if(shouldRedirectToTab) {
        const listItem = $(`#${chatType}_list_${receiverUserName}`)
        const tabIndex = $('li').index(listItem);
        $(`.nav-tabs li:nth-child(${tabIndex + 1}) a`).click();
      } else {
        return false;
      }
    } else {
      if(chatType === 'room') {
        socket.emit('join_chatroom', receiverUserName);
      }
      var id = $(".nav-tabs").children().length;
      id++;
      var tabId = 'tab_' + id;
      const chatBox = `
        <div class="container position-fixed" style="width: 100%; left: 0; right: 0;" id="message_container">
          <div class="card bg-color" style="width: 100%; height: 70vh;">
            <div class="card-header">
              ${receiverUserName}
            </div>
            <div class="card-body overflow-auto" style="width: 100%; height: 65vw;">
              <ul id="messages_${chatType}_${receiverUserName}" class="list-unstyled">
                <li>
                </li>
              </ul>
            </div>
            <div class="card-footer text-muted p-1">
              <form action="#" id="messageForm_${receiverUserName}">
                <div class="input-group">
                  <input type="hidden" value="${receiverUserName}" id="receiverUserName" />
                  <textarea class="form-control" id="messageContent" rows="1" placeholder="Type your message here..." required style="resize:none"></textarea>
                  <button class="btn btn-primary input-group-addon ml-1" id="sendMessageButton">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      `;
      $(".nav-tabs").append(`
        <li class="nav-item" id="${chatType}_list_${receiverUserName}">
          <a class="nav-link update-user-name" data-toggle="tab" href="#tab_${chatType}_${receiverUserName}" id="${chatType}_${receiverUserName}"> 
            ${receiverUserName} 
          </a>
          <span>
            x
          </span> 
        </li>
      `);
      $('.tab-content').append(`<div class="tab-pane fade ${receiverUserName}" id="tab_${chatType}_${receiverUserName}"> ${chatBox} </div>`);
      if(shouldRedirectToTab) {
        $('.nav-tabs li:nth-child(' + id + ') a').click();
      }
    }
  }

  function hideIncomingMessageAlert(receiverUserName) {
    $(`#${chatType}_list_${receiverUserName}`).removeClass('incoming-message-alert');
  }
})