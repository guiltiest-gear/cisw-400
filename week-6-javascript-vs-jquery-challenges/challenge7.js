"use strict";

function main() {
  // Get the div container
  const redParas = document.querySelectorAll("#main p:nth-child(even)");
  for (let i = 0; i < redParas.length; i++) {
    redParas[i].style.color = "red";
  }
}

main();
