'use client';

import { products as baseProducts } from '@/data/products';
import EditProductForm from '@/components/EditProductForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Props que recibirá desde el Server Component
interface EditProductPageClientProps {
  id: string;
}

export default function EditProductPageClient({ id }: EditProductPageClientProps) {
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const product = baseProducts.find(p => p.id === parseInt(id));
      if (!product) {
        router.push('/404');
      }
    }
  }, [id, router]);

  if (!id) {
    return <p>Cargando...</p>;
  }

  return <EditProductForm params={{ id }} />;
} 