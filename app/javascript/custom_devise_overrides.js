document.addEventListener("DOMContentLoaded", function() {
  // チャットページのURLパスに基づいてCSSを無効にします
  if (window.location.pathname.match(/^\/chats\/\d+$/)) {
    var link = document.querySelector('link[href*="devise.css"]');
    if (link) {
      link.disabled = true;
    }
  }
});
