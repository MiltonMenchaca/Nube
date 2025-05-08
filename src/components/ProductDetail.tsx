'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/data/products';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
    description: product.description,
    category: product.category,
    features: product.features.join('\n')
  });

  // Función para manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para actualizar el producto
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convertir features de string a array
      const featuresArray = formData.features
        .split('\n')
        .map(feature => feature.trim())
        .filter(Boolean);

      const updatedProduct = {
        ...formData,
        price: Number(formData.price),
        features: featuresArray
      };

      const response = await fetch(`/api/productos/${product._id || product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }

      setIsEditing(false);
      // Recargar datos
      router.refresh();
    } catch (err) {
      setError('Error al actualizar el producto. Inténtelo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar el producto
  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/productos/${product._id || product.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      // Redirigir al listado de productos
      router.push('/productos');
      router.refresh();
    } catch (err) {
      setError('Error al eliminar el producto. Inténtelo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Vista de formulario para edición
  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
        <h2 className="text-2xl font-bold mb-6">Editar Producto</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleUpdate}>
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
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 text-gray-800 py-2 px-6 rounded hover:bg-gray-300"
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Vista normal de detalle
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">
          {error}
        </div>
      )}

      <div className="md:flex">
        <div className="md:w-1/2">
          <div className="relative h-80 w-full">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
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
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              disabled={loading}
            >
              Editar producto
            </button>
            <button 
              onClick={handleDelete}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
              disabled={loading}
            >
              Eliminar producto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 