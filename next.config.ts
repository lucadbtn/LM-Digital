import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strato Hosting Basic is classic PHP/Apache shared hosting (no Node.js
  // runtime), so the site ships as a static export deployed over FTP.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
