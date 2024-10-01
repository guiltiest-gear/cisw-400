"use strict";

function main() {
  // Get the paragraph first
  const changePara = document.getElementById("paragraph");
  // Get the links
  const links = document.querySelectorAll("nav ul li a");

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (event) {
      event.preventDefault();
      changePara.innerHTML = `You clicked ${this.innerHTML}`;
    });
  }
}

main();
