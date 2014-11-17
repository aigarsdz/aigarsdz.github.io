window.addEventListener('popstate', function() {
  var menuButton = document.getElementById('menu-switch');

  if (/#.*$/.test(location.href)) {
    if (menuButton.getAttribute('href') === '#main-header') {
      menuButton.setAttribute('href', '#');
    } else {
      menuButton.setAttribute('href', '#main-header');
    }
  }
});
