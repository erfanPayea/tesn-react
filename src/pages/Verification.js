// Verification.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Verification = () => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the verification code
    // Here you would typically make a request to your backend to verify the code
    // If the code is valid, proceed with sign-up completion
    // If the code is invalid, display an error message
  };

  return (
    <div className="verification-container">
      <h2>Verification</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <button type="submit">Verify</button>
      </form>
      <p>Did not receive the code? <Link to="/signup">Resend</Link></p>
    </div>
  );
};

export default Verification;
