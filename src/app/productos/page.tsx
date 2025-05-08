'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { products as baseProducts } from '@/data/products';

// Define Product interface to fix linter error
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
    // Try to retrieve products from localStorage
    const loadProducts = () => {
      try {
        const savedProducts = localStorage.getItem('cachedProducts');
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        } else {
          // If no products in localStorage, use base products
          setProducts(baseProducts);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts(baseProducts);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
    
    // Listen for product update events
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
          <p className="text-xl">Loading products...</p>
        </div>
      </div>
    );
  }
  
  const productsWithId = products.filter(p => p.id !== undefined || p._id !== undefined);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <Link 
          href="/productos/nuevo" 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          New Product
        </Link>
      </div>
      
      {productsWithId.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No products available at the moment.</p>
          <Link 
            href="/productos/nuevo" 
            className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
          >
            Add your first product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {productsWithId.map(product => {
            const productId = product.id || product._id;
            // Asegurarse de que productId no sea undefined antes de renderizar ProductCard
            // Aunque el filtro anterior debería prevenir esto, es una doble comprobación.
            if (productId === undefined) return null; 

            return (
              <ProductCard 
                key={productId}
                id={productId} // Ahora productId es string | number, no undefined
                name={product.name}
                price={product.price}
                image={product.image}
                description={product.description}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}