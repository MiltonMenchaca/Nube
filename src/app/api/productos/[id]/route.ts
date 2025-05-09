import { NextRequest, NextResponse } from 'next/server';
import { products as baseProducts } from '@/data/products';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

// Interfaz para el producto, consistente con la usada en las páginas
interface ProductInterface {
  id?: number;
  _id?: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  features: string[];
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return baseProducts
    .filter((product: ProductInterface) => typeof product.id === 'number')
    .map((product: ProductInterface) => ({
      id: product.id!.toString(),
    }));
}

// GET - Obtener un producto por su ID (para exportación estática, usa baseProducts)
export async function GET(
  _request: NextRequest, // Nombrada con _ ya que no se usa directamente
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const product = baseProducts.find((p: ProductInterface) => p.id === productId);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found in baseProducts for static export' },
        { status: 404 }
      );
    }
    return NextResponse.json(product);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in static GET /api/productos/[id]:', errorMessage);
    return NextResponse.json(
      { error: `Error fetching product for static export: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un producto por su ID
// Este manejador usa MongoDB y no se espera que funcione en GitHub Pages.
// Se mantiene para otros entornos de despliegue.
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await connectDB(); // Esta llamada podría fallar en el build de GH si MONGODB_URI no está o es inválido
    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found in DB for PUT' },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedProduct);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in PUT /api/productos/[id]:', errorMessage);
    return NextResponse.json(
      { error: `Error updating product: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un producto por su ID
// Este manejador usa MongoDB y no se espera que funcione en GitHub Pages.
export async function DELETE(
  _request: NextRequest, // Nombrada con _ ya que no se usa directamente
  { params }: { params: { id: string } }
) {
  try {
    await connectDB(); // Esta llamada podría fallar en el build de GH si MONGODB_URI no está o es inválido
    const deletedProduct = await Product.findByIdAndDelete(params.id);

    if (!deletedProduct) {
      return NextResponse.json(
        { error: 'Product not found in DB for DELETE' },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: 'Product deleted successfully from DB' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in DELETE /api/productos/[id]:', errorMessage);
    return NextResponse.json(
      { error: `Error deleting product: ${errorMessage}` },
      { status: 500 }
    );
  }
} 