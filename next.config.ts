import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: "/vash-advokat",
  assetPrefix: "/vash-advokat",
};

export default nextConfig;
