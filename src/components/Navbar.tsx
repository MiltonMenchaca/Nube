'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-blue-200 transition duration-300">
          TiendaNext
        </Link>

        {/* Botón de menú móvil */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-blue-700 focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Menú principal"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Menú de navegación */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="md:flex md:space-x-6 flex-col md:flex-row absolute md:relative bg-blue-600 md:bg-transparent left-0 right-0 md:left-auto md:right-auto top-16 md:top-auto p-4 md:p-0 shadow-md md:shadow-none z-10">
            <li>
              <Link href="/" className="block py-2 md:py-0 hover:text-blue-200 transition duration-300">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/productos" className="block py-2 md:py-0 hover:text-blue-200 transition duration-300">
                Productos
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="block py-2 md:py-0 hover:text-blue-200 transition duration-300">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}