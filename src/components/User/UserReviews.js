import React from 'react';
import './UserReviews.css'; // Import CSS for styling

const UserReviews = () => {
  const userReviews = [
    { id: 1, attraction: 'Attraction 1', rating: 4, review: 'This attraction was amazing!' },
    { id: 2, attraction: 'Attraction 2', rating: 5, review: 'Absolutely loved it!' },
    { id: 3, attraction: 'Attraction 3', rating: 3, review: 'It was okay, could be better.' },
  ];

  return (
    <div className="user-reviews-container">
      <h2 className="section-title">Reviews</h2>
      <div className="reviews-list">
        {userReviews.map(review => (
          <div key={review.id} className="review">
            <h3 className="review-attraction">{review.attraction}</h3>
            <p className="review-rating">Rating: {review.rating}</p>
            <p className="review-text">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
