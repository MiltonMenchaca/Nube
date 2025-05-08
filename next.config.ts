/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/TiendaNext',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  experimental: {
    disableOptimizedLoading: true,
    disablePostcssPresetEnv: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

export default nextConfig;
