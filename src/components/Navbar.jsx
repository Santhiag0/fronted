"use client";

import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();

    const handleLogout = (e) => {
        e.preventDefault();
        // Remove the cookie named 'token'
        Cookies.remove('access_token');
        // Redirect to the home page
        router.push('/');
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <span className="font-semibold text-xl tracking-tight text-white">REPORTEADOR</span>
            <ul className="flex justify-end space-x-8">
                <li>
                    <Link href="/Main" className="text-white hover:text-gray-400 transition duration-300">
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link href="/Conections" className="text-white hover:text-gray-400 transition duration-300">
                        Conexiones
                    </Link>
                </li>
                <li>
                    <Link href="/User" className="text-white hover:text-gray-400 transition duration-300">
                        Usuario
                    </Link>
                </li>
                <li>
                    <a href="/" onClick={handleLogout} className="text-white hover:text-gray-400 transition duration-300">
                        Log Out
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
