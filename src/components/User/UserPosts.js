import React, { useState } from 'react';
import './UserPosts.css'; // Import CSS for styling

const UserPosts = () => {
  // State to track liked posts
  const [likedPosts, setLikedPosts] = useState([]);

  // Sample data for user posts
  const userPosts = [
    { 
      id: 1, 
      imageUrl: 'post1.jpg', 
      caption: 'Beautiful sunset view', 
      likes: 20, 
      comments: [
        { id: 1, text: 'This sunset was absolutely stunning!' },
        { id: 2, text: 'Amazing colors in the sky!' },
        // Add more comments as needed
      ] 
    },
    { 
      id: 2, 
      imageUrl: 'post2.jpg', 
      caption: 'Exploring the city streets', 
      likes: 15, 
      comments: [
        { id: 1, text: 'The city lights are mesmerizing at night.' },
        { id: 2, text: 'Love the hustle and bustle of the streets!' },
        // Add more comments as needed
      ]
    },
    // Add more user posts as needed
  ];

  // Function to check if a post is liked
  const isPostLiked = postId => likedPosts.includes(postId);

  // Function to handle like button click
  const handleLike = postId => {
    if (isPostLiked(postId)) {
      // Unlike the post
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      // Like the post
      setLikedPosts([...likedPosts, postId]);
    }
  };

  return (
    <div className="user-posts-container">
      <h2 className="section-title">My Posts</h2>
      <div className="posts-list">
        {userPosts.map(post => (
          <div key={post.id} className="post-card">
            <img src={post.imageUrl} alt="Post" />
            <div className="caption">{post.caption}</div>
            {/* Display one of the comments */}
            <div className="comment">{post.comments[0].text}</div>
            <div className="interactions">
              <button
                className={`like-button ${isPostLiked(post.id) ? 'active' : ''}`}
                onClick={() => handleLike(post.id)}
              />
              <span className="like-count">{post.likes}</span>
              {/* Link to comments page */}
              <a href={`/comments/${post.id}`} className="show-comments-link">Show Comments</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
