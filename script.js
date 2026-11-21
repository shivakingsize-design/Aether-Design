// Aether Design portfolio
// 1. Adds a hairline under the header once the page has scrolled.
// 2. Opens a project image in a larger preview.

(function () {
  "use strict";

  // Header state
  var header = document.querySelector(".site-header");

  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // Image preview
  var dialog = document.getElementById("lightbox");
  var dialogImg = dialog.querySelector("img");
  var closeButton = dialog.querySelector(".lightbox-close");

  document.querySelectorAll(".project-image").forEach(function (button) {
    button.addEventListener("click", function () {
      var img = button.querySelector("img");
      dialogImg.src = img.src;
      dialogImg.alt = img.alt;
      dialog.showModal();
      closeButton.focus();
    });
  });

  closeButton.addEventListener("click", function () {
    dialog.close();
  });

  // Close when the backdrop (outside the image) is clicked
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("close", function () {
    dialogImg.removeAttribute("src");
    dialogImg.alt = "";
  });
})();
