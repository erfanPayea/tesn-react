import React from 'react';
import './UserHighlights.css'; // Import CSS for styling

const UserHighlights = () => {
  const userHighlights = [
    { id: 1, title: 'Highlight 1', description: 'Visited an amazing landmark!' },
    { id: 2, title: 'Highlight 2', description: 'Had an unforgettable experience!' },
    { id: 3, title: 'Highlight 3', description: 'Discovered a hidden gem!' },
  ];

  return (
    <div className="user-highlights-container">
      <h2 className="section-title">Highlights</h2>
      <div className="highlights-list">
        {userHighlights.map(highlight => (
          <div key={highlight.id} className="highlight">
            <h3 className="highlight-title">{highlight.title}</h3>
            <p className="highlight-description">{highlight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHighlights;
