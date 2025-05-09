export const dynamic = "force-static";

import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { products } from '@/data/products';

// POST /api/seed - Inicializa la base de datos con datos de muestra
export async function GET() {
  try {
    // Conectar a MongoDB
    const connection = await connectDB();
    
    if (!connection) {
      return NextResponse.json(
        { error: 'No se pudo conectar a la base de datos' },
        { status: 500 }
      );
    }
    
    // Eliminar todos los productos existentes
    await Product.deleteMany({});
    console.log('Colección de productos limpiada');
    
    // Insertar los productos de muestra
    const result = await Product.insertMany(products);
    console.log(`${result.length} productos insertados en la base de datos`);
    
    return NextResponse.json({
      success: true,
      message: `Base de datos inicializada con ${result.length} productos`,
      products: result
    }, { status: 200 });
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    return NextResponse.json(
      { error: 'Error al inicializar la base de datos' },
      { status: 500 }
    );
  }
} 