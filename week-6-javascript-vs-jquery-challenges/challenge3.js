"use strict";

function main() {
  // Get the children of the div
  const redParas = document.querySelectorAll("#main p");
  for (let i = 0; i < redParas.length; i++) {
    redParas[i].style.fontSize = "24px";
    redParas[i].style.color = "red";
  }
}

main();
