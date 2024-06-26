import React from 'react';
import Navbar from '../../components/Navbar';
import Conexiones from '../../components/Conexiones'

const MainPage = () => {
    return (
        <div className="h-screen bg-gradient-to-r from-gray-200 to-white">
            <Navbar />
            <Conexiones/>
        </div>
    );
};

export default MainPage;