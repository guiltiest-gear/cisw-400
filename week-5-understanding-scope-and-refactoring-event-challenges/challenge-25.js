"use strict";

function main() {
  const addbtn = document.querySelectorAll("button")[0];
  const rmbtn = document.querySelectorAll("button")[1];
  const divtag = document.querySelector("div");

  addbtn.addEventListener("click", function () {
    // Create the node to be added
    const newpara = document.createElement("p");
    const node = document.createTextNode("A new paragraph");
    newpara.appendChild(node);
    divtag.appendChild(newpara);
  });

  rmbtn.addEventListener("click", function () {
    const allparas = document.querySelectorAll("p");
    divtag.removeChild(divtag.children[allparas.length - 1]);
  });
}

main();
