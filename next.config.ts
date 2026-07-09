import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  allowedDevOrigins: ["10.230.42.32"],
};

export default nextConfig;
