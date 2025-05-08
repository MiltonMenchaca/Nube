import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

// GET - Obtener un producto por su ID
export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop();
    await connectDB();
    const product = await Product.findById(id);
    
    if (!product) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return Response.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return Response.json(
      { error: 'Error fetching product' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un producto por su ID
export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop();
    const body = await request.json();
    await connectDB();
    
    const product = await Product.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return Response.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return Response.json(
      { error: 'Error updating product' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un producto por su ID
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop();
    await connectDB();
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return Response.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return Response.json(
      { error: 'Error deleting product' },
      { status: 500 }
    );
  }
} 