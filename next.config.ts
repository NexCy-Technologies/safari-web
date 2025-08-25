import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

export default nextConfig;