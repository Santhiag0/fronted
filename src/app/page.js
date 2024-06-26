"use client";

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://reposteador.onrender.com/auth/login', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), 
        }
      );

      if (response.ok) {
        const data = await response.json();
        Cookies.set('token', data.data.accessToken, { expires: 3 }); // Guardar el token en cookies
        console.log(Cookies.get('token'));
        Cookies.set('user', JSON.stringify(data.data.user), { expires: 3 }); // Guardar los datos del usuario en cookies
        router.push('/Main'); // Redireccionar a la página principal
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error durante el login', error);
      alert('Hubo un error durante el login. Inténtalo de nuevo.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-[#020201] flex rounded-lg shadow-lg w-full max-w-4xl">
        <div className="w-1/2">
        <img 
            src="https://www.certia.net/wp-content/uploads/2020/06/133932033_s.jpg"  
            alt="Imagen" 
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>
        <div className="w-1/2 p-10">
          <h1 className="text-2xl font-bold text-[#c2c5cb] mb-8">Reporteador SQL</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-[#c2c5cb] mb-2">Username:</label>
              <input 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6f859b]"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-[#c2c5cb] mb-2">Password:</label>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6f859b]"
              />
              <span 
                className="absolute right-3 top-14 transform -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
            <button 
              type="submit" 
              className="w-full p-3 mt-4 bg-[#6f859b] text-white rounded hover:bg-[#c2c5cb] transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}; 

export default LoginPage;
