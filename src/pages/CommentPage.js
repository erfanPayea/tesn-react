import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CommentPage = () => {
  const { postId } = useParams();

  // Sample data for comments (can be replaced with API call)
  const [comments, setComments] = useState([
    { postId: 1, id: 1, text: 'This sunset was absolutely stunning!' },
    { postId: 1, id: 2, text: 'Amazing colors in the sky!' },
    { postId: 2, id: 3, text: 'The city lights are mesmerizing at night.' },
    { postId: 2, id: 4, text: 'Love the hustle and bustle of the streets!' },
    // Add more comments as needed
  ]);

  // Filter comments for the selected post
  const postComments = comments.filter(comment => comment.postId.toString() === postId);

  // State for the new comment input
  const [newComment, setNewComment] = useState('');

  // Function to handle input change
  const handleInputChange = event => {
    setNewComment(event.target.value);
  };

  // Function to handle comment submission
  const handleSubmitComment = () => {
    if (newComment.trim() !== '') {
      // Add the new comment to the comments list
      const newCommentObj = { postId: parseInt(postId), id: comments.length + 1, text: newComment };
      setComments([...comments, newCommentObj]);
      // Clear the input field
      setNewComment('');
    }
  };

  return (
    <div className="comment-page">
      <h2>Comments</h2>
      {/* List of comments */}
      <ul>
        {postComments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
      {/* Input field for new comment */}
      <input
        type="text"
        placeholder="Type your comment..."
        value={newComment}
        onChange={handleInputChange}
      />
      {/* Send button to submit comment */}
      <button onClick={handleSubmitComment}>Send</button>
    </div>
  );
};

export default CommentPage;
