"use strict";

function main() {
  $("nav ul li a").on("click", function () {
    $("p").css("color", "black");
    $(`#para${$(this).attr("id")}`).css("color", "red");
  });
}

main();
