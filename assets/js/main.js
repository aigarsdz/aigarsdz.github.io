document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('menu-switch').addEventListener('click', function(e) {
    if (window.location.hash === '#main-header') {
      e.preventDefault();

      window.history.back();
    }
  });
});
