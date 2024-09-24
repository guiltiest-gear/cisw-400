"use strict";

function main() {
  const addbtn = document.querySelectorAll("button")[0];
  const rmbtn = document.querySelectorAll("button")[1];
  const divtag = document.querySelector("div");
  let paranum = 1;

  addbtn.addEventListener("click", function () {
    paranum++;
    const newpara = document.createElement("p");
    const node = document.createTextNode(`This is paragraph number ${paranum}`);
    newpara.appendChild(node);
    divtag.appendChild(newpara);
  });

  rmbtn.addEventListener("click", function () {
    if (paranum > 1) {
      divtag.removeChild(divtag.children[paranum - 1]);
      paranum--;
    } else {
      alert("Hey! You can't delete that one!");
    }
  });
}

main();
