"use strict";

function main() {
  $("nav ul li a").on("click", function () {
    alert($(this).html());
  });
}

main();
