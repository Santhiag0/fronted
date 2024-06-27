'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Reporter from '../../components/Reporter/App';
import Modale from '../../components/Modale';
import Cookies from 'js-cookie';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    // Fetch database connections
    const fetchConnections = async () => {
        console.log('fetching connections');
      try {
        const response = await fetch('https://reposteador.onrender.com/database-connection');
        const data = await response.json();
        setConnections(data.data);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    };

    fetchConnections();
  }, []);

  const handleSelectConnection = (id) => {
    Cookies.set('id-con', id, { expires: 3 }); 

    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      {isModalOpen ? (
        <Modale onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">Seleccione una conexión de base de datos</h2>
          <ul>
            {connections.map((connection) => (
              <li key={connection.id_database} className="mb-2">
                <button
                  onClick={() => handleSelectConnection(connection.id_database)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full text-left"
                >
                  {connection.database} (Host: {connection.host}, Port: {connection.port})
                </button>
              </li>
            ))}
          </ul>
        </Modale>
      ) : (
        <Reporter id_database={Cookies.get('id-con')} />
      )}
    </div>
  );
};

export default MainPage;
