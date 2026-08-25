import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "craft.dsrt321.online",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;




