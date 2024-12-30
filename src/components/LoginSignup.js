import React, { useState } from 'react';

function LoginSignup({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');  // Reset any previous error

    if (isLogin) {
      // Handle login logic
      if (userName === '' || password === '') {
        setError('Please enter both username and password');
        return;
      }
      console.log("Login clicked with", userName, password);
      // On successful login, call onLogin to update the login state
      onLogin();  // This will show the seat booking page
    } else {
      // Handle signup logic
      if (password === confirmPassword) {
        console.log("Signup clicked with", userName, password);
        // On successful signup, call onLogin to update the login state
        onLogin();
      } else {
        setError('Passwords do not match!');
      }
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between login and signup form
  };

  return (
    <div className="login-signup">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        {!isLogin && (
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        )}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      {error && <p className="error">{error}</p>}
      <span onClick={toggleForm}>
        {isLogin ? 'Don\'t have an account? Sign up' : 'Already have an account? Log in'}
      </span>
    </div>
  );
}

export default LoginSignup;









