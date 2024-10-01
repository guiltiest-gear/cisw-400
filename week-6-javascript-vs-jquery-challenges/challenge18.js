"use strict";

function main() {
  $("nav ul li a").on("click", function () {
    $("#paragraph").html(`You clicked ${$(this).html()}`);
  });
}

main();
