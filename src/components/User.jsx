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
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-black">Perfil de Usuario</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Nombre:</label>
        <p className="text-gray-900">{name}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Apellido:</label>
        <p className="text-gray-900">{last_name}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Correo Electrónico:</label>
        <p className="text-gray-900">{email}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Estado:</label>
        <p className="text-gray-900">{status ? 'Activo' : 'Inactivo'}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Fecha de Creación:</label>
        <p className="text-gray-900">{new Date(createdAT).toLocaleString()}</p>
      </div>
      <button onClick={handleEditClick} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Editar Usuario
      </button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <form className='text-black'>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Nombre:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Apellido:</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Correo Electrónico:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            {/* <div className="mb-4">
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
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Guardar
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default User;
