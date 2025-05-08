/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configuración para Railway o cualquier entorno de despliegue
  env: {
    BASE_URL: process.env.BASE_URL || '',
    MONGODB_URI: process.env.MONGODB_URI || '',
  },
  // Permitir imágenes desde cualquier dominio para los placeholders de productos
  images: {
    domains: ['placehold.co'],
  },
};

export default nextConfig;
