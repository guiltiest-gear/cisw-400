"use strict";

function main() {
  // Get the div
  const divtag = document.querySelector("div");

  // Add the class on the mouseover event
  divtag.addEventListener("mouseover", function () {
    divtag.classList.add("big");
  });

  // Remove the class on the mouseout event
  divtag.addEventListener("mouseout", function () {
    divtag.classList.remove("big");
  });
}

main();
