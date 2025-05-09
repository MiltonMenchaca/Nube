import { products as baseProducts } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

// Definir la interfaz Product para generateStaticParams
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

// Esta función le dice a Next.js qué valores de `id` debe generar en build time
export function generateStaticParams() {
  return baseProducts
    .filter((product: Product) => product.id !== undefined)
    .map((product) => ({
      id: product.id!.toString(),
    }));
}

// Este es un Server Component que simplemente pasa params.id al Client Component
export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductDetailClient id={params.id} />;
}