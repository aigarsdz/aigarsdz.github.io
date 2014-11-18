document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('menu-switch-container').addEventListener('click', function(e) {
    var hrefValue = document.getElementById('menu-switch').getAttribute('href');

    if (hrefValue === '#main-header') {
      e.currentTarget.innerHTML = '<a href="#" id="menu-switch"><i class="fa fa-bars"></i></a>';
    } else {
      e.currentTarget.innerHTML = '<a href="#main-header" id="menu-switch"><i class="fa fa-bars"></i></a>';
    }
  });
});
