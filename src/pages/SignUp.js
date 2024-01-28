import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css'; // Import CSS for styling

const SignUp = () => {
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit">Sign Up</button>
        <p>Already have an account? <Link to="/" className="signin-link">Sign In</Link></p>
      </form>
    </div>
  );
};

export default SignUp;
