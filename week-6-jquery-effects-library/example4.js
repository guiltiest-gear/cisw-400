"use strict";

function main() {
  $("#growbox").on("click", function () {
    $("#box").animate({ width: "710px" });
  });

  $("#growtext").on("click", function () {
    $("#box").animate({ fontSize: "24px" }, 1000);
  });

  $("#movebox").on("click", function () {
    $("#box").animate({ left: "+=300px" }, 1500, "linear");
  });

  $("#doall").on("click", function () {
    $("#box").animate(
      { width: "710px", fontSize: "24px", left: "+=300px" },
      1500,
    );
  });

  $("#sequence").on("click", function () {
    $("#box").animate({ width: "710px" }, 1500, function () {
      $("#box").animate({ fontSize: "24px" }, 1500, function () {
        $("#box").animate({ left: "+=300px" }, 1500, "linear");
      }); // end movebox
    }); // end growtext
  }); // end growbox
}

main();
