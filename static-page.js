(function () {
  "use strict";
  var btn = document.getElementById("luma-menu-btn");
  var nav = document.getElementById("luma-mobile-nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", function () {
    var open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    nav.hidden = open;
  });
})();
