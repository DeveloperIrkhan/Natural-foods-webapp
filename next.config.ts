import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: ["res.cloudinary.com"]
  }
};

export default nextConfig;

// const nextConfig = {
//   images: {
//     domains: [
//       "res.cloudinary.com" // Add your Cloudinary domain here
//       // If you have other external image hosts, add them here too, e.g., 'example.com', 'another-cdn.net'
//     ]
//   }
//   // Other Next.js configurations can go here
// };

// module.exports = nextConfig;
