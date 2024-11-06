(function () {
  "use strict";

  // Select the sections
  const left = document.getElementById("left");
  const middle = document.getElementById("middle");
  const right = document.getElementById("right");

  // Get the reservation button
  const reserveButton = document.getElementById("reserve");

  // Get the reservation form
  const reservationForm = document.getElementById("resform");

  // Get the close link
  // const closeLink = document.getElementById("error");

  // Generate an array from A to T
  const sections = [...Array(20)].map((_, i) =>
    String.fromCharCode("A".charCodeAt(0) + i),
  );

  // Make an array to hold the selected seats
  const selectedSeats = [];

  // These seats are already reserved, save them in an array for adjustment
  const reservedSeats = ["b19", "b20", "b21", "b22"];

  // Get the node that holds the selected seats
  const selectedSeatsNode = document.getElementById("selectedseats");

  /**
   * Creates a div with the class of label
   * @function
   * @param {string} label
   * @returns {HTMLDivElement} Seat label
   */
  function createSectionLabel(label) {
    const section = document.createElement("div");
    section.className = "label";
    section.innerText = label;
    return section;
  }

  /**
   * Creates a div with an id that corresponds to the seat's section and number
   * @function
   * @param {string} section
   * @param {number} number
   * @returns {HTMLDivElement} Seat
   */
  function createSeat(section, number) {
    const seat = document.createElement("div");
    seat.id = section.toLowerCase() + number.toString();
    // Special case for the seats in the reservedSeats array
    // Update class and text to indicate reservation, and return early
    if (reservedSeats.indexOf(seat.id) !== -1) {
      seat.className = "r";
      seat.innerText = "R";
      return seat;
    }
    seat.className = "a"; // Assign class for hover effect
    seat.innerText = number.toString();
    seat.addEventListener("click", function () {
      // Toggle the class when I click on the seat
      seat.className === "a" ? (seat.className = "s") : (seat.className = "a");
      // Push the result to selectedSeats, if it does not already exist in the array
      // Otherwise, remove the element from the array
      if (selectedSeats.indexOf(seat.id) === -1) {
        selectedSeats.push(seat.id);
      } else {
        const seatIdIndex = selectedSeats.indexOf(seat.id);
        selectedSeats.splice(seatIdIndex, 1);
      }
      // Update the selected seats as we click things
      if (selectedSeats.length === 0) {
        // TODO: Re-add the error message and make the link clickable
      } else if (selectedSeats.length === 1) {
        selectedSeatsNode.innerHTML = `You have selected seat ${selectedSeats[0]}`;
      } else if (selectedSeats.length === 2) {
        selectedSeatsNode.innerHTML = `You have selected seats ${selectedSeats[0]} and ${selectedSeats[1]}`;
      } else {
        // With 3 or more items, we have to do additional formatting
        const lastSeat = selectedSeats.pop();
        // Perform some join tomfoolery to format things correctly
        selectedSeatsNode.innerHTML = `You have selected seats ${selectedSeats.join(", ")} and ${lastSeat}`;
        // Push the value back to the array, so it's correct again
        selectedSeats.push(lastSeat);
      }
    });
    return seat;
  }

  // Loop over the left, middle, and right, generating and appending nodes as we go
  for (let i = 0; i < sections.length; i++) {
    // Append to the left
    left.appendChild(createSectionLabel(sections[i]));

    // Create and append nodes to the appropriate locations
    for (let j = 0; j < 15; j++) {
      // Perform some tomfoolery to determine the seat number
      let seatNumber = j + (15 * i + 1);
      if (j >= 0 && j <= 2) {
        left.appendChild(createSeat(sections[i], seatNumber));
      } else if (j >= 3 && j <= 11) {
        middle.appendChild(createSeat(sections[i], seatNumber));
      } else {
        right.appendChild(createSeat(sections[i], seatNumber));
      }
    }

    // Append to the right
    right.appendChild(createSectionLabel(sections[i]));
  }

  // Add a click handler for the reserve seats button
  reserveButton.addEventListener("click", function () {
    // Check if there are any selected seats first
    if (selectedSeats.length === 0) {
      // Show the reservation form error
      reservationForm.style.display = "block";
      return;
    }
  });

  // Add a click handler for the close link to hide the error
  /* closeLink.addEventListener("click", function () {
    reservationForm.style.display = "none";
  }); */
})();
