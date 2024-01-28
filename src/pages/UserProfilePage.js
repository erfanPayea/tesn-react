import React from 'react';
import './UserProfilePage.css'; // Import CSS for styling
import UserHighlight from '../components/User/UserHighlights'; // Corrected import path
import UserPost from '../components/User/UserPosts'; // Corrected import path
import UserReview from '../components/User/UserReviews'; // Corrected import path

const UserProfilePage = () => {
  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <div className="cover-photo">
          {/* Add cover photo or background image */}
        </div>
        <div className="profile-details">
          <div className="profile-picture">
            {/* Display user's profile picture */}
            <img src="user-profile-picture.jpg" alt="Profile" />
          </div>
          <div className="user-info">
            <h1>John Doe</h1> {/* Display user's username */}
            <p>@johndoe</p> {/* Display additional information */}
          </div>
        </div>
      </div>

      {/* User highlights section */}
      <div className="user-section">
        <h2>Highlights</h2>
        <div className="user-highlights">
          <UserHighlight />
          {/* Add more UserHighlight components as needed */}
        </div>
      </div>

      {/* User posts section */}
      <div className="user-section">
        <h2>Posts</h2>
        <div className="user-posts">
          <UserPost />
          {/* Add more UserPost components as needed */}
        </div>
      </div>

      {/* User reviews section */}
      <div className="user-section">
        <h2>Reviews</h2>
        <div className="user-reviews">
          <UserReview />
          {/* Add more UserReview components as needed */}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
