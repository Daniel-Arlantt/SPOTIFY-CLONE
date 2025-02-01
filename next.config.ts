import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    domains: ["supabase.co", "ybbehamqebgbrdptqbrj.supabase.co"],
  },
  output: "export", // Asegúrate de que esta línea esté presente
  reactStrictMode: true,
};

export default nextConfig;
