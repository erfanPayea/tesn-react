import React from "react";
import LikeButton from "./LikeButton";

const Comment = (props) => {
    return (
        <li key={props.comment.id}>
            <div className="comment-container">
                <div className="profile-picture-container">
                    <img src={props.comment.user.profilePictureUrl} alt="Profile" className="profile-picture" />
                </div>
                <div className="comment-content">
                    <LikeButton boxData={props.comment} type={'COMMENT'} likeCount={props.comment.numberOfLikes} getData={() => props.getData()} />
                    <p className="comment-text">{props.comment.message}</p>
                </div>
            </div>
        </li>
    )
}

export default Comment;
