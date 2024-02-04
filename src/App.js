// src/App.js

import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import MyProfilePage from './pages/MyProfilePage';
import CityPage from './pages/CityPage';
import AttractionPage from './pages/AttractionPage';
import SideMenu from './components/SideMenu';
import SignUp from './pages/SignUp';
import Verification from './pages/Verification';
import ChatPage from './pages/ChatPage';
import CommentPage from './pages/CommentPage'
import UserPage from "./pages/UserPage";

const App = () => {
    return (
        <Router>
            <div style={{display: 'flex'}}>
                <SideMenu/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/verification" element={<Verification/>}/>
                    <Route path="/profile" element={<MyProfilePage/>}/>
                    <Route path="/user/:userId" element={<UserPage/>}/>
                    <Route path="/city/:cityId" element={<CityPage/>}/>
                    <Route path="/attraction/:attractionId/:viewAll" element={<AttractionPage/>}/>
                    <Route path="/comments/:postId" element={<CommentPage/>}/>
                    <Route path="/chat" element={<ChatPage/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
