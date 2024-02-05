import React from "react";
import LikeButton from "./LikeButton";
import Avatar from "./Avatar";

const Review = (props) => {
    return (
        <div key={props.review.id} className="review">
            <Avatar avatarPath={props.review.ownerAvatarPath} userId={props.review.ownerId}/>
            <h3 className="review-attraction">{props.review.attractionName}</h3>
            <p className="review-rating">Rating: {props.review.rating}</p>
            <p className="review-text">{props.review.caption}</p>
            <LikeButton boxData={props.review} type={'REVIEW'} likeCount={props.review.numberOfLikes} getData={() => props.getData()} />
        </div>
    )
}

export default Review;
