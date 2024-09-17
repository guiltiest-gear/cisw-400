const myImages = [
  "biden-blast.jpg",
  "is-he-stupid.jpg",
  "lebron-fail-heat-action.png",
  "lebron-fail-ultrakill.jpg",
];

const imagepath = "images/";
var currentImage = 0;

document.getElementById("next").onclick = nextPhoto;
document.getElementById("previous").onclick = previousPhoto;

function nextPhoto() {
  currentImage++;
  if (currentImage > myImages.length - 1) currentImage = 0;
  document.getElementById("myimage").src = imagepath + myImages[currentImage];
}

function previousPhoto() {
  currentImage--;
  if (currentImage < 0) currentImage = myImages.length - 1;
  document.getElementById("myimage").src = imagepath + myImages[currentImage];
}
