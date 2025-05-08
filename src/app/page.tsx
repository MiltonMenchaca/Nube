'use client';

import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">TiendaNext</h1>
      
      <div className="text-center mb-8">
        <p className="text-xl mb-6">Descubre los mejores productos tecnológicos al mejor precio.</p>
        <Link 
          href="/productos" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 inline-block"
        >
          Ver catálogo de productos
        </Link>
      </div>
      
      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Modo Demostración</h2>
        <p>
          Esta aplicación está funcionando con datos locales para demostración. 
          Para usar datos persistentes, configura una base de datos MongoDB.
        </p>
      </div>
    </div>
  );
}
