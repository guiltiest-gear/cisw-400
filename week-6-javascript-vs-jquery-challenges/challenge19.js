"use strict";

function main() {
  // Get the links
  const links = document.querySelectorAll("nav ul li a");
  // Get paragraphs
  const paragraphs = document.querySelectorAll("p");

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (event) {
      event.preventDefault();

      // Make all the paragraphs black
      for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.color = "black";
      }

      document.querySelector(`#para${this.id}`).style.color = "red";
    });
  }
}

main();
