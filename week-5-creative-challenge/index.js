"use strict";

function newElements() {
  // Now that the page is clear, fade in the elements we need
  const answer = document.createElement("h1");
  answer.innerText = "One dolar !";
  // Add appropriate class tags
  answer.classList.add("fadeinimg", "center-text");
  // Make the text really big
  answer.style.fontSize = "200px";

  // Make another element to append
  const thanks = document.createElement("h2");
  thanks.innerText = "Thx for watching !";
  thanks.classList.add("fadeinimg", "center-text");
  thanks.style.fontSize = "50px";

  const beatDropMs = 11000;
  // Wait for the beat drop
  setTimeout(() => {
    // Append the node to the body
    document.body.appendChild(answer);
  }, beatDropMs);

  // Add the other element 3 seconds after the first text
  setTimeout(() => {
    // Append the node to the body
    document.body.appendChild(thanks);
  }, beatDropMs + 3000);
}

function playAudio() {
  let audio = new Audio("media/invincible.m4a");
  audio.play();
}

function main() {
  // Grab the button that has the clickme class
  const btn = document.querySelector("button.clickme");
  // Also grab the elements with the removeme class
  const removeme = document.getElementsByClassName("removeme");
  // Capture when it's clicked
  btn.addEventListener("click", function (event) {
    event.preventDefault();
    // Since we're removing elements in the loop, store the length in a variable
    const length = removeme.length;
    // HACK: For some bizarre reason, all the evements actaully get removed if I do the loop in reverse
    // I have no idea why it's like this, other than to blame this horrid language
    for (let i = length - 1; i >= 0; i--) {
      removeme[i].classList.add("fadeoutimg");
      setTimeout(() => {
        removeme[i].remove();
      }, 1999);
    }
    // Now call the function to add the new element
    newElements();
    playAudio();
  });
}

main();
