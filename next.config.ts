import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isProd ? "/vash-advokat" : "",
  assetPrefix: isProd ? "/vash-advokat" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/vash-advokat" : "",
  },
};

export default nextConfig;
