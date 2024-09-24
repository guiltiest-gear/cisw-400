"use strict";

function main() {
  const bodytag = document.querySelector("body");
  window.addEventListener("scroll", function () {
    let pageTop = window.pageYOffset || document.documentElement.scrollTop;
    switch (true) {
      case pageTop < 500:
        bodytag.className = "one";
        break;
      case pageTop < 1000:
        bodytag.className = "two";
        break;
      case pageTop < 1500:
        bodytag.className = "three";
        break;
      case pageTop < 2000:
        bodytag.className = "four";
        break;
      default:
        bodytag.className = "five";
        break;
    }
  });
}

main();
