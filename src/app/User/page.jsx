import React from 'react';
import Navbar from '../../components/Navbar';
import User from '../../components/User'

const MainPage = () => {
    return (
        <div className="h-screen bg-gradient-to-r from-gray-200 to-white">
            <Navbar />
            <User/>
        </div>
    );
};

export default MainPage;