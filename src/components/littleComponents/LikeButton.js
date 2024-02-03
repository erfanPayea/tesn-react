import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LikeButton = (props) => {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(props.boxData.doYouLikeIt || false);
    const [likeCount, setLikeCount] = useState(props.likeCount);

    async function handleLike(destinationId) {
        try {
            // Simulate a like action by updating the local state
            // For actual implementation, you would make an API request
            setLiked(!liked);

            // Update the like count
            const updatedLikeCount = liked ? likeCount - 1 : likeCount + 1;
            setLikeCount(updatedLikeCount);

            // Simulate successful update
            props.getData();
        } catch (error) {
            console.log("Error", error);
        }
    }

    return (
        <button
            className={`like-button ${liked ? 'active' : ''}`}
            onClick={() => handleLike(props.boxData.id)}
        >
            {/* Display like count */}
            <span className="like-count">{likeCount}</span>
        </button>
    )
}

export default LikeButton;
