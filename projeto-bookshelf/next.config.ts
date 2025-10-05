import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignora ESLint durante build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Ignora erros TypeScript durante build
  },
};

export default nextConfig;