// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserProfilePage from './pages/UserProfilePage';
import CityPage from './pages/CityPage';
import AttractionPage from './pages/AttractionPage';
import SideMenu from './components/SideMenu';
import SignUp from './pages/SignUp';


const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <SideMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user/:userId" element={<UserProfilePage />} />
          <Route path="/city/:cityId" element={<CityPage />} />
          <Route path="/attraction/:attractionId" element={<AttractionPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
