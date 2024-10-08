$(window).load(function () {
  $(".flexslider").flexslider({
    animation: "slide",
    slideshowSpeed: 5000,
    pauseOnHover: true,
    before: function () {
      $(".cta").css("bottom", "100%");
    },
    start: function () {
      $(".cta").animate({ bottom: "5%" }, 3000, "easeOutElastic");
    },
    after: function () {
      $(".cta").animate({ bottom: "5%" }, 3000, "easeOutElastic");
    },
  });
});
