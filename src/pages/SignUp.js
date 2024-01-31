// SignUp.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'; // Import CSS for styling

const SignUp = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending verification code
    setShowNotification(true);
    // Navigate to verification page after sending code
    navigate('/verification');
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit">Sign Up</button>
        <p>Already have an account? <Link to="/" className="signin-link">Sign In</Link></p>
      </form>
      {showNotification && (
        <div className="notification">
          Verification code sent to your email. Please check your inbox.
        </div>
      )}
    </div>
  );
};

export default SignUp;
