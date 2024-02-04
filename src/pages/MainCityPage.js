// src/pages/MainCityPage.js

import React from 'react';
import { Link } from 'react-router-dom';

const cities = [
  { id: 1, name: 'City 1' },
  { id: 2, name: 'City 2' },
  // Add more cities as needed
];

const MainCityPage = () => {
  return (
    <div className="main-city-page">
      <h1>All Cities</h1>
      <ul>
        {cities.map(city => (
          <li key={city.id}>
            <Link to={`/city/${city.id}`}>{city.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainCityPage;
