'use client';

import React, { useState } from 'react';
import useUserData from '../hooks/useUserData';
import Modal from '../components/Modal';

const User = () => {
  const { userData, updateUserData } = useUserData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    status: true,
  });

  if (!userData) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const { name, last_name, email, status, createdAT } = userData;

  const handleEditClick = () => {
    setFormData({
      name,
      last_name,
      email,
      status
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveClick = async () => {
    const response = await updateUserData(formData);
    if (response) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <div className="flex justify-center mb-6">
        <img
          src="https://cdn-icons-png.flaticon.com/256/1077/1077114.png"
          alt="Perfil"
          className="w-32 h-32 rounded-full"
        />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-black text-center">Perfil de Usuario</h1>
      <div className="space-y-4">
        <div className="flex items-center">
          <label className="w-1/3 text-gray-700 font-semibold">Nombre:</label>
          <p className="flex-1 text-gray-900 bg-gray-100 rounded-md p-2">{name}</p>
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-gray-700 font-semibold">Apellido:</label>
          <p className="flex-1 text-gray-900 bg-gray-100 rounded-md p-2">{last_name}</p>
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-gray-700 font-semibold">Correo Electrónico:</label>
          <p className="flex-1 text-gray-900 bg-gray-100 rounded-md p-2">{email}</p>
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-gray-700 font-semibold">Estado:</label>
          <p className="flex-1 text-gray-900 bg-gray-100 rounded-md p-2">{status ? 'Activo' : 'Inactivo'}</p>
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-gray-700 font-semibold">Fecha de Creación:</label>
          <p className="flex-1 text-gray-900 bg-gray-100 rounded-md p-2">{new Date(createdAT).toLocaleString()}</p>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button onClick={handleEditClick} className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition">
          Editar Usuario
        </button>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <form className='text-black'>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold">Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Apellido:</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Correo Electrónico:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {/* <div className="flex items-center">
                <label className="block text-gray-700 font-semibold">Estado:</label>
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                {formData.status ? 'Activo' : 'Inactivo'}
              </div> */}
              <button
                type="button"
                onClick={handleSaveClick}
                className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
              >
                Guardar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default User;
