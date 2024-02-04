import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import './MyProfilePage.css';
import UserPost from '../components/User/UserPosts';
import useLocalStorageState from "../components/UseLocalStorageState";
import FloatingWindow from "../components/User/FloatingWindow";
import Avatar from "../components/littleComponents/Avatar";

function UserPage() {
    const navigate = useNavigate();
    const {userId} = useParams()
    const [userData, setUserData] = useLocalStorageState("userData", {});
    const [showFloatingWindow, setShowFloatingWindow] = useState(0);


    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        if (userId === localStorage.getItem("currentId"))
            navigate('/profile');
        try {
            const response = await fetch('http://127.0.0.1:8000/user/' + userId, {
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
                    <Avatar avatarPath={userData.avatarImage} userId={userData.id}/>
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
            </div>

            {/* User highlights, posts, and reviews sections */}
            <div className="user-section">
                <h2>Posts</h2>
                <div className="user-posts">
                    <UserPost userId={userData.id} viewAll={false} isMine={false}/>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
