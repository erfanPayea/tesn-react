import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useLocalStorageState from "../components/UseLocalStorageState";
import Comment from "../components/littleComponents/Comment";

const CommentPage = () => {
    const {postId} = useParams();
    const navigate = useNavigate();
    const [postComments, setPostComments] = useLocalStorageState('postComments', [{}])
    // State for the new comment input
    const [newComment, setNewComment] = useState('');

    async function getData() {
        try {
            const response = await fetch('http://127.0.0.1:8000/experience/all-comments/' + postId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                }
            });

            const result = await response.json();
            if (response.ok)
                setPostComments(result["comments"]);
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


    // Function to handle input change
    const handleInputChange = event => {
        setNewComment(event.target.value);
    };

    async function handleSubmitComment() {
        if (newComment.trim() !== '') {
            try {
                const response = await fetch('http://127.0.0.1:8000/experience/comment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'token ' + localStorage.getItem('token'),
                    },
                    body: JSON.stringify({
                        postId: String(postId),
                        message: newComment.trim(),
                    })
                });

                const result = await response.json();
                if (response.ok) {
                    getData();
                    setNewComment('');
                } else {
                    alert(result['message']);
                    navigate("../../");
                }

            } catch (error) {
                console.log("Error", error);
            }
        } else alert("You cannot send empty comment!")
    }

    return (
        <div className="comment-page">
            <h2>Comments</h2>
            {/* List of postComments */}
            <ul>
                {postComments.map(comment => (
                    <Comment comment={comment} getData={() => getData()}/>
                ))}
            </ul>
            {/* Input field for new comment */}
            <input
                type="text"
                placeholder="Type your comment..."
                value={newComment}
                onChange={handleInputChange}
            />
            {/* Send button to submit comment */}
            <button onClick={handleSubmitComment}>Send</button>
        </div>
    );
};

export default CommentPage;
