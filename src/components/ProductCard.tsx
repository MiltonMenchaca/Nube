'use client';

import Link from 'next/link';

interface ProductCardProps {
  id?: string | number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductCard({ id = 0, name, price, image, description }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-2 line-clamp-2">{description}</p>
        <p className="text-lg font-bold text-blue-600 mb-4">${price.toLocaleString('es-MX')}</p>
        
        <div className="flex justify-between">
          <Link 
            href={`/productos/${id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}