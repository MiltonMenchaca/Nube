'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { products as baseProducts } from '@/data/products';
import { notFound, useRouter, useParams } from 'next/navigation';

// Definir la interfaz Product
interface Product {
  id?: number;
  _id?: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  features: string[];
}

// Vista detallada del producto como componente cliente
export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  useEffect(() => {
    if (params && params.id) {
      const productId = parseInt(params.id);
      try {
        const savedProducts = localStorage.getItem('cachedProducts');
        const productsToUse = savedProducts ? JSON.parse(savedProducts) : baseProducts;
        const foundProduct = productsToUse.find((p: Product) => p.id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          // Si no se encuentra aquí, el estado de loading terminará y se mostrará notFound()
        }
      } catch (error) {
        console.error('Error cargando el producto:', error);
        const foundProduct = baseProducts.find(p => p.id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
        }
      } finally {
        setLoading(false);
      }
    } else {
      // Si params.id no está disponible, setLoading(false) se ejecutará y !product activará notFound()
      setLoading(false);
    }
  }, [params]);
  
  // Función para eliminar el producto
  const handleDelete = () => {
    if (!product || !product.id) return;
    
    try {
      // Obtener productos actuales
      const savedProducts = localStorage.getItem('cachedProducts');
      const currentProducts = savedProducts ? JSON.parse(savedProducts) : baseProducts;
      
      // Filtrar productos, excluyendo el actual
      const updatedProducts = currentProducts.filter((p: Product) => p.id !== product.id);
      
      // Guardar en localStorage
      localStorage.setItem('cachedProducts', JSON.stringify(updatedProducts));
      
      // Notificar a otros componentes
      window.dispatchEvent(new Event('productUpdated'));
      
      // Redirigir a la lista de productos
      router.push('/productos');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-xl">Cargando detalles del producto...</p>
        </div>
      </div>
    );
  }
  
  // Si params no está disponible o product es null después de cargar, muestra notFound
  if (!params || !params.id || !product) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/productos" className="text-blue-600 hover:underline">
          ← Volver a productos
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto object-cover rounded"
            />
          </div>
          
          <div className="p-6 md:w-1/2">
            <div className="mb-2">
              <span className="text-sm text-blue-600 font-semibold">{product.category}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Características:</h2>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold text-blue-600">${product.price.toLocaleString('es-MX')}</span>
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">En stock</span>
            </div>
            
            <div className="flex space-x-4">
              <Link 
                href={`/productos/${product.id}/editar`}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Editar Producto
              </Link>
              
              {!confirmDelete ? (
                <button 
                  onClick={() => setConfirmDelete(true)}
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button 
                    onClick={handleDelete}
                    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                  >
                    Confirmar
                  </button>
                  <button 
                    onClick={() => setConfirmDelete(false)}
                    className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}