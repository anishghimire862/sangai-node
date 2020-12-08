$(document).ready(function() {
  let scrollSkip = 10;
  let recordsTotal = 60;
  let defaultHeightForScroll = 270;
  $('#feedsList').on('scroll', function() {
    let scrollPercent = Math.round(($('#feedsList').scrollTop()) / ($(document).height() - $('#feedsList').height()) * 100);
    if(scrollPercent > defaultHeightForScroll) {
      if(isProcessPending == false && scrollSkip < recordsTotal) {
        loadFeeds(scrollSkip);
        scrollSkip += 10;
        defaultHeightForScroll += 277;
      }
    }
  })
  $('#submitFeed').click(function(event) {
    event.preventDefault();
    feed = $('#feedContent').val();

    $.ajax({
      type: 'POST',
      xhrFields: {
        withCredentials: true
      },
      url: '/feeds',
      credentials: 'same-origin', 
      crossDomain: true,
      data: JSON.stringify({'content': feed}),
      contentType: 'application/json',
      processData: false,
      success: function(response) {
        $('#feedContent').val('');
        $('#feedsList').empty();
        loadFeeds();
      }
    })
  })
});

$(document).on('click', '.likeFeedButton', function() {
  let post_id = $(this).attr('id');
  $.ajax({
    type: 'POST',
    xhrFields: {
      withCredentials: true
    },
    url: '/like_feed',
    credentials: 'same-origin', 
    crossDomain: true,
    data: JSON.stringify({'post_id': post_id}),
    contentType: 'application/json',
    processData: false,
    success: function(response) {
      let currentLike = $(`#likedByCount${post_id}`).text().trim();
      let likeIconColor;
      if(response.status === 'success') {
        currentLike++;
        likeIconColor = 'green';
      } else {
        currentLike--;
        likeIconColor = 'black';
      }
      $(`.likeIcon${post_id}`).css('color', likeIconColor);
      $(`#likedByCount${post_id}`).text(currentLike);
    }
  })
})

$(document).on('click', '.addComment', function() {
  let post_id = $(this).attr('id').substr(16);
  $(`#addCommentButton${post_id}`).addClass('d-none');
  $(`#closeCommentButton${post_id}`).removeClass('d-none');
  $(`#commentBox${post_id}`).removeClass('d-none');
});

$(document).on('click', '.closeCommentButton', function() {
  let post_id = $(this).attr('id').substr(18);
  $(`#addCommentButton${post_id}`).removeClass('d-none');
  $(`#commentBox${post_id}`).addClass('d-none');
  $(`#closeCommentButton${post_id}`).addClass('d-none');
});

$(document).on('click', '.submitComment', function() {
  let post_id = $(this).attr('id').substr(13);
  let content = $(`#commentContent${post_id}`).val();
  let data = {
    feed_id: post_id,
    content: content
  }
  $.ajax({
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    xhrFields: {
      withCredentials: true
    },
    url: '/comments',
    credentials: 'same-origin', 
    crossDomain: true,
    data: JSON.stringify(data),
    processData: false,
    success: function(response) {
      alert('successfully commented.')
    }
  })
})

$(document).on('click', '.viewCommentsButton', function() {
  let post_id = $(this).attr('id').substr(18);
  $.ajax({
    type: 'GET',
    xhrFields: {
      withCredentials: true
    },
    url: `/comments/${post_id}`,
    credentials: 'same-origin', 
    crossDomain: true,
    contentType: false,
    processData: false, 
    success: function(response) {
      let comments = response.data;
      let allComments = [];
      $.each(comments, function(index, comment) {
        allComments.push(`
          <div class="card m-4">
            <div class="card-header feed-header d-flex p-2">
              <img class="avatar" src="http://192.168.1.17:3000/images/avatars/${comment.creatorAvatar}">
              <span class="mt-1"> ${comment.creatorUsername} </span>
              <div class="d-flex w-100 justify-content-end">
                <div 
                  class="mt-1 small"
                > 
                  ${moment(comment.commentCreatedAt).fromNow()}
                </div>
                  <div class="dropdown dropdown d-flex mt-1">
                    <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i 
                        class="material-icons" 
                        id="notification_icon" 
                        style="font-size: 20px; color: black;"
                      >
                        more_vert
                      </i>
                    </a>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Update Feed</a>
                      <a class="dropdown-item" href="#">Delete Feed</a>
                    </div>        
                  </div>
                </div>
              </div>
              <div class="card-body p-2">
                <p class="card-text">
                  ${comment.content}
                </p>
              </div>
            </div>
          </div>
        `);
      })
      $(`#commentsList${post_id}`).append(allComments.join(''));
    }
  })
})