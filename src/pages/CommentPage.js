import React from 'react';
import { useParams } from 'react-router-dom';

const CommentPage = () => {
  const { postId } = useParams();

  // Mock comments data for demonstration
  const comments = [
    { id: 1, text: 'This sunset was absolutely stunning!' },
    { id: 2, text: 'Amazing colors in the sky!' },
    // Add more comments as needed
  ];

  // Filter comments for the selected post
  const postComments = comments.filter(comment => comment.postId === postId);

  return (
    <div className="comment-page">
      <h2>Comments</h2>
      <ul>
        {postComments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentPage;
