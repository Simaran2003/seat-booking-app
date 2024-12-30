const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

let users = [];
let seats = Array(80).fill(false); // Initially, all seats are available

// Signup route
app.post('/signup', (req, res) => {
    const { username, password, gender } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ username, password, gender });
    req.session.userId = username;
    res.status(201).json({ message: 'User created' });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.session.userId = username;
    res.status(200).json({ message: 'Login successful' });
});

// Book seats route
app.post('/book', (req, res) => {
    const { numSeats } = req.body;
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Not logged in' });
    }

    const updatedSeats = bookSeats(seats, numSeats);
    if (!updatedSeats) {
        return res.status(400).json({ message: 'Not enough seats available' });
    }

    seats = updatedSeats;
    res.status(200).json({ seats, bookedSeats: seats.filter(seat => seat).length });
});

// Reset seats route
app.post('/reset', (req, res) => {
    seats = Array(80).fill(false);
    res.status(200).json({ message: 'Booking reset' });
});

// Seat booking logic
const bookSeats = (seats, numSeats) => {
    const newSeats = [...seats];
    let bookedCount = 0;

    // Function to book seats in a row
    const bookInRow = (start, end) => {
        for (let i = start; i < end && bookedCount < numSeats; i++) {
            if (!newSeats[i]) {
                newSeats[i] = true;
                bookedCount++;
            }
        }
    };

    // Try to book seats in one row
    for (let i = 0; i < newSeats.length - 3; i += 7) {
        if (bookedCount < numSeats) {
            bookInRow(i, i + 7);
        }
    }

    // Check last row with 3 seats
    if (bookedCount < numSeats && newSeats.length > 77) {
        bookInRow(77, 80);
    }

    // If not enough seats were booked in one row, book nearby seats
    if (bookedCount < numSeats) {
        for (let i = 0; i < newSeats.length && bookedCount < numSeats; i++) {
            if (!newSeats[i]) {
                newSeats[i] = true;
                bookedCount++;
            }
        }
    }

    return bookedCount === numSeats ? newSeats : null;
};

app.listen(3001, () => console.log('Server running on port 3001'));
