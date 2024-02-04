import React from "react";
import LikeButton from "./LikeButton";

const Comment = (props) => {
    return (
        <li key={props.comment.id}>
            <div className="comment-container">
                <div className="profile-picture-container">
                    <img src={props.comment.ownerAvatarPath} alt="Blue" className="profile-picture" />
                </div>
                <div className="comment-content">
                    <p className="comment-text">{props.comment.message}</p>
                    <LikeButton boxData={props.comment} type={'COMMENT'} likeCount={props.comment.numberOfLikes} getData={() => props.getData()} />
                </div>
            </div>
        </li>
    )
}

export default Comment;
