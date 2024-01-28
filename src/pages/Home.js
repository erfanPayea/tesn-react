import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Home.css'; // Import CSS for styling

const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Welcome to Travel Social Network!</h1>
        <p>Connect with fellow travelers, share your experiences, and discover new destinations.</p>
      </div>
      <div className="auth-form">
        <h2>Sign In or Sign Up</h2>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign In</button>
          {/* Change the anchor tag to a Link component */}
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Home;
