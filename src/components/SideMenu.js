// src/components/SideMenu.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
      <button className={`toggle-btn ${menuOpen ? 'close' : 'open'}`} onClick={toggleMenu}></button>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/user/123">User Profile</Link></li>
          <li><Link to="/city/abc">City Page</Link></li>
          <li><Link to="/attraction/xyz">Attraction Page</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
