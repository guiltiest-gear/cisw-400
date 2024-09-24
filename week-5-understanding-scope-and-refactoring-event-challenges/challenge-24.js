"use strict";

function main() {
  const btn = document.querySelector("button");
  const divtag = document.querySelector("div");

  btn.addEventListener("click", function () {
    // Create the node to be added
    const newpara = document.createElement("p");
    const node = document.createTextNode("A new paragraph");
    newpara.appendChild(node);
    divtag.appendChild(newpara);
  });
}

main();
