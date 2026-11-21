/* Aether Design
   Small, dependency-free script.
   - Header hairline after scroll
   - Mobile menu toggle
   - Copy email button
   - Plate preview with previous and next, keyboard support */

(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var menuToggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");

  /* Header hairline */
  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* Mobile menu */
  function setMenu(open) {
    header.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.querySelector(".menu-label").textContent = open ? "Close" : "Menu";
  }

  menuToggle.addEventListener("click", function () {
    setMenu(!header.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && header.classList.contains("is-open")) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) {
      setMenu(false);
    }
  });

  /* Copy email */
  document.querySelectorAll("[data-copy]").forEach(function (button) {
    var original = button.textContent;
    button.addEventListener("click", function () {
      var value = button.getAttribute("data-copy");
      var done = function () {
        button.textContent = "Copied";
        button.classList.add("is-copied");
        setTimeout(function () {
          button.textContent = original;
          button.classList.remove("is-copied");
        }, 1800);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done, function () {});
      } else {
        var field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "absolute";
        field.style.left = "-9999px";
        document.body.appendChild(field);
        field.select();
        try {
          document.execCommand("copy");
          done();
        } finally {
          document.body.removeChild(field);
        }
      }
    });
  });

  /* Plate preview */
  var plates = Array.prototype.slice.call(document.querySelectorAll(".plate-frame"));
  var dialog = document.getElementById("lightbox");
  var stageImg = dialog.querySelector(".lightbox-stage img");
  var caption = dialog.querySelector(".lightbox-caption");
  var closeButton = dialog.querySelector(".lightbox-close");
  var prevButton = dialog.querySelector(".lightbox-prev");
  var nextButton = dialog.querySelector(".lightbox-next");
  var current = 0;

  function showPlate(index) {
    var count = plates.length;
    current = (index + count) % count;
    var frame = plates[current];
    var img = frame.querySelector("img");
    var title = frame.closest(".plate").querySelector(".plate-title").textContent;

    stageImg.src = img.src;
    stageImg.alt = img.alt;
    caption.textContent = title;
  }

  function openPlate(index) {
    showPlate(index);
    if (!dialog.open) {
      dialog.showModal();
    }
    closeButton.focus();
  }

  plates.forEach(function (frame, index) {
    frame.addEventListener("click", function () {
      openPlate(index);
    });
  });

  prevButton.addEventListener("click", function () {
    showPlate(current - 1);
  });

  nextButton.addEventListener("click", function () {
    showPlate(current + 1);
  });

  closeButton.addEventListener("click", function () {
    dialog.close();
  });

  /* Close when the backdrop outside the panel is clicked */
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      showPlate(current - 1);
    } else if (event.key === "ArrowRight") {
      showPlate(current + 1);
    }
  });

  dialog.addEventListener("close", function () {
    stageImg.removeAttribute("src");
    stageImg.alt = "";
  });
})();
