/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuración para GitHub Pages
  output: 'export',
  basePath: '/TiendaNext',
  images: {
    unoptimized: true,
    domains: ['placehold.co'],
  },
  // Configuración para Railway o cualquier entorno de despliegue
  env: {
    BASE_URL: process.env.BASE_URL || '',
    MONGODB_URI: process.env.MONGODB_URI || '',
  }
};

export default nextConfig;
