'use client';

import React, { useState } from 'react';
import useDatabaseConnections from '../hooks/useDatabaseConnections';
import Modal from './Modal';

const Conexiones = () => {
  const { connections, loading, createConnection, updateConnection, deleteConnection } = useDatabaseConnections();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentConnection, setCurrentConnection] = useState(null);
  const [formData, setFormData] = useState({
    host: '',
    port: 0,
    username: '',
    password: '',
    database: ''
  });

  const openModal = (connection = null) => {
    if (connection) {
      setIsEditing(true);
      setCurrentConnection(connection);
      setFormData({
        host: connection.host,
        port: connection.port,
        username: connection.username,
        password: connection.password,
        database: connection.database
      });
    } else {
      setIsEditing(false);
      setCurrentConnection(null);
      setFormData({
        host: '',
        port: '',
        username: '',
        password: '',
        database: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (isEditing && currentConnection) {
      await updateConnection(currentConnection.id_database, formData);
    } else {
      await createConnection(formData);
    }
    closeModal();
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-100 shadow-md rounded-lg mt-10 text-black">
      <h1 className="text-2xl font-bold mb-4 text-center">Conexiones de Base de Datos</h1>
      <button
        onClick={() => openModal()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Agregar Conexión
      </button>
      <ul>
        {connections.map((connection) => (
          <li key={connection.id_database} className="mb-4 p-4 border rounded bg-white">
            <p><strong>Host:</strong> {connection.host}</p>
            <p><strong>Puerto:</strong> {connection.port}</p>
            <p><strong>Usuario:</strong> {connection.username}</p>
            <p><strong>Base de Datos:</strong> {connection.database}</p>
            <div className="mt-2">
              <button
                onClick={() => openModal(connection)}
                className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => deleteConnection(connection.id_database)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Host:</label>
              <input
                type="text"
                name="host"
                value={formData.host}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Puerto:</label>
              <input
                type="text"
                name="port"
                value={formData.port}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Usuario:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Contraseña:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Base de Datos:</label>
              <input
                type="text"
                name="database"
                value={formData.database}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {isEditing ? 'Actualizar' : 'Guardar'}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Conexiones;
