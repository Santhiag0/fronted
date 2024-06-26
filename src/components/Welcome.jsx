'use client';

import React from 'react';
import Link from 'next/link';

const Welcome = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-white">
      <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Bienvenido a Reporteador</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Donde puedes realizar reportes de manera sencilla y eficiente. Explora todas las funcionalidades que tenemos para ofrecerte.
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>Generación de reportes personalizados</li>
          <li>Análisis de datos en tiempo real</li>
          <li>Colaboración con tu equipo</li>
          <li>Seguridad y privacidad garantizada</li>
        </ul>
        <p className="text-center text-gray-700">
          ¡Estamos emocionados de que formes parte de nuestra comunidad!
        </p>
        <div className="flex justify-center mt-6" >
          <Link href="/Reporte" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Hacer Reporte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
