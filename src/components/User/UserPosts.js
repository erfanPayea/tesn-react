import React, {useEffect, useState} from 'react';
import './UserPosts.css';
import useLocalStorageState from "../UseLocalStorageState";
import {useNavigate} from "react-router-dom"; // Import CSS for styling

const UserPosts = (props) => {

    const navigate = useNavigate();
    const [newPostCaption, setNewPostCaption] = useState('');
    const [newPostImage, setNewPostImage] = useState(null);

    const [userPosts, setUserPosts] = useLocalStorageState("userPosts", [{}])

    async function getData() {
        try {
            let endingUrl = 'user-posts/';
            if (props.viewAll)
                endingUrl = 'all-user-posts/';

            const response = await fetch('http://127.0.0.1:8000/experience/' + endingUrl + props.userId, {
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

    async function handleLike(postId) {
        try {
            const response = await fetch('http://127.0.0.1:8000/experience/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    destinationType: 'POST',
                    destinationId: String(postId),
                })
            });

            const result = await response.json();
            if (response.ok)
                getData();
            else {
                alert(result['message']);
                navigate("../../");
            }

        } catch (error) {
            console.log("Error", error);
        }
    }

    async function handleSubmitNewPost(e) {
        try {
            e.preventDefault();

            const response = await fetch('http://127.0.0.1:8000/experience/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    'attractionId': String(-1),
                    'caption': newPostCaption,
                    'filePath': newPostImage,
                })
            });

            const result = await response.json();
            if (response.ok) {
                setNewPostCaption('');
                setNewPostImage(null);
                getData();
            } else {
                alert(result['message']);
                navigate("../../");
            }

        } catch (error) {
            console.log("Error", error);
        }
    };

    return (
        <div className="user-posts-container">
            <h2 className="section-title">My Posts</h2>
            {/* New post form */}
            <form onSubmit={handleSubmitNewPost}>
                <input
                    type="text"
                    placeholder="Enter caption"
                    value={newPostCaption}
                    onChange={e => setNewPostCaption(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => setNewPostImage(URL.createObjectURL(e.target.files[0]))}
                />
                <button type="submit">Add Post</button>
            </form>
            {/* Posts list */}
            <div className="posts-list">
                {userPosts.map(post => (
                    <div key={post.id} className="post-card">
                        <img src={post.filePath} alt="Post"/>
                        <div className="caption">{post.caption}</div>
                        {/* Display one of the comments */}
                        <div className="comment">{post.bestComment.message}</div>
                        <div className="interactions">
                            <button
                                className={`like-button ${post.doYouLikeIt ? 'active' : ''}`}
                                onClick={() => handleLike(post.id)}
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
};

export default UserPosts;
