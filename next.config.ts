import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,    // Ignore ESLint errors during production build
  },
  typescript: {
    ignoreBuildErrors: true,     // Ignore TypeScript errors during build
  },
  images: {
    unoptimized: true,           // Disable Next.js image optimization
    domains: ["firebasestorage.googleapis.com"], // Allow external domains
  },
};

export default nextConfig;