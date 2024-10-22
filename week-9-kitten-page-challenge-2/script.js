// JS Goes here
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

$(".fancybox").fancybox();

// Toggles the slide of the form container
$("#formtoggle").click(function () {
  $("#formcontainer").slideToggle(1000, function () {
    if ($("#formcontainer").is(":hidden")) {
      $("#formtoggle").html("Open the Kitten Acquisition Form");
    } else {
      $("#formtoggle").html("Close the Kitten Acquisition Form");
    }
  });
  return false;
});

// Affordance calculator
$("#income").on("mousemove change", function () {
  var income = $(this).val();
  var kittenBudget = income * 0.25;
  var kittenCost = 10;
  var kittenAffordance = Math.floor(kittenBudget / kittenCost);
  $("#incomecontainer").html(income);
  $("#num-of-kittens").val(kittenAffordance);

  switch (true) {
    case kittenAffordance == 0:
      $("#kittenaffordance").html(
        "I'm Sorry, you can't afford any kittens :-(",
      );
      $("#submit").css("display", "none");
      break;

    case kittenAffordance == 1:
      $("#kittenaffordance").html("Wahoo! you can afford a kitten!");
      $("#submit").val("Send me 1 kitten").css("display", "block");
      break;

    case kittenAffordance > 1 && kittenAffordance < 21:
      $("#kittenaffordance").html(
        "Congratulations, you can afford " + kittenAffordance + " kittens!",
      );
      $("#submit")
        .val("Send me " + kittenAffordance + " kittens!")
        .css("display", "block");
      break;

    case kittenAffordance > 20:
      $("#kittenaffordance").html("Wow, you can afford lots of kittens!");
      $("#submit").val("Send me all the kittens!").css("display", "block");
      break;
  }
});

// Two additional regular expressions for the validator script...
$.validator.addMethod(
  "phoneRegex",
  function (value, element) {
    return (
      this.optional(element) ||
      /^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/i.test(value)
    );
  },
  " - Make sure it's valid.",
);

$.validator.addMethod(
  "zipRegex",
  function (value, element) {
    return this.optional(element) || /^\d{5}(?:[-\s]\d{4})?$/i.test(value);
  },
  " - Make sure it's valid.",
);

// Validating the form...
$("#kittenform").validate({
  errorElement: "span",
  errorClass: "help-inline",
  errorPlacement: function (error, element) {
    error.appendTo(element.prev($("label")));
  },

  rules: {
    name: "required",
    email: { required: true, email: true },
    phone: { required: true, phoneRegex: true },
    street: "required",
    city: "required",
    state: "required",
    zip: { required: true, zipRegex: true },
    comments: "required",
  },

  messages: {
    name: " - Required!",
    email: { required: " - Required!", email: " - Make sure it's valid!" },
    phone: { required: " - Required!", phone: "" },
    street: " - Required!",
    city: " - Required!",
    state: " - Required!",
    zip: { required: " - Required!", zip: "" },
    comments: " - Tell us about your kitten needs.",
  },
});
