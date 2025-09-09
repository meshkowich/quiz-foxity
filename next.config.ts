import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['msw'],
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: process.env.NODE_ENV === 'production' ? '/quiz-foxity' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/quiz-foxity' : '',
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
