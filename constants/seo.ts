// Centralized SEO configuration - Update these values in one place
export const SEO_CONFIG = {
  siteUrl: "https://www.myvisual.space",
  siteName: "MyVisual.Space",
  siteDescription:
    "Exceptional interior photography capturing luxury, elegance, and detail. Specializing in residential, hospitality, commercial, and custom interior spaces in Dubai and the UAE.",
  locale: "en_US",
  twitterHandle: "@myvisualspace",
  themeColor: "#1c1917",
  backgroundColor: "#ffffff",
} as const;

// Helper to get full URL for a path
export const getFullUrl = (path: string = "") => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SEO_CONFIG.siteUrl}${cleanPath}`;
};
