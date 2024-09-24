"use strict";

function main() {
  const btn = document.querySelector("button");
  const para = document.getElementsByTagName("p");
  btn.addEventListener("click", function () {
    for (let i = 0; i < para.length; i++) {
      para[i].style.color = "green";
    }
  });
}

main();
