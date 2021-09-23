function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("dx-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("dx-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, false);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }

  $(document).ready(function() {
    $().ready(function() {
      includeHTML();
      var locations = [
        'dashboard',
        'tables',
        'jobs'
      ]
      var activePath = document.location.pathname.split('/').pop().split('.')[0];
      activeIndex = locations.indexOf(activePath);
      $('.sidebar-wrapper .nav-item').removeClass('active').eq(activeIndex).addClass('active');
    })
  })