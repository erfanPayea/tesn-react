// src/components/SideMenu.js

import React, {useState} from 'react';
import {Link} from 'react-router-dom';
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
                    <li><Link to="/">Login Page</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/city/">Cities</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default SideMenu;
