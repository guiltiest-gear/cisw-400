"use strict";

function main() {
  const bodytag = document.querySelector("body");
  function change_class(newclass) {
    bodytag.className = newclass;
  }

  document.addEventListener("keydown", function (event) {
    event.preventDefault();
    // Convert the char code to a letter
    const whichkey = String.fromCharCode(event.which);

    // Change the class based on the key pressed
    switch (whichkey) {
      case "B":
        change_class("one");
        break;
      case "V":
        change_class("two");
        break;
      case "C":
        change_class("three");
        break;
      case "F":
        change_class("four");
        break;
      case "G":
        change_class("five");
        break;
      default:
        alert("Hey man, those are all the colors I have, take it or leave it");
        break;
    }
  });
}

main();
