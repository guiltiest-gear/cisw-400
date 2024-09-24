"use strict";

function main() {
  const h1tag = document.querySelector("h1");
  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const num = parseInt(document.querySelector("input").value);
    if (num) {
      h1tag.style.fontSize = num + "px";
    } else {
      alert("Please input a number");
    }
  });
}

main();
