'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { products as baseProducts } from '@/data/products';

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

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
    features: ''
  });

  useEffect(() => {
    // Cargar datos del producto
    const loadProduct = () => {
      try {
        const productId = parseInt(params.id);
        
        // Intentar obtener el producto del localStorage
        const savedProducts = localStorage.getItem('cachedProducts');
        const productsToUse = savedProducts ? JSON.parse(savedProducts) : baseProducts;
        const product = productsToUse.find((p: Product) => p.id === productId);
        
        if (product) {
          setFormData({
            name: product.name,
            price: product.price.toString(),
            image: product.image,
            description: product.description,
            category: product.category,
            features: product.features.join('\n')
          });
        } else {
          setError('Producto no encontrado');
        }
      } catch (error) {
        console.error('Error al cargar el producto:', error);
        setError('Error al cargar los datos del producto');
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [params.id]);

  // Función para manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para actualizar el producto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const productId = parseInt(params.id);
      
      // Convertir features de string a array
      const featuresArray = formData.features
        .split('\n')
        .map(feature => feature.trim())
        .filter(Boolean);

      if (featuresArray.length === 0) {
        throw new Error('Debes agregar al menos una característica');
      }

      // Crear objeto de producto actualizado
      const updatedProduct = {
        id: productId,
        name: formData.name,
        price: Number(formData.price),
        image: formData.image,
        description: formData.description,
        category: formData.category,
        features: featuresArray
      };

      // Obtener productos actuales
      const savedProducts = localStorage.getItem('cachedProducts');
      const currentProducts = savedProducts ? JSON.parse(savedProducts) : [...baseProducts];
      
      // Encontrar y actualizar el producto en el array
      const updatedProducts = currentProducts.map((p: Product) => 
        p.id === productId ? updatedProduct : p
      );
      
      // Guardar en localStorage
      localStorage.setItem('cachedProducts', JSON.stringify(updatedProducts));
      
      // Notificar a otros componentes sobre la actualización
      window.dispatchEvent(new Event('productUpdated'));
      
      // Redirigir a la página del producto
      router.push(`/productos/${productId}`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar el producto';
      setError(errorMessage);
      console.error('Error al actualizar producto:', err);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-xl">Cargando datos del producto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/productos/${params.id}`} className="text-blue-600 hover:underline">
          ← Volver al producto
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
        <h1 className="text-3xl font-bold mb-6">Editar Producto</h1>

        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          <strong>Modo sin conexión:</strong> Los cambios se guardarán localmente en tu navegador.
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Nombre del producto</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Precio</label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">URL de la imagen</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Categoría</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="Electrónicos">Electrónicos</option>
                <option value="Computadoras">Computadoras</option>
                <option value="Audio">Audio</option>
                <option value="Wearables">Wearables</option>
                <option value="Tablets">Tablets</option>
                <option value="Fotografía">Fotografía</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 h-32"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Características (una por línea)</label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 h-48"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-8 rounded hover:bg-blue-700"
              disabled={saving}
            >
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
            
            <Link
              href={`/productos/${params.id}`}
              className="bg-gray-500 text-white py-3 px-8 rounded hover:bg-gray-600"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 