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
  output: 'standalone', // Add standalone output mode for better Docker compatibility
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
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
  reactStrictMode: false, // Changed to false for production to avoid double-rendering issues
  // Improved production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Optimize page loading - disabled optimizeCss to avoid critters dependency issues
  experimental: {
    optimizeCss: false, // Disabled to avoid critters dependency issues
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // Increase build timeout for larger projects
  staticPageGenerationTimeout: 120,
  // Disable source maps in production for better performance
  productionBrowserSourceMaps: false,
}

export default nextConfig
