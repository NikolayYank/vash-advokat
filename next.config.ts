import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  ...(process.env.NODE_ENV === "development"
    ? { allowedDevOrigins: ["192.168.0.204"] }
    : {}),
};

export default nextConfig;
