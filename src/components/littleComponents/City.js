import React from 'react';
import { Link } from 'react-router-dom';

const City = ({ city }) => {
  return (
    <div className="city">
      <h2>{city.name}</h2>
      <div className="attraction-list">
        {city.attractions.map(attraction => (
          <Link key={attraction.id} to={`/city/${city.id}/attraction/${attraction.id}`}>
            {attraction.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default City;
