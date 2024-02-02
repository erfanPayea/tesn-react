import React from "react";
import {useNavigate} from "react-router-dom";

const LikeButton = (props) => {
    const navigate = useNavigate();
    async function handleLike(destinationId) {
        try {
            const response = await fetch('http://127.0.0.1:8000/experience/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    destinationType: props.type,
                    destinationId: String(destinationId),
                })
            });

            const result = await response.json();
            if (response.ok) {
                props.getData();
            } else {
                alert(result['message']);
                navigate("../../");
            }

        } catch (error) {
            console.log("Error", error);
        }
    }

    return (
        <button
                className={`like-button ${props.boxData.doYouLikeIt ? 'active' : ''}`}
                onClick={() => handleLike(props.boxData.id)}
            />
    )
}

export default LikeButton;