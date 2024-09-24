"use strict";

function main() {
  const btn = document.querySelector("button");
  const para = document.querySelector("p");
  btn.addEventListener("click", function () {
    para.style.color = "green";
  });
}

main();
