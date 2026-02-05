import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commercial Photography',
  description:
    'Professional commercial interior photography in Dubai - Office Spaces, Retail Stores, Showrooms, and Coworking Spaces. Showcase your business environment with clarity.',
  keywords: [
    'commercial photography Dubai',
    'office photography',
    'retail store photography',
    'showroom photography UAE',
    'coworking space photography',
  ],
  openGraph: {
    title: 'Commercial Photography | NASHRAY',
    description:
      'Professional commercial interior photography - Office Spaces, Retail Stores, Showrooms, and Coworking Spaces in Dubai and the UAE.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/commercial',
  },
};

export default function CommercialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
