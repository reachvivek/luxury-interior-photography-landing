import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Showroom Photography',
  description:
    'Professional showroom interior photography in Dubai and the UAE. Showcase your products and displays with stunning photography that drives sales.',
  keywords: [
    'showroom photography Dubai',
    'car showroom photography UAE',
    'furniture showroom photography',
    'display photography Dubai',
    'showroom photographer',
  ],
  openGraph: {
    title: 'Showroom Photography | NASHRAY',
    description:
      'Professional showroom interior photography - Showcase your products and displays in Dubai and the UAE.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/commercial/showrooms',
  },
};

export default function ShowroomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
