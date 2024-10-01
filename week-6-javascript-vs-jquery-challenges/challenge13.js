"use strict";

function main() {
  // Get the links
  const links = document.querySelectorAll("nav ul li a");
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (event) {
      event.preventDefault();
      alert(this.innerHTML);
    });
  }
}

main();
