import React from 'react';
import { Link } from 'react-router-dom';

// Define the AttractionCard component
const AttractionCard = ({ attraction }) => {
  return (
    <div className="attraction-card">
      <Link to={`/attraction/${attraction.id}`}>
        <img src={attraction.imageUrl} alt={attraction.name} />
        <h3>{attraction.name}</h3>
        <p>{attraction.description}</p>
      </Link>
    </div>
  );
};

// Define the Cities component
const Cities = () => {
  // Sample data for attractions (replace with actual data)
  const attractions = [
    { id: 1, name: 'Attraction 1', imageUrl: '/attraction1.jpg', description: 'Description of Attraction 1' },
    { id: 2, name: 'Attraction 2', imageUrl: '/attraction2.jpg', description: 'Description of Attraction 2' },
    // Add more attractions as needed
  ];

  return (
    <div className="cities">
      <h1>Cities</h1>
      <div className="attraction-grid">
        {attractions.map(attraction => (
          <AttractionCard key={attraction.id} attraction={attraction} />
        ))}
      </div>
    </div>
  );
};

export default Cities;
