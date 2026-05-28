import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/motherhood_-" : "";

const nextConfig: NextConfig = {
  output: "export",          // Static HTML export for GitHub Pages
  trailingSlash: true,       // Required for GitHub Pages routing
  images: {
    unoptimized: true,       // GitHub Pages has no image optimization server
  },
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  allowedDevOrigins: ["192.168.1.6"],
};

export default nextConfig;
