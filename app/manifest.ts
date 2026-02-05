import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/constants/seo';

export default function manifest(): MetadataRoute.Manifest {
  const { siteName, siteDescription, themeColor, backgroundColor } = SEO_CONFIG;

  return {
    name: `${siteName} - Luxury Interior Photography`,
    short_name: siteName,
    description: siteDescription,
    start_url: '/',
    display: 'standalone',
    background_color: backgroundColor,
    theme_color: themeColor,
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    categories: ['photography', 'business', 'lifestyle'],
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/images/og-image.jpg',
        sizes: '1200x630',
        type: 'image/jpeg',
      },
    ],
  };
}
