$(function () {
  "use strict";
  const startGame = $("#startgame");
  const gameControl = $("#gamecontrol");
  const game = $("#gamecontrol");
  const score = $("#score");
  const actionArea = $("#actions");

  const gameData = {
    dice: [
      "1die.jpg",
      "2die.jpg",
      "3die.jpg",
      "4die.jpg",
      "5die.jpg",
      "6die.jpg",
    ],
    players: ["player 1", "player 2"],
    score: [30, 30],
    roll1: 0,
    roll2: 0,
    rollSum: 0,
    wager: 0,
    index: 0,
  };

  function setUpTurn() {
    game.html(
      `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`,
    );
    actionArea.html('<button id="roll">Roll the Dice</button>');
    // Hide the roll button until a valid wager is submitted
    $("#roll")
      .on("click", function () {
        $("#wagerform").hide();
        throwDice();
      })
      .hide();

    // Create a form element
    $("<form>")
      .attr({
        method: "post",
        id: "wagerform",
      })
      .prependTo(actionArea)
      .on("submit", function (event) {
        event.preventDefault();
        // Clear any previous errors
        $("#wagererror").remove();
        // As well as any previous wager information
        $("#wagerinfo").remove();

        let wagerSubmission = $("#wager").val();
        if (!isInt(wagerSubmission)) {
          // Wager submission was not a valid integer, display an error message
          // and reset the form submission area
          $(this).trigger("reset");
          $("<h2>")
            .text("Error! Please enter a valid integer!")
            .css("color", "red")
            .attr("id", "wagererror")
            .appendTo(this);
          return;
        }

        let parsedWager = Number(wagerSubmission);
        if (!(parsedWager >= 2 && parsedWager <= 12)) {
          // Wager submission was not within the correct range, display an
          // error message and reset the form submission area
          $(this).trigger("reset");
          $("<h2>")
            .text("Error! Please enter a number between 2 and 12!")
            .css("color", "red")
            .attr("id", "wagererror")
            .appendTo(this);
          return;
        }

        // If we got here, then we must have a good wager
        // Reset the form, display the wagered points, and display the roll button
        $(this).trigger("reset");
        gameData.wager = parsedWager;
        $("<h2>")
          .text(`You wagered ${gameData.wager} points`)
          .attr("id", "wagerinfo")
          .appendTo(this);
        $("#roll").show();
      });
    // Create a label and a text input area
    $("<label>")
      .attr("for", "wager")
      .text("Wager how many points?")
      .appendTo("#wagerform");
    $("<input>")
      .attr({
        type: "text",
        name: "wager",
        id: "wager",
        required: true,
      })
      .appendTo("#wagerform");
    // Create the button to submit the form
    $("<input>")
      .attr({ type: "submit", name: "wagersub", value: "Submit" })
      .appendTo("#wagerform");
  }

  function throwDice() {
    actionArea.empty();
    gameData.roll1 = Math.floor(Math.random() * 6) + 1;
    gameData.roll2 = Math.floor(Math.random() * 6) + 1;
    game
      .html(`<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`)
      .append(
        $("<img>").attr({
          src: `${gameData.dice[gameData.roll1 - 1]}`,
          width: "300px",
          height: "300px",
        }),
        $("<img>").attr({
          src: `${gameData.dice[gameData.roll2 - 1]}`,
          width: "300px",
          height: "300px",
        }),
      );
    gameData.rollSum = gameData.roll1 + gameData.roll2;
    // Display the actual number of your roll, since images can be difficult to read for certain people
    game.append(
      `<p>${gameData.players[gameData.index]} rolled a ${
        gameData.roll1
      } and a ${gameData.roll2}, totalling ${gameData.rollSum}.</p>`,
    );

    // If the player has snake eyes, set their score back to 30
    if (gameData.rollSum === 2) {
      game.append("<p>Oh snap! Snake eyes!</p>");
      gameData.score[gameData.index] = 30;
      gameData.index ? (gameData.index = 0) : (gameData.index = 1);
      // Show the current score
      showCurrentScore();
      // Wait 2 seconds, and set up the next turn
      setTimeout(setUpTurn, 2000);
      return;
    } else if (gameData.wager > gameData.rollSum) {
      // If the player's wager is greater than the sum of the rolls, subtract
      // the wager from the opponents points
      // NOTE: This is done to allow for the subtraction of points without
      // changing the actual index
      let opponentIndex = gameData.index;
      opponentIndex ? (opponentIndex = 0) : (opponentIndex = 1);
      gameData.score[opponentIndex] -= gameData.wager;
    } else if (gameData.wager < gameData.rollSum) {
      // If the player's wager is less than the sum of the rolls, subtract
      // the wager from the player's points
      gameData.score[gameData.index] -= gameData.wager;
    } else {
      // If the player's wager is exactly the sum of the rolls, add the wager
      // to the player's points
      gameData.score[gameData.index] += gameData.wager;
      // Switch to the next player
      gameData.index ? (gameData.index = 0) : (gameData.index = 1);
      // Display a message
      game.append(
        `<p>Great job on the lucky guess, switching to ${
          gameData.players[gameData.index]
        }</p>`,
      );
      showCurrentScore();
      // Now pass the turn
      setTimeout(setUpTurn, 2000);
      return;
    }

    showCurrentScore();
    // Display menu
    actionArea
      .html(`<p>What would ${gameData.players[gameData.index]} like to do?</p>`)
      .append(
        '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>',
      );

    // Roll again
    $("#rollagain").on("click", function () {
      setUpTurn();
    });

    // Pass the turn
    $("#pass").on("click", function () {
      gameData.index ? (gameData.index = 0) : (gameData.index = 1);
      setUpTurn();
    });

    checkLosingCondition();
  }

  function checkLosingCondition() {
    if (gameData.score[0] <= 0 || gameData.score[1] <= 0) {
      let loserIndex = gameData.score.findIndex((value) => value <= 0);
      score.html(`<h2>${loserIndex} loses!</h2>`);
      let winnerIndex = loserIndex;
      winnerIndex ? (winnerIndex = 0) : (winnerIndex = 1);
      score.append(
        `<h2>${
          gameData.players[winnerIndex]
        } wins with ${gameData.score[winnerIndex]} points!</h2>`,
      );
      actionArea.empty();
      $("#quit").text("Start a new game?");
    }
  }

  function showCurrentScore() {
    score.html(
      `<p>The score is currently <strong>${gameData.players[0]},
      score: ${gameData.score[0]}</strong> and <strong>${gameData.players[1]},
      score: ${gameData.score[1]}</strong></p>`,
    );
  }

  function isInt(value) {
    return (
      !isNaN(value) &&
      // @ts-ignore
      parseInt(Number(value)) == value &&
      !isNaN(parseInt(value, 10))
    );
  }

  startGame.on("click", function () {
    gameData.index = Math.round(Math.random());
    gameControl
      .html("<h2>The Game Has Started</h2>")
      .append('<button id="quit"> Wanna Quit?</button>');

    $("#quit").on("click", function () {
      location.reload();
    });

    setUpTurn();
  });
});
