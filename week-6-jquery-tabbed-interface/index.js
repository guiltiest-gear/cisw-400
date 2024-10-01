"use strict";

function main() {
  $("#tabs > ul > li > a").on("click", function () {
    // Set color of all the tabs to "inactive tab" colors
    $("#tabs > ul > li > a").css({ background: "#A2A2A2", color: "#CECECE" });

    // Set clicked tab to "active tab" color
    $(this).css({ background: "#EAEAEA", color: "#333" });

    // Grab value of href from link that was clicked
    const thisTab = $(this).attr("href");

    // Fade out visible tab
    $("#tabs > div:visible").fadeOut(200, function () {
      // Fade in tab with matching id
      $(thisTab).fadeIn(200);
    });
  });
}

main();
