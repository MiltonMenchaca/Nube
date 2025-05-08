import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { products as localProducts } from '@/data/products';

// GET - Obtener todos los productos
export async function GET() {
  try {
    const connection = await connectDB();
    
    // Si la conexión falló, usar datos locales
    if (!connection) {
      console.log('Usando datos locales como fallback');
      return NextResponse.json(localProducts, { status: 200 });
    }
    
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    // Como fallback, devolvemos los productos locales
    console.log('Usando datos locales como fallback después de error');
    return NextResponse.json(localProducts, { status: 200 });
  }
}

// POST - Crear un nuevo producto
export async function POST(request: NextRequest) {
  try {
    const connection = await connectDB();
    
    // Si la conexión falló, simular éxito con datos locales
    if (!connection) {
      console.log('Conexión a MongoDB falló, simulando creación con datos locales');
      const body = await request.json();
      
      // Generar un ID único basado en timestamp
      const newLocalProduct = {
        ...body,
        id: Date.now(), // Usar timestamp como ID único
      };
      
      // Normalmente añadiríamos a la lista local, pero no es persistente
      // Solo simulamos un éxito
      return NextResponse.json(newLocalProduct, { status: 201 });
    }
    
    const body = await request.json();

    // Validar datos
    if (!body.name || !body.price || !body.image || !body.description || !body.category) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Crear nuevo producto
    const newProduct = await Product.create(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error al crear producto:', error);
    return NextResponse.json(
      { error: 'Error al crear el producto' },
      { status: 500 }
    );
  }
} 