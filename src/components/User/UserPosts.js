import React, {useEffect, useState} from 'react';
import './UserPosts.css';
import {useNavigate} from "react-router-dom"; // Import CSS for styling

const UserPosts = (props) => {
    // State to track liked posts
    const navigate = useNavigate();
    const [likedPosts, setLikedPosts] = useState([]);
    const [userPosts, setUserPosts] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/experience/user-posts/' + 2, {
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
        for (const post in userPosts) {
            if (post["doYouLikeIt"] === "True")
                handleLike(post["id"]);
        }
    }, []);

    // Function to check if a post is liked
    const isPostLiked = postId => likedPosts.includes(postId);

    // Function to handle like button click
    const handleLike = postId => {
        if (isPostLiked(postId)) {
            // Unlike the post
            setLikedPosts(likedPosts.filter(id => id !== postId));
        } else {
            // Like the post
            setLikedPosts([...likedPosts, postId]);
        }
    };

    return (
        <div className="user-posts-container">
            <h2 className="section-title">My Posts</h2>
            <div className="posts-list">
                {userPosts.map(post => (
                    <div key={post["id"]} className="post-card">
                        <img src={post["filePath"]} alt="Post"/>
                        <div className="caption">{post["caption"]}</div>
                        {/* Display one of the comments */}
                        <div className="comment">{"WTF!"}</div>
                        <div className="interactions">
                            <button
                                className={`like-button ${isPostLiked(post["id"]) ? 'active' : ''}`}
                                onClick={() => handleLike(post["id"])}
                            />
                            <span className="like-count">{post["numberOfLikes"]}</span>
                            {/* Link to comments page */}
                            <a href={`/comments/${post["id"]}`} className="show-comments-link">Show Comments</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPosts;
