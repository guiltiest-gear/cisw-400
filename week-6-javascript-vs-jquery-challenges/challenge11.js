"use strict";

function main() {
  // Grab the links we're looking for
  const links = document.querySelectorAll("nav ul li a");

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", (event) => {
      // Prevent the default event
      event.preventDefault();

      // Send an alert
      alert("Clicked!");
    });
  }
}

main();
