import React, { useState } from 'react';
import LoginSignup from './components/LoginSignup';
import SeatBooking from './components/SeatBooking';
import './index.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div className="App">
            {isLoggedIn ? (
                <SeatBooking onLogout={handleLogout} />
            ) : (
                <LoginSignup onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;










