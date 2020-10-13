var currentPageId = "page-home";
var currentSelectorId = "home";

function getButtons(){
  var list = ["home", "feed", "create", "account"];
  return list;
}

function loadHomePage () {
  var pageIdList = getButtons();
  pageIdList.forEach(function(page){
    document.getElementById(page).addEventListener("click", changePage, false);
  });
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
                src="http://localhost:3000/images/ecards/${notification.content}"
              />
              <div class="small">
                ${moment(notification.created_at).startOf('hour').fromNow()}
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