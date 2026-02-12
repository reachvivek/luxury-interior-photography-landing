import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // SEO: 301 redirects from old subcategory slugs to new Dubai-optimized slugs
      { source: "/residential/villas", destination: "/residential/luxury-villas-photography-dubai", permanent: true },
      { source: "/residential/apartments-penthouses", destination: "/residential/apartments-penthouses-photography-dubai", permanent: true },
      { source: "/residential/vacation-rentals", destination: "/residential/vacation-rentals-photography-dubai", permanent: true },
      { source: "/hospitality/hotel-suites", destination: "/hospitality/hotel-suites-photography-dubai", permanent: true },
      { source: "/hospitality/restaurants", destination: "/hospitality/restaurants-photography-dubai", permanent: true },
      { source: "/hospitality/resorts", destination: "/hospitality/resorts-photography-dubai", permanent: true },
      { source: "/hospitality/event-spaces", destination: "/hospitality/event-spaces-photography-dubai", permanent: true },
      { source: "/commercial/office-spaces", destination: "/commercial/office-spaces-photography-dubai", permanent: true },
      { source: "/commercial/retail-stores", destination: "/commercial/retail-stores-photography-dubai", permanent: true },
      { source: "/commercial/showrooms", destination: "/commercial/showrooms-photography-dubai", permanent: true },
      { source: "/commercial/coworking-spaces", destination: "/commercial/coworking-spaces-photography-dubai", permanent: true },
      { source: "/custom-interiors/custom-furniture", destination: "/custom-interiors/custom-furniture-photography-dubai", permanent: true },
      { source: "/custom-interiors/architectural-elements", destination: "/custom-interiors/architectural-elements-photography-dubai", permanent: true },
      { source: "/custom-interiors/materials", destination: "/custom-interiors/material-closeups-photography-dubai", permanent: true },
      { source: "/custom-interiors/design-details", destination: "/custom-interiors/design-details-photography-dubai", permanent: true },
    ];
  },
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
