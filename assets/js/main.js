document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('menu-switch').addEventListener('click', function(e) {
    if (window.location.hash === '#main-header') {
      e.preventDefault();

      document.getElementById('main-header').style.width = 0;
      document.getElementsByTagName('main')[0].style.right = 0;
      window.history.back();
    }
  });
});
