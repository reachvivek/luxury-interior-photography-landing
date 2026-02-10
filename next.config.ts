import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/api/portraits/**",
      },
    ],
  },
  outputFileTracingExcludes: {
    "/api/admin/images": ["public/images/**/*"],
    "/api/admin/upload": ["public/images/**/*"],
    "/api/admin/content": ["public/images/**/*"],
  },
};

export default nextConfig;
