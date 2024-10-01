"use strict";

function main() {
  $("#slideupbox").on("click", function () {
    $("#box").slideUp(1000);
  });

  $("#slidedownbox").on("click", function () {
    $("#box").slideDown(200);
  });

  $("#slidetogglebox").on("click", function () {
    $("#box").slideToggle(2000, "easeOutBounce", function () {
      alert("Finished!");
    });
  });
}

main();
