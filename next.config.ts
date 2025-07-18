import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "localhost",
      "myjawaaf-backend.onrender.com",
      "res.cloudinary.com",
    ], // ✅ Add your backend host
  },
};

export default nextConfig;
