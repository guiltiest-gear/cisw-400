"use strict";

function main() {
  $("#fadeoutbox").on("click", function () {
    $("#box").fadeOut(1000);
  });

  $("#fadeinbox").on("click", function () {
    $("#box").fadeIn(1000);
  });

  $("#fadeto20box").on("click", function () {
    $("#box").fadeTo(1000, 0.2);
  });

  $("#fadeto100box").on("click", function () {
    $("#box").fadeTo(1000, 1, "swing", function () {
      alert("Finished!");
    });
  });
}

main();
