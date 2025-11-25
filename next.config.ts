import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Static export for Firebase hosting
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

  // SWC minification is default in Next 15+; removed deprecated swcMinify key

  // Disable source maps in production for smaller bundle
  productionBrowserSourceMaps: false,

  // Experimental features placeholder (add if needed)
  // experimental: {},

  // Reduce bundle size by tree-shaking unused code
  webpack: (config) => {
    // Add any custom webpack optimizations here
    return config
  },
}

export default nextConfig