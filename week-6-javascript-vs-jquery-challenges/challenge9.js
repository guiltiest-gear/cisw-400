"use strict";

function main() {
  const changePara = document.querySelectorAll("#main p");
  for (let i = 0; i < changePara.length; i++) {
    if (changePara[i].innerHTML === "Llamas and Chickens!") {
      changePara[i].style.color = "red";
    }
  }
}

main();
