'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

export default function ProductDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        // Try to get from localStorage first
        const savedProducts = localStorage.getItem('cachedProducts');
        if (savedProducts) {
          const products = JSON.parse(savedProducts);
          const foundProduct = products.find((p: Product) => 
            p.id?.toString() === params.id || p._id === params.id
          );
          if (foundProduct) {
            setProduct(foundProduct);
            setLoading(false);
            return;
          }
        }

        // If not in localStorage, try API
        const response = await fetch(`/api/productos/${params.id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError('Error loading product');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/productos/${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Update localStorage
      const savedProducts = localStorage.getItem('cachedProducts');
      if (savedProducts) {
        const products = JSON.parse(savedProducts);
        const updatedProducts = products.filter((p: Product) => 
          p.id?.toString() !== params.id && p._id !== params.id
        );
        localStorage.setItem('cachedProducts', JSON.stringify(updatedProducts));
      }

      // Dispatch event to notify other components
      window.dispatchEvent(new Event('productUpdated'));

      router.push('/productos');
    } catch (err) {
      setError('Error deleting product');
      console.error('Error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-xl">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-xl text-red-600">{error || 'Product not found'}</p>
          <Link 
            href="/productos" 
            className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="space-x-4">
            <Link 
              href={`/productos/${params.id}/edit`}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              Edit Product
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete Product'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="p-6 md:w-1/2">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-blue-600 mb-2">
                  ${product.price}
                </h2>
                {product.category && (
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {product.category}
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Features:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-600">{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link 
            href="/productos"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
} 