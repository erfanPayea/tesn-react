import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './UserProfilePage.css'; // Import CSS for styling
import UserHighlight from '../components/User/UserHighlights'; // Corrected import path
import UserPost from '../components/User/UserPosts'; // Corrected import path
import UserReview from '../components/User/UserReviews'; // Corrected import path



const UserProfilePage = () => {

    const navigate = useNavigate();
    // const [error, setError] = useState('');
    const [data, setData] = useState({})
    const getData = async () => {
        // Perform login logic here with username and password
        // For example, you can send an API request or handle authentication logic
        try {
            // Send the POST request to the server
            const response = await fetch('http://127.0.0.1:8000/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                }
            });

            const result = await response.json();
            if(response.ok)
                setData(result);
            else {
                alert(result['message']);
                navigate("../../");
            }

            // alert("Success!")
        } catch (error) {
            // Handle any error that occurred during the request
            // console.error('Error:', error);
            alert("some problems happen");
        }
    };

    useEffect(() => {
        if(localStorage.getItem('token') == null) {
            alert("please login first");
            navigate("../../");
            return;
        }
        getData();
    }, []);

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <div className="cover-photo">
          {/* Add cover photo or background image */}
        </div>
        <div className="profile-details">
          <div className="profile-picture">
            {/* Display user's profile picture */}
            {/*<img src="user-profile-picture.jpg" alt="Profile" />*/}
          </div>
            <div className="user-info">
                <h1> {"username:" + data.username}</h1> {/* Display user's username */}
                <h3> {"joined at:" + data.date_joined}</h3>
                <p>{"id : " + data.id}</p> {/* Display additional information */}
                <p>{"membership : " + data.membership}</p>
            </div>
        </div>
        <Link to="/chat" className="chat-button">
        <span role="img" aria-label="paper-airplane">✈️</span>
      </Link>
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
