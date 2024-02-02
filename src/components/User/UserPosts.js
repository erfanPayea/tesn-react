import React, { useState } from 'react';
import './UserPosts.css'; // Import CSS for styling

const UserPosts = () => {
  // State to track liked posts
  const [likedPosts, setLikedPosts] = useState([]);
  const [newPostCaption, setNewPostCaption] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);

  // Sample data for user posts
  const [userPosts, setUserPosts] = useState([
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
  ]);

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

  // Function to handle new post submission
  const handleSubmitNewPost = e => {
    e.preventDefault();
    // Create new post object
    const newPost = {
      id: userPosts.length + 1, // Generate unique id for new post
      imageUrl: newPostImage, // Set image URL for new post
      caption: newPostCaption, // Set caption for new post
      likes: 0, // Set initial likes count for new post
      comments: [], // Initialize comments array for new post
    };
    // Add new post to userPosts array
    setUserPosts([...userPosts, newPost]);
    // Reset form fields
    setNewPostCaption('');
    setNewPostImage(null);
  };

  return (
    <div className="user-posts-container">
      <h2 className="section-title">My Posts</h2>
      {/* New post form */}
      <form onSubmit={handleSubmitNewPost}>
        <input
          type="text"
          placeholder="Enter caption"
          value={newPostCaption}
          onChange={e => setNewPostCaption(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setNewPostImage(URL.createObjectURL(e.target.files[0]))}
        />
        <button type="submit">Add Post</button>
      </form>
      {/* Posts list */}
      <div className="posts-list">
        {userPosts.map(post => (
          <div key={post.id} className="post-card">
            <img src={post.imageUrl} alt="Post" />
            <div className="caption">{post.caption}</div>
            {/* Display one of the comments */}
            <div className="comment">{post.comments[0]?.text}</div>
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
