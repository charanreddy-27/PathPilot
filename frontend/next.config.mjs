/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ['next-themes'],
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
  async rewrites() {
    // Use the actual backend API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const useMockApi = false; // Always use the real backend now that it's available
    
    return [
      {
        source: '/api/:path*',
        destination: useMockApi ? '/api/mock/:path*' : `${apiUrl}/:path*`,
      },
    ];
  },
  // Performance optimizations
  swcMinify: true,
  reactStrictMode: true,
  // Improved production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Optimize page loading
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
}

export default nextConfig
