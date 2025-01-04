document.addEventListener("DOMContentLoaded", function() {
  if (window.location.pathname.match(/^\/chats\/\d+$/)) {
    var link = document.querySelector('link[href*="devise.css"]');
    if (link) {
      link.disabled = true;
    }
  } else {
    var link = document.querySelector('link[href*="devise.css"]');
    if (link) {
      link.disabled = false;
    }
  }
});
