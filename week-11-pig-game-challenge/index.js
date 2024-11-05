(function () {
  "use strict";
  const startGame = document.getElementById("startgame");
  const gameControl = document.getElementById("gamecontrol");
  const game = document.getElementById("game");
  const score = document.getElementById("score");
  const actionArea = document.getElementById("actions");

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
    score: [0, 0],
    roll1: 0,
    roll2: 0,
    rollSum: 0,
    gainedPoints: 0,
    index: 0,
    gameEnd: 29,
  };

  function setUpTurn() {
    game.innerHTML = `<p>Roll the dice for the ${
      gameData.players[gameData.index]
    }</p>`;
    actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
    document.getElementById("roll").addEventListener("click", function () {
      throwDice();
    });
  }

  function throwDice() {
    actionArea.innerHTML = "";
    gameData.roll1 = Math.floor(Math.random() * 6) + 1;
    gameData.roll2 = Math.floor(Math.random() * 6) + 1;
    game.innerHTML = `<p>Roll the dice for the ${
      gameData.players[gameData.index]
    }</p>`;
    game.innerHTML += `<img src="${gameData.dice[gameData.roll1 - 1]}" width="300px" height="300px">
                        <img src="${gameData.dice[gameData.roll2 - 1]}" width="300px" height="300px">`;
    gameData.rollSum = gameData.roll1 + gameData.roll2;
    // Display the actual number of your roll, since images can be difficult to read for certain people
    game.innerHTML += `<p>${gameData.players[gameData.index]} rolled a ${
      gameData.roll1
    } and a ${gameData.roll2}, totalling ${gameData.rollSum}.</p>`;

    // Keep track of how many points the current player has for their turn
    gameData.gainedPoints += gameData.rollSum;

    if (gameData.rollSum === 2) {
      game.innerHTML += "<p>Oh snap! Snake eyes!</p>";
      // Reset gainedPoints
      gameData.gainedPoints = 0;
      gameData.score[gameData.index] = 0;
      gameData.index ? (gameData.index = 0) : (gameData.index = 1);
      showCurrentScore();
      setTimeout(setUpTurn, 2000);
    } else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
      // NOTE: We are taking away the points you gained during this turn
      // gainedPoints is added to at the start however
      // Without this, the amount of points taken away will be incorrect
      gameData.gainedPoints -= gameData.rollSum;
      // If the player has a score of 0 and they roll a 1, then reset the gainedPoints
      // You can't take away points that aren't there after all
      if (gameData.score[gameData.index] === 0) {
        gameData.gainedPoints = 0;
      }
      // *Now* we subtract from the player's score
      gameData.score[gameData.index] -= gameData.gainedPoints;
      // Reset gainedPoints unconditionally
      gameData.gainedPoints = 0;
      gameData.index ? (gameData.index = 0) : (gameData.index = 1);
      game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${
        gameData.players[gameData.index]
      }</p>`;
      setTimeout(setUpTurn, 2000);
    } else {
      gameData.score[gameData.index] += gameData.rollSum;
      actionArea.innerHTML = `<p>What would ${gameData.players[gameData.index]} like to do?</p>`;
      actionArea.innerHTML +=
        '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';

      document
        .getElementById("rollagain")
        .addEventListener("click", function () {
          setUpTurn();
        });

      document.getElementById("pass").addEventListener("click", function () {
        // Turn was passed, reset gainedPoints
        gameData.gainedPoints = 0;
        gameData.index ? (gameData.index = 0) : (gameData.index = 1);
        setUpTurn();
      });

      checkWinningCondition();
    }
  }

  function checkWinningCondition() {
    if (gameData.score[gameData.index] > gameData.gameEnd) {
      score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${
        gameData.score[gameData.index]
      } points!</h2>`;

      actionArea.innerHTML = "";
      document.getElementById("quit").innerHTML = "Start a new game?";
    } else {
      showCurrentScore();
    }
  }

  function showCurrentScore() {
    score.innerHTML = `<p>The score is currently <strong>
      ${gameData.players[0]}, score: ${gameData.score[0]}</strong> and <strong>${gameData.players[1]},
        score: ${gameData.score[1]}</strong></p>`;
  }

  startGame.addEventListener("click", function () {
    gameData.index = Math.round(Math.random());
    console.log(gameData.index);
    gameControl.innerHTML = "<h2>The Game Has Started</h2>";
    gameControl.innerHTML += '<button id="quit">Wanna Quit?</button>';

    document.getElementById("quit").addEventListener("click", function () {
      location.reload();
    });

    setUpTurn();
  });
})();
