import React, {useEffect, useState} from 'react';
import './AttractionPage.css';
import useLocalStorageState from "../components/UseLocalStorageState";
import {useNavigate, useParams} from "react-router-dom";
import Review from "../components/littleComponents/Review";

const AttractionPage = () => {
    const navigate = useNavigate();
    const {attractionId} = useParams();
    const {viewAll} = useParams();
    const [attractionReviews, setAttractionReviews] = useLocalStorageState("attractionReviews", [{}]);

    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(3);

    async function getData() {
        try {
            let endingUrl = 'attraction-reviews/';
            if (viewAll === 't')
                endingUrl = 'all-' + endingUrl;
            const response = await fetch('http://127.0.0.1:8000/experience/' + endingUrl + attractionId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                }
            });

            const result = await response.json();
            if (response.ok)
                setAttractionReviews(result["reviews"]);
            else {
                alert(result['message']);
                navigate("../../");
            }

        } catch (error) {
            console.log("Error", error);
        }
    }

    const handleReviewSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/experience/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    caption: reviewText,
                    attractionId: attractionId,
                    rating: rating
                })
            });

            console.log('Response:', response);

            const result = await response.json();
            console.log('Result:', result);

            if (response.ok) {
                getData();
                setReviewText('');
            } else {
                alert(result['message']);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Some problems happened");
        }
    };

    useEffect(() => {
        getData();
    }, [])

      //   const sampleReviews = [
      //   { id: 1, caption: 'Sample Review 1', rating: 4 },
      //   { id: 2, caption: 'Sample Review 2', rating: 5 },
      //   { id: 3, caption: 'Sample Review 3', rating: 3 },
      //   // Add more sample reviews as needed
      // ];
      //
      // // Function to handle review submission
      // const handleReviewSubmit = () => {
      //   // Add logic for handling review submission
      //   // This function will be updated based on the actual backend implementation
      // };
      //
      // useEffect(() => {
      //   // Fetch data from backend or set sample data
      //   setAttractionReviews(sampleReviews);
      // }, []);

    const handleStarClick = starIndex => {
        // Increment rating by 1 to match the star index
        const newRating = starIndex + 1;
        setRating(newRating);
    };

    return (
        <div className="attraction-page">
            <div className="grid-container">
                {attractionReviews.map(review => (
                    <Review key={review.id} review={review} getData={() => {
                    }}/>
                ))}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                {viewAll === 'f' && (
                    <a href={`/attraction/${attractionId}/t`} className="show-comments-link">
                        View more
                    </a>
                )}
                {viewAll === 't' && (
                    <div className="user-section">
                        <h2>Add Review</h2>
                        <div className="add-review-form">
              <textarea
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  placeholder="Enter your review here..."
                  rows="4"
              />
                            <div className="rating">
                                {[...Array(5)].map((_, index) => (
                                    <span
                                        key={index}
                                        className={index < rating ? 'star filled' : 'star'}
                                        onClick={() => handleStarClick(index)}
                                    >
                    &#9734; {/* Empty star */}
                  </span>
                                ))}
                            </div>
                            <button onClick={handleReviewSubmit}>Submit Review</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttractionPage;