import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserProfilePage.css';
import UserHighlight from '../components/User/UserHighlights';
import UserPost from '../components/User/UserPosts';
import UserReview from '../components/User/UserReviews';
import useLocalStorageState from "../components/UseLocalStorageState";
import FloatingWindow from "../components/User/FloatingWindow";

function UserProfilePage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useLocalStorageState("userData", {});
    const [showFloatingWindow, setShowFloatingWindow] = useState(0);
    const [reviewText, setReviewText] = useState('');
    

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            alert("Please login first");
            navigate("../../");
            return;
        }
        getData();
    }, []);

    async function getData() {
        try {
            const response = await fetch('http://127.0.0.1:8000/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                }
            });

            const result = await response.json();
            if (response.ok)
                setUserData(result);
            else {
                alert(result['message']);
                navigate("../../");
            }
        } catch (error) {
            alert("Some problems happened");
        }
    }

    const handleReviewSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/add-review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    userId: userData.id,
                    reviewText: reviewText
                })
            });
    
            console.log('Response:', response);
    
            const result = await response.json();
            console.log('Result:', result);
    
            if (response.ok) {
                // Review added successfully, do something if needed
                alert("Review added successfully!");
                // Clear the review text input
                setReviewText('');
            } else {
                alert(result['message']);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Some problems happened");
        }
    };

    const showWindow = (type) => {
        setShowFloatingWindow(type);
    };

    const handleWindowClose = () => {
        setShowFloatingWindow(0);
    };

    return (
        <div className="user-profile-container">
            <div className="profile-header">
                <div className="cover-photo">
                    {/* Add cover photo or background image */}
                </div>
                <div className="profile-details">
                    <div className="profile-picture">
                        {/* Display user's profile picture */}
                    </div>
                    <div className="user-info">
                        <h1> {"username:" + userData.username}</h1>
                        <h3> {"joined at:" + userData.date_joined}</h3>
                        <p>{"id : " + userData.id}</p>
                        <p>{"membership : " + userData.membership}</p>
                    </div>
                    <div className="follow">
                        <button onClick={() => showWindow(1)}>followers</button>
                        <button onClick={() => showWindow(2)}>following</button>
                        {showFloatingWindow > 0 && (
                            <FloatingWindow onClose={handleWindowClose} type={showFloatingWindow}/>
                        )}
                    </div>
                </div>
                <Link to="/chat" className="chat-button">
                    <span role="img" aria-label="paper-airplane">✈️</span>
                </Link>
            </div>

            <div className="user-section">
                <h2>Add Review</h2>
                <div className="add-review-form">
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Enter your review here..."
                        rows="4"
                    />
                    <button onClick={handleReviewSubmit}>Submit Review</button>
                </div>
            </div>

            {/* User highlights, posts, and reviews sections */}
            <div className="user-section">
                <h2>Highlights</h2>
                <div className="user-highlights">
                    <UserHighlight />
                </div>
            </div>
            <div className="user-section">
                <h2>Posts</h2>
                <div className="user-posts">
                    <UserPost userId={userData.id} viewAll={true}/>
                </div>
            </div>
            <div className="user-section">
                <h2>Reviews</h2>
                <div className="user-reviews">
                    <UserReview />
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;
