import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  // Obtener la respuesta
  const response = NextResponse.next();

  // Agregar headers CORS para permitir acceso desde cualquier origen en desarrollo
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}

// Especificar las rutas en las que se ejecutará el middleware
export const config = {
  matcher: '/api/:path*',
}; 