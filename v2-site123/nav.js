// Menu mobile et FAQ de Crescendo (remplace les scripts Site123 non repris).
(function () {
  "use strict";

  // FAQ : un clic ouvre ou ferme la réponse.
  document.querySelectorAll("[data-faq-item]").forEach(function (item) {
    var toggle = item.querySelector("[data-faq-toggle]");
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      var open = item.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  // Menu mobile : ouverture, fermeture, lien cliqué, touche Échap.
  var overlay = document.getElementById("navOverlay");
  var openBtn = document.getElementById("navOpenButton");
  var closeBtn = document.getElementById("navCloseButton");
  if (!overlay || !openBtn || !closeBtn) return;

  function setMenu(open) {
    overlay.classList.toggle("is-open", open);
    overlay.setAttribute("aria-hidden", open ? "false" : "true");
    openBtn.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
    (open ? closeBtn : openBtn).focus();
  }

  openBtn.addEventListener("click", function () { setMenu(true); });
  closeBtn.addEventListener("click", function () { setMenu(false); });
  overlay.querySelectorAll(".nav-close-link").forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) setMenu(false);
  });
})();
