import React, {useEffect, useState} from 'react';
import './UserPosts.css';
import useLocalStorageState from "../UseLocalStorageState";
import {useNavigate} from "react-router-dom";
import Post from "../littleComponents/Post";

const UserPosts = (props) => {
    const navigate = useNavigate();
    const [newPostCaption, setNewPostCaption] = useState('');
    const [newPostImage, setNewPostImage] = useLocalStorageState('newPostImageInput', null);

    const [userPosts, setUserPosts] = useLocalStorageState("userPosts" + String(props.userId), [{}])

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
    }, [props]);

    async function follow() {
        //     todo
    }

    async function handleSubmitNewPost(e) {
        try {
            e.preventDefault();

            const formData = new FormData();
            formData.append("attractionId", -1);
            formData.append("caption", newPostCaption);
            formData.append("image", newPostImage);

            const response = await fetch('http://127.0.0.1:8000/experience/post', {
                method: 'POST',
                headers: {
                    'Authorization': `token ${localStorage.getItem("token")}`,  // Replace `${token}` with your actual token
                },
                body: formData,
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
        <div>
            {!props.isMine && <button onClick={follow}> Follow </button>}
            <div className="user-posts-container">
                {/* New post form */}
                {props.isMine && <form className="add-post-section" onSubmit={handleSubmitNewPost}>
                    <h2 className="add-post-section"> Add new post </h2>
                    <input
                        className="input-class"
                        type="text"
                        placeholder="Enter caption"
                        value={newPostCaption}
                        onChange={e => setNewPostCaption(e.target.value)}
                    />
                    <input
                        className="input-class"
                        type="file"
                        accept="image/*"
                        onChange={e => setNewPostImage(e.target.files[0])}
                    />
                    <button type="submit">Add Post</button>
                </form>}
                {/* Posts list */}
                <div className="posts-list">
                    {userPosts.map(post => (
                        <Post post={post} getData={() => getData()}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserPosts;
