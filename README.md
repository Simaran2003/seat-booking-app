
Seat Booking App-----------------------------------

This is a React-based seat booking application with user authentication (Login/Signup). Users can log in, book seats, and manage their bookings in a train coach.

Features------------------------------------------

User Authentication: Login and Signup functionality using local storage.
Seat Booking:
80 seats arranged in rows (7 seats per row, with the last row having 3 seats).
Users can book up to 7 seats at a time.
Seats are prioritized to be booked in a single row when possible.
Prevents double booking by other users.
Seat Management:
Users can cancel bookings.
Bookings reset when the application is restarted.

Folder Structure------------------------------------------

seat-booking-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── LoginSignup.js
│   │   ├── LoginSignup.css
│   │   ├── SeatBooking.js
│   │   ├── SeatBooking.css
│   ├── App.js
│   ├── index.js
│   ├── index.css
├── package.json
├── package-lock.json
├── node_modules/
├── .gitignore
|__ server.js
└── README.md

Installation
Clone the repository:
git clone https://github.com/your-username/seat-booking-app.git
cd seat-booking-app

Install dependencies:
npm install
Start the development server:

npm start
Open the app in your browser:

Login or Signup:

Create a new account or log in with an existing one.
Book Seats:

Select the number of seats you want to book.
Choose seats from the grid.
Click the "Book Seats" button to confirm the booking.
Cancel Booking:

Deselect the selected seats and rebook if necessary.
Logout:

Refresh the app to reset the session.
Technologies Used
Frontend:
React.js
CSS for styling
Storage:
Local Storage for managing user sessions and seat bookings.

Future Enhancements------------------------------------------------
Add a backend for persistent data storage.
Enhance UI/UX with better styling and animations.
Add password hashing for better security.
Implement seat booking history per user.