import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  allowedDevOrigins: ["10.230.42.32"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mksxkdrkpovdtdfwlqgm.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
