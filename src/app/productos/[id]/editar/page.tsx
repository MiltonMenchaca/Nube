'use client';

import { products as baseProducts } from '@/data/products';
import EditProductForm from '@/components/EditProductForm';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (params && params.id) {
      const product = baseProducts.find(p => p.id === parseInt(params.id));
      if (!product) {
        router.push('/404');
      }
    } else {
      // Opcional: manejar el caso donde params.id no está disponible inmediatamente
      // podrías redirigir a /404 o mostrar un estado de carga diferente.
      // router.push('/404'); 
    }
  }, [params, router]);

  if (!params || !params.id) {
    return <p>Cargando...</p>;
  }

  return <EditProductForm params={{ id: params.id }} />;
} 