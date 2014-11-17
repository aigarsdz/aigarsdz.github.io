document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('menu-switch').addEventListener('click', function(e) {
    if (e.currentTarget.getAttribute('href') === '#main-header') {
      e.currentTarget.setAttribute('href', '#');
    } else if (e.currentTarget.getAttribute('href') === '#') {
      e.currentTarget.setAttribute('href', '#main-header');
    }
  });
});
