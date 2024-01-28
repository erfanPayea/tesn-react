import React from 'react';
import './UserPosts.css'; // Import CSS for styling

const UserPosts = () => {
  const userPosts = [
    { id: 1, title: 'Post 1', content: 'This is the content of post 1.' },
    { id: 2, title: 'Post 2', content: 'This is the content of post 2.' },
    { id: 3, title: 'Post 3', content: 'This is the content of post 3.' },
  ];

  return (
    <div className="user-posts-container">
      <h2 className="section-title">Posts</h2>
      <div className="posts-list">
        {userPosts.map(post => (
          <div key={post.id} className="post">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-content">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
