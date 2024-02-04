import React, {useEffect, useState} from 'react';
import './UserPosts.css';
import useLocalStorageState from "../UseLocalStorageState";
import {useNavigate} from "react-router-dom";
import Post from "../littleComponents/Post";

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
                    'image': newPostImage,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setNewPostCaption('');
                setNewPostImage(null);
                getData();
            } else
                alert(result['message']);

        } catch (error) {
            console.log("Error", error);
        }
    }

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
                    onChange={e => setNewPostImage(e.target.files[0])}
                />
                <button type="submit">Add Post</button>
            </form>
            {/* Posts list */}
            <div className="posts-list">
                {userPosts.map(post => (
                    <Post post={post} getData={() => getData()}/>
                ))}
            </div>
        </div>
    );
};

export default UserPosts;
