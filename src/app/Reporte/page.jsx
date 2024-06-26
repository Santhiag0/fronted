"use client"
import React from 'react';
import Navbar from '../../components/Navbar';
import Reporter from '../../components/Reporter/App';

const MainPage = () => {
    return (
        <div className="h-screen bg-gradient-to-r from-gray-200 to-white">
            <Navbar />
            <Reporter/>
        </div>
    );
};

export default MainPage;
