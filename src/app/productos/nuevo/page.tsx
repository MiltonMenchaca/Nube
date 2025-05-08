'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { products as baseProducts } from '@/data/products';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: 'https://placehold.co/600x400/3498db/ffffff?text=Nuevo+Producto',
    description: '',
    category: 'Electrónicos',
    features: ''
  });

  // Función para manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para crear el producto localmente y en localStorage
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convertir features de string a array
      const featuresArray = formData.features
        .split('\n')
        .map(feature => feature.trim())
        .filter(Boolean);

      if (featuresArray.length === 0) {
        throw new Error('Debes agregar al menos una característica');
      }

      // Generar un nuevo ID para el producto
      const maxId = Math.max(0, ...baseProducts.map(p => p.id || 0));
      const newId = maxId + 1;

      // Crear objeto de producto
      const newProduct = {
        ...formData,
        id: newId,
        price: Number(formData.price),
        features: featuresArray
      };

      // Obtener productos guardados o usar los base
      let existingProducts;
      try {
        const savedProducts = localStorage.getItem('cachedProducts');
        existingProducts = savedProducts ? JSON.parse(savedProducts) : [...baseProducts];
      } catch {
        existingProducts = [...baseProducts];
      }

      // Añadir el nuevo producto
      const updatedProducts = [...existingProducts, newProduct];
      
      // Guardar en localStorage
      localStorage.setItem('cachedProducts', JSON.stringify(updatedProducts));
      
      // Notificar a otros componentes sobre la actualización
      window.dispatchEvent(new Event('productUpdated'));

      // Intentamos también enviar a la API en segundo plano (pero no esperamos respuesta)
      try {
        fetch('/api/productos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        }).catch(error => {
          console.log('No se pudo guardar en API, pero el producto se guardó localmente:', error);
        });
      } catch (error) {
        console.log('Error al intentar enviar a la API (solo en caché local):', error);
      }

      // Redirigir al listado de productos
      router.push('/productos');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear el producto';
      setError(errorMessage || 'Error al crear el producto. Inténtelo de nuevo.');
      console.error('Error al crear producto:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/productos" className="text-blue-600 hover:underline">
          ← Volver a productos
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
        <h1 className="text-3xl font-bold mb-6">Agregar Nuevo Producto</h1>

        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          <strong>Modo sin conexión:</strong> Los productos se guardarán localmente en tu navegador.
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
              placeholder="Por ejemplo:&#10;Pantalla de 6.1 pulgadas&#10;Batería de 4000 mAh&#10;Cámara de 48MP"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-8 rounded hover:bg-blue-700 w-full md:w-auto"
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Producto'}
          </button>
        </form>
      </div>
    </div>
  );
} 