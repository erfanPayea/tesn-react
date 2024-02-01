import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useLocalStorageState from "../components/UseLocalStorageState";

const CommentPage = () => {

    const navigate = useNavigate();
    const {postId} = useParams();
    const [postComments, setComments] = useLocalStorageState("postComments", [{}]);

    // Filter postComments for the selected post
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
                setComments(result["comments"]);
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

    return (
        <div className="comment-page">
            <h2>Comments</h2>
            <ul>
                {postComments.map(comment => (
                    <li key={comment.id}>{comment.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommentPage;
