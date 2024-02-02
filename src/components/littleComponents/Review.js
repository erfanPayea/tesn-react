import LikeButton from "./LikeButton";
import React from "react";

const Review = (props) => {
    return (
        <div key={props.review.id} className="review">
            <h3 className="review-attraction">{props.review.attractionName}</h3>
            <p className="review-rating">Rating: {props.review.rating}</p>
            <p className="review-text">{props.review.caption}</p>
            <LikeButton boxData={props.review} type={'REVIEW'} getData={() => props.getData()}/>
        </div>
    )
}

export default Review;