import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './UserProfilePage.css';
import UserHighlight from '../components/User/UserHighlights';
import UserPost from '../components/User/UserPosts';
import UserReview from '../components/User/UserReviews';
import useLocalStorageState from "../components/UseLocalStorageState";
import FloatingWindow from "../components/User/FloatingWindow";
import Avatar from "../components/littleComponents/Avatar";

function UserProfilePage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useLocalStorageState("userData", {});
    const [showFloatingWindow, setShowFloatingWindow] = useState(0);


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
                    <Avatar avatarPath={userData.avatarImage}/>
                    <div className="user-info">
                        <h1> {"username : " + userData.username}</h1>
                        <h3> {"joined at : " + userData.dateJoined}</h3>
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

            {/* User highlights, posts, and reviews sections */}
            <div className="user-section">
                <h2>Highlights</h2>
                <div className="user-highlights">
                    <UserHighlight/>
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
                    <UserReview/>
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;
