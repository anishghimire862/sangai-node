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