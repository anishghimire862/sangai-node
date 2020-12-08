var currentPageId = "page-home";
var currentSelectorId = "home";
var isProcessPending = false;

function getButtons(){
  var list = ["home", "feed", "create", "account"];
  return list;
}

function loadHomePage () {
  var pageIdList = getButtons();
  pageIdList.forEach(function(page){
    document.getElementById(page).addEventListener("click", changePage, false);
  });
  loadFeeds();
}

$('#notification_icon').click(function() {
  $.ajax({
    type: 'GET',
    xhrFields: {
      withCredentials: true
    },
    url: '/notifications',
    credentials: 'same-origin', 
    crossDomain: true,
    contentType: false,
    processData: false,
    beforeSend: function() {
      $('#loading_notifications').show();
    },
    complete: function(){
      $('#loading_notifications').hide();
    }, 
    success: function(response) {
      let notifications = response.data;
      let allNotifications = [];
      $.each(notifications, function(index, notification) {
        if(notification.type === 'ecard') {
          allNotifications.push(`
            <div class="dropdown-item">
              <div>
                ${notification.sender} has sent you an ecard
              </div>
              <img 
                class="img-fluid"
                style="width: 200px; height: 180px;"
                src="http://192.168.1.17:3000/images/ecards/${notification.content}"
              />
              <div class="small">
                ${moment(notification.created_at).fromNow()}
              </div>
            </div>
            <div class="dropdown-divider"></div>
          `); 
        }
      })
      $('#notifications').append(allNotifications.join(''));
    }
  })
})

function changePage() {
  var currentSelector = document.getElementById(currentSelectorId);
  var currentPage = document.getElementById(currentPageId);
  var pageId = "page-"+this.id;
  var page = document.getElementById(pageId);
  var pageSelector = document.getElementById(this.id);
  if(page.classList.contains("active")){
    return;
  }

  currentSelector.classList.remove("button-active");
  currentSelector.classList.add("button-inactive");
  currentPage.classList.remove("active");
  currentPage.classList.add("inactive");

  pageSelector.classList.remove("button-inactive");
  pageSelector.classList.add("button-active");

  page.classList.remove("inactive");
  page.classList.add("active");

  window.scrollTo(0,0); 

  currentSelectorId = this.id;
  currentPageId = pageId;
}

function loadFeeds(skip=0) {
  $.ajax({
    type: 'GET',
    xhrFields: {
      withCredentials: true
    },
    url: `/feeds/${skip}`,
    credentials: 'same-origin', 
    crossDomain: true,
    contentType: false,
    processData: false, 
    success: function(response) {
      isProcessPending = false;
      let feeds = response.data;
      let allFeeds = [];
      let likeIconColor = 'black';
      $.each(feeds, function(index, feed) {
        likeIconColor = feed.likedByCurrentUser > 0 ? 'green' : 'black';
        allFeeds.push(`
          <div class="card mt-2">
            <div class="card-header feed-header d-flex p-1">
              <img class="avatar" src="http://192.168.1.17:3000/images/avatars/${feed.creatorAvatar}">
              <span class="mt-1"> ${feed.creatorUsername} </span>
              <div class="d-flex w-100 justify-content-end">
                <div 
                  class="mt-1 small"
                > 
                  ${moment(feed.feedCreatedAt).fromNow()}
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
              <div class="card-body p-1">
                <p class="card-text">
                  ${feed.content}
                </p>
              </div>
              <div class="btn-group p-1" role="group">
                <button 
                  type="button" 
                  class="btn btn-light likeFeedButton"
                  id="${feed.feedId}"
                >
                  <span>
                    <i
                      class="material-icons likeIcon${feed.feedId}"
                      style="color: ${likeIconColor}"
                    >
                      thumb_up
                    </i>
                  </span>
                  <span
                    id="likedByCount${feed.feedId}"
                  >
                    ${feed.likedByCount}
                  </span>
                </button>
                <button 
                  type="button" 
                  class="btn btn-light viewCommentsButton"
                  id="feedCommentsFeedId${feed.feedId}"
                >
                  <span>
                    <i
                      class="material-icons"
                      style="color: black;"
                    >
                      comment
                    </i>
                  </span>
                  <span>
                    Comments
                  </span>
                </button>
              </div>
              <div id="commentsList${feed.feedId}"> 
              </div>
              <div class="p-1">
                <button type="submit" class="btn btn-link small p-0 m-0 addComment" id="addCommentButton${feed.feedId}">Add a comment</button>
                <button type="submit" class="btn btn-link small p-0 m-0 closeCommentButton d-none" id="closeCommentButton${feed.feedId}">Close</button>
                <div class="input-group d-none" id="commentBox${feed.feedId}">
                  <input
                    class="form-control form-control-sm" 
                    type="text" 
                    placeholder="Write your comment here."
                    id="commentContent${feed.feedId}"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-outline-primary p-0 submitComment" type="button" id="submitComment${feed.feedId}">POST</button>
                  </div>          
                </div>
              </div>
            </div>
          </div>
        `);
      })
      $('#feedsList').append(allFeeds.join(''));
    }
  })
}