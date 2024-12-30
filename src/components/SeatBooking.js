import React, { useState } from 'react';
import './SeatBooking.css';

// Initial train layout with 7 rows of 7 seats and 1 row with 3 seats
const initialTrainSeats = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0],
];

const SeatBooking = ({ onLogout }) => {
  const [trainSeats, setTrainSeats] = useState(initialTrainSeats);
  const [numSeatsToBook, setNumSeatsToBook] = useState(1);
  const [bookedSeats, setBookedSeats] = useState(0);
  const [bookingError, setBookingError] = useState('');

  const handleBooking = (numSeats) => {
    if (numSeats <= 0 || numSeats > 7) {
      setBookingError('You can book a minimum of 1 seat and a maximum of 7 seats at once.');
      return;
    }

    const updatedTrainSeats = trainSeats.map(row => [...row]);
    let bookedCount = 0;

    const bookInRow = (startRow, endRow, endSeat) => {
      for (let row = startRow; row < endRow && bookedCount < numSeats; row++) {
        for (let seat = 0; seat < endSeat && bookedCount < numSeats; seat++) {
          if (updatedTrainSeats[row][seat] === 0) {
            updatedTrainSeats[row][seat] = 1; // Mark seat as booked
            bookedCount++;
          }
        }
      }
    };

    for (let row = 0; row < updatedTrainSeats.length - 1; row++) {
      if (bookedCount < numSeats) {
        bookInRow(row, row + 1, 7);
      }
    }

    if (bookedCount < numSeats) {
      bookInRow(updatedTrainSeats.length - 1, updatedTrainSeats.length, 3);
    }

    if (bookedCount !== numSeats) {
      setBookingError('Not enough seats available.');
      return;
    }

    setTrainSeats(updatedTrainSeats);
    setBookedSeats(bookedSeats + numSeats);
    setBookingError('');
  };

  const handleReset = () => {
    setTrainSeats(initialTrainSeats);
    setBookedSeats(0);
    setBookingError('');
  };

  return (
    <div className="seat-booking">
      <h2>Book Your Seats</h2>
      <div className="seat-container">
        {trainSeats.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat, seatIndex) => (
              <button
                key={seatIndex}
                style={{
                  backgroundColor: seat === 1 ? 'red' : 'lightgray',
                  padding: '10px',
                  margin: '5px',
                }}
              >
                {seat === 0 ? `${rowIndex + 1}-${seatIndex + 1}` : 'Booked'}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div>
        <label>Number of seats to book: </label>
        <input
          type="number"
          value={numSeatsToBook}
          onChange={(e) => setNumSeatsToBook(Number(e.target.value))}
          min="1"
          max="7"
        />
      </div>

      <button onClick={() => handleBooking(numSeatsToBook)} style={{ marginRight: '10px' }}>
        Book
      </button>
      <button onClick={handleReset}>Reset Booking</button>

      {bookingError && <p className="error">{bookingError}</p>}

      <p>Booked Seats: {bookedSeats}</p>
      <p>Available Seats: {80 - bookedSeats}</p>

      <button onClick={onLogout} style={{ marginTop: '20px' }}>
        Logout
      </button>
    </div>
  );
};

export default SeatBooking;














