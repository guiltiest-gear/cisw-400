"use strict";

function main() {
  $("nav ul li a").on("click", function () {
    $(this).css("color", "red");
  });
}

main();
