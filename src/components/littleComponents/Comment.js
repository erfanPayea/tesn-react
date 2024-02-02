import {useNavigate} from "react-router-dom";
import React from "react";
import LikeButton from "./LikeButton";

const Comment = (props) => {
    return (
        <li key={props.comment.id}>
            <LikeButton boxData={props.comment} type={'COMMENT'} getData={() => props.getData()}/>
            >{props.comment.message}</li>
    )
}

export default Comment;