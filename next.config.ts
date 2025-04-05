import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all hostnames
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "placedog.net",
      },
      {
        protocol : "https",
        hostname : "9digits-bucket.s3.ap-southeast-1.amazonaws.com",
      }
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Set the limit to 4MB
    },
  },
};

export default nextConfig;
