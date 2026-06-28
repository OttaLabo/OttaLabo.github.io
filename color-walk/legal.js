(function () {
  "use strict";

  function pick() {
    var h = (location.hash || "").replace("#", "").toLowerCase();
    if (h === "ja" || h === "en") return h;
    var n = (navigator.language || "ja").toLowerCase();
    return n.indexOf("ja") === 0 ? "ja" : "en";
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    var blocks = document.querySelectorAll("[data-lang]");
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].hidden = blocks[i].getAttribute("data-lang") !== lang;
    }
    var buttons = document.querySelectorAll(".lang");
    for (var j = 0; j < buttons.length; j++) {
      var on = buttons[j].getAttribute("data-set") === lang;
      buttons[j].classList.toggle("active", on);
    }
  }

  function init() {
    apply(pick());
    var buttons = document.querySelectorAll(".lang");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        var l = this.getAttribute("data-set");
        history.replaceState(null, "", "#" + l);
        apply(l);
        window.scrollTo(0, 0);
      });
    }
    window.addEventListener("hashchange", function () {
      apply(pick());
    });
  }

  if (document.readyState !== "loading") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
