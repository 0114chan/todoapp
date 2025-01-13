import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // 모든 HTTPS 도메인 허용
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;