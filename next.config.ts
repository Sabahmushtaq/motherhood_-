import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // Static HTML export for GitHub Pages
  trailingSlash: true,       // Required for GitHub Pages routing
  images: {
    unoptimized: true,       // GitHub Pages has no image optimization server
  },
  allowedDevOrigins: ['192.168.1.6'],
};

export default nextConfig;
