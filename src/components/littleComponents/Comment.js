import React from "react";
import LikeButton from "./LikeButton";
import Avatar from "./Avatar";

const Comment = (props) => {
    return (
        <li key={props.comment.id}>
            <div className="comment-container">
                <Avatar avatarPath={props.comment.ownerAvatarPath}/>
                <div className="comment-content">
                    <p className="comment-text">{props.comment.message}</p>
                    <LikeButton boxData={props.comment} type={'COMMENT'} likeCount={props.comment.numberOfLikes} getData={() => props.getData()} />
                </div>
            </div>
        </li>
    )
}

export default Comment;
