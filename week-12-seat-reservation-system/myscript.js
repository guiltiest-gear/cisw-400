const reservedSeats = {
  record1: {
    seat: "b19",
    owner: {
      fname: "Joe",
      lname: "Smith",
    },
  },
  record2: {
    seat: "b20",
    owner: {
      fname: "Joe",
      lname: "Smith",
    },
  },
  record3: {
    seat: "b21",
    owner: {
      fname: "Joe",
      lname: "Smith",
    },
  },
  record4: {
    seat: "b22",
    owner: {
      fname: "Joe",
      lname: "Smith",
    },
  },
};

function makeRows(sectionLength, rowLength, placement) {
  const rows = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
  ];

  let html = "";
  let counter = 1;

  rows.forEach((row) => {
    switch (placement) {
      case "left": // add label div to left side of row
        html += `<div class="label">${row}</div>`;
        break;
      case "right": // add 12 to the counter
        counter += rowLength - sectionLength;
        break;
      default: // add three to the counter
        counter += (rowLength - sectionLength) / 2;
        break;
    }

    // loop through the seats
    for (let i = 0; i < sectionLength; i++) {
      html += `<div class="a" id="${row + counter}">${counter}</div>`;
      counter++;
    }

    switch (placement) {
      case "left": // add 12 to the counter
        counter += rowLength - sectionLength;
        break;
      case "right": // add the label to the right side of the row
        html += `<div class="label">${row}</div>`;
        break;
      default: // add three to the counter
        counter += (rowLength - sectionLength) / 2;
        break;
    }
  });
  // add the HTML to the page
  document.getElementById(placement).innerHTML = html;
}

makeRows(3, 15, "left");
makeRows(3, 15, "right");
makeRows(9, 15, "middle");

(function () {
  "use strict";
  for (const key in reservedSeats) {
    if (reservedSeats.hasOwnProperty(key)) {
      const obj = reservedSeats[key];
      document.getElementById(obj.seat).className = "r";
      document.getElementById(obj.seat).innerHTML = "R";
    }
  }
})();

(function () {
  "use strict";

  var selectedSeats = [];
  var seats = document.querySelectorAll(".a");

  seats.forEach(function (seat) {
    seat.addEventListener("click", function (event) {
      seatSelectionProcess(seat.id);
      event.preventDefault();
    });
  });

  function seatSelectionProcess(thisSeat) {
    if (!document.getElementById(thisSeat).classList.contains("r")) {
      const index = selectedSeats.indexOf(thisSeat);

      if (index > -1) {
        selectedSeats.splice(index, 1);
        document.getElementById(thisSeat).className = "a";
      } else {
        selectedSeats.push(thisSeat);
        document.getElementById(thisSeat).className = "s";
      }

      manageConfirmForm();
      console.log(selectedSeats);
    }
  }

  // Event listener for the reserve button to open the form
  document
    .getElementById("reserve")
    .addEventListener("click", function (event) {
      document.getElementById("resform").style.display = "block";
      event.preventDefault();
    });

  // Event listener to close the form if cancel is clicked
  document.getElementById("cancel").addEventListener("click", function (event) {
    document.getElementById("resform").style.display = "none";
    event.preventDefault();
  });

  function manageConfirmForm() {
    if (selectedSeats.length > 0) {
      document.getElementById("confirmres").style.display = "block";

      if (selectedSeats.length === 1) {
        document.getElementById("selectedseats").innerHTML =
          `You have selected seat ${selectedSeats[0]}`;
      } else {
        let seatString = selectedSeats
          .toString()
          .replace(/,/g, ", ")
          .replace(/,(?=[^,]*$)/, " and");

        document.getElementById("selectedseats").innerHTML =
          `You have selected seats ${seatString}`;
      }
    } else {
      document.getElementById("confirmres").style.display = "none";
      document.getElementById("selectedseats").innerHTML =
        'You need to select some seats to reserve.\
        <br><a href="#" id="error">Close</a> this dialog box and pick at least \
        one seat.';
      document.getElementById("error").addEventListener("click", function () {
        document.getElementById("resform").style.display = "none";
      });
    }
  }
  manageConfirmForm();

  document
    .getElementById("confirmres")
    .addEventListener("submit", function (event) {
      processReservation();
      event.preventDefault();
    });

  function processReservation() {
    const hardCodeRecords = Object.keys(reservedSeats).length;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    let counter = 1;
    let nextRecord = "";

    selectedSeats.forEach(function (thisSeat) {
      document.getElementById(thisSeat).className = "r";
      document.getElementById(thisSeat).innerHTML = "R";

      nextRecord = `record${hardCodeRecords + counter}`;
      reservedSeats[nextRecord] = {
        seat: thisSeat,
        owner: {
          fname: fname,
          lname: lname,
        },
      };

      counter++;
    });

    // Clean everything up
    document.getElementById("resform").style.display = "none";
    selectedSeats = [];
    manageConfirmForm();
    console.log(reservedSeats);
  }
})();
