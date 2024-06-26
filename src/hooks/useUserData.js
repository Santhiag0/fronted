// hooks/useUserData.js
import { useState, useEffect } from 'react';
import cookies from 'js-cookie';
import axios from 'axios';

const useUserData = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userCookie = cookies.get('user');
    if (userCookie) {
      setUserData(JSON.parse(userCookie));
    }
  }, []);

  const updateUserData = async (updatedData) => {
    const token = cookies.get('token');
    if (!token) return;

    try {
      const response = await axios.put(`https://reposteador.onrender.com/user/${userData.id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const newUserData = response.data.data;
      cookies.set('user', JSON.stringify(newUserData));
      setUserData(newUserData);

      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  };

  return { userData, updateUserData };
};

export default useUserData;
