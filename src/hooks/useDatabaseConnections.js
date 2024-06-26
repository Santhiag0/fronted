// hooks/useDatabaseConnections.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import cookies from 'js-cookie';

const useDatabaseConnections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await axios.get('https://reposteador.onrender.com/database-connection');
      setConnections(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching connections:', error);
      setLoading(false);
    }
  };

  const createConnection = async (connectionData) => {
    const token = cookies.get('token');
    try {
      const response = await axios.post('https://reposteador.onrender.com/database-connection', connectionData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setConnections([...connections, response.data.data]);
      return response.data;
    } catch (error) {
      console.error('Error creating connection:', error);
      return null;
    }
  };

  const updateConnection = async (id, connectionData) => {
    const token = cookies.get('token');
    try {
      const response = await axios.put(`https://reposteador.onrender.com/database-connection/${id}`, connectionData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedConnections = connections.map((conn) =>
        conn.id_database === id ? response.data.data : conn
      );
      setConnections(updatedConnections);
      return response.data;
    } catch (error) {
      console.error('Error updating connection:', error);
      return null;
    }
  };

  const deleteConnection = async (id) => {
    const token = cookies.get('token');
    try {
      await axios.delete(`https://reposteador.onrender.com/database-connection/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setConnections(connections.filter((conn) => conn.id_database !== id));
    } catch (error) {
      console.error('Error deleting connection:', error);
    }
  };

  return { connections, loading, fetchConnections, createConnection, updateConnection, deleteConnection };
};

export default useDatabaseConnections;
