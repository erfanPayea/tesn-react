import React from 'react';
import AttractionCard from '../components/littleComponents/AttractionCard'; // Import your AttractionCard component

// Define the Cities component
const Cities = () => {
  // Sample data for attractions (replace with actual data)
  const attractions = [
    { 
      id: 1, 
      name: 'Attraction 1', 
      imageUrl: '/attraction1.jpg', 
      description: 'Description of Attraction 1', 
      reviews: [
        { id: 1, caption: 'Review 1 for Attraction 1', rating: 4 },
        { id: 2, caption: 'Review 2 for Attraction 1', rating: 5 },
      ]
    },
    { 
      id: 2, 
      name: 'Attraction 2', 
      imageUrl: '/attraction2.jpg', 
      description: 'Description of Attraction 2', 
      reviews: [
        { id: 3, caption: 'Review 1 for Attraction 2', rating: 3 },
        { id: 4, caption: 'Review 2 for Attraction 2', rating: 4 },
      ]
    },
    // Add more attractions as needed
  ];

  return (
    <div className="city">
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
