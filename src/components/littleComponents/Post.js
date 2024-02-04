import React from "react";
import LikeButton from "./LikeButton";
import Comment from "./Comment";

const Post = (props) => {
    return (
        <div key={props.post.id} className="post-card">
            <h3 className="highlight-title">{props.post.attractionName}</h3>
            <img src={props.post.filePath} alt="Post" width={600}/>
            <div className="caption">{props.post.caption}</div>
            {/* Display one of the comments */}
            <LikeButton boxData={props.post} type={'POST'} likeCount={props.post.numberOfLikes}
                        getData={() => props.getData()}/>
            <div className="interactions">
                <Comment comment={props.post.bestComment} getData={() => props.getData()}/>
                {/* Link to comments page */}
                <a href={`/comments/${props.post.id}`} className="show-comments-link">View more comments</a>
            </div>
        </div>
    )
}

export default Post;
