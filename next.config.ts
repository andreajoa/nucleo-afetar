import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {unoptimized: true},
  reactStrictMode: true,
  async rewrites() {
    return [
      {source: "/convite", destination: "/convite.html"},
      {source: "/convite/gerar", destination: "/convite-gerar.html"},
      {source: "/convite/video", destination: "/convite-video.html"},
      {source: "/convite-video", destination: "/convite-video.html"},
    ];
  },
};
export default nextConfig;
