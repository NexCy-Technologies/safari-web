import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Strict mode & performance
  reactStrictMode: true,

  // Allow local network IP testing in development mode
  allowedDevOrigins: [
    "localhost:3000",
    "192.168.1.136",
    "192.168.1.136:3000",
  ],
  
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
}

export default nextConfig