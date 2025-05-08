'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { products as baseProducts } from '@/data/products';

// Definimos la interfaz Product para corregir el error del linter
interface Product {
  id?: number;
  _id?: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category?: string;
  features?: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Intentamos recuperar productos del localStorage
    const loadProducts = () => {
      try {
        const savedProducts = localStorage.getItem('cachedProducts');
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        } else {
          // Si no hay productos en localStorage, usamos los base
          setProducts(baseProducts);
        }
      } catch (error) {
        console.error('Error cargando productos:', error);
        setProducts(baseProducts);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
    
    // Escuchar eventos de actualización de productos
    const handleProductUpdated = () => {
      loadProducts();
    };
    
    window.addEventListener('productUpdated', handleProductUpdated);
    
    return () => {
      window.removeEventListener('productUpdated', handleProductUpdated);
    };
  }, []);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-xl">Cargando productos...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Nuestros Productos</h1>
        <Link 
          href="/productos/nuevo" 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Nuevo Producto
        </Link>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No hay productos disponibles en este momento.</p>
          <Link 
            href="/productos/nuevo" 
            className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
          >
            Agregar tu primer producto
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map(product => (
            <ProductCard 
              key={product.id || product._id}
              id={product.id || product._id}
              name={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}