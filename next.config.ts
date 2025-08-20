import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export", // <-- Add this for static export
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

export default nextConfig;