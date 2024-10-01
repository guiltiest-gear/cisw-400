"use strict";

function main() {
  // Hide the box
  $("#hidebox").on("click", function () {
    $("#box").hide(500);
  });

  // Show the box
  $("#showbox").on("click", function () {
    $("#box").show(200);
  });

  // Toggle the box
  $("#togglebox").on("click", function () {
    $("#box").toggle(2000, function () {
      alert("done");
    });
  });
}

main();
