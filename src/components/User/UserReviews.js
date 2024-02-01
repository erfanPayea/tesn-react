import React, {useEffect} from 'react';
import './UserReviews.css';
import useLocalStorageState from "../UseLocalStorageState";
import {useNavigate} from "react-router-dom"; // Import CSS for styling

const UserReviews = () => {

    const navigate = useNavigate();
    const [userReviews, setUserReviews] = useLocalStorageState("userReviews", [{}]);

    async function getData() {
        try {
            const response = await fetch('http://127.0.0.1:8000/experience/my-reviews', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                }
            });

            const result = await response.json();
            if (response.ok)
                setUserReviews(result["reviews"]);
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
        <div className="user-reviews-container">
            <h2 className="section-title">Reviews</h2>
            <div className="reviews-list">
                {userReviews.map(review => (
                    <div key={review.id} className="review">
                        <h3 className="review-attraction">{"Attraction?"}</h3>
                        <p className="review-rating">Rating: {review.rating}</p>
                        <p className="review-text">{review.caption}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserReviews;
