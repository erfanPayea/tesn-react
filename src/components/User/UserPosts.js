import React, {useEffect, useState} from 'react';
import './UserPosts.css';
import {useNavigate} from "react-router-dom"; // Import CSS for styling
import useLocalStorageState from "../UseLocalStorageState";

function UserPosts(props) {
    // State to track liked posts
    const navigate = useNavigate();
    const [userPosts, setUserPosts] = useLocalStorageState("userPosts", [{}]);

    async function getData() {
        try {
            const response = await fetch('http://127.0.0.1:8000/experience/user-posts/' + props.userId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                }
            });

            const result = await response.json();
            if (response.ok)
                setUserPosts(result["posts"]);
            else {
                alert(result['message']);
                navigate("../../");
            }

        } catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    // Function to check if a post is liked

    // Function to handle like button click
    const likePost = post => {
        fetch('http://127.0.0.1:8000/experience/like', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                destinationType: "POST",
                destinationId: String(post.id),
            })
        }).then(r => {
            if (r.ok) {
                post.doYouLikeIt = !post.doYouLikeIt;
            } else
                alert("WTF");
        });
    };

    return (
        <div className="user-posts-container">
            <h2 className="section-title">My Posts</h2>
            <div className="posts-list">
                {userPosts.map(post => (
                    <div key={post.id} className="post-card">
                        <img src={post.filePath} alt="Post"/>
                        <div className="caption">{post.caption}</div>
                        {/* Display one of the comments */}
                        <div className="comment">{"WTF!"}</div>
                        <div className="interactions">
                            <button
                                className={`like-button ${post.doYouLikeIt ? 'active' : ''}`}
                                onClick={() => likePost(post)}
                            />
                            <span className="like-count">{post.numberOfLikes}</span>
                            {/* Link to comments page */}
                            <a href={`/comments/${post.id}`} className="show-comments-link">Show Comments</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserPosts;
