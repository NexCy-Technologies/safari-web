import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Static export for hosting on Firebase/Netlify/Vercel
  output: 'export',
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Build configuration
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during production build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  
  // Image optimization configuration
  // IMPORTANT: For static exports, unoptimized MUST be true
  images: {
    unoptimized: true, // Required for static export
    domains: ["firebasestorage.googleapis.com"], // Allow Firebase images
  },

  // Compiler options for better performance
  compiler: {
    // Remove console.log in production (keeps error and warn)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Enable SWC minification (faster than Terser)
  swcMinify: true,

  // Disable source maps in production for smaller bundle
  productionBrowserSourceMaps: false,

  // Experimental features for better performance
  experimental: {
    // Enable optimized package imports for other libraries
    optimizePackageImports: ['lucide-react'],
  },

  // Reduce bundle size by tree-shaking unused code
  webpack: (config) => {
    // Add any custom webpack optimizations here
    return config
  },
}

export default nextConfig