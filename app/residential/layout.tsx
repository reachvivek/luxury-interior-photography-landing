import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Residential Photography',
  description:
    'Professional residential interior photography in Dubai - Villas, Penthouses, Apartments, and Vacation Rentals. Capture your luxury home with precision and elegance.',
  keywords: [
    'residential photography Dubai',
    'villa photography',
    'penthouse photography',
    'apartment photography',
    'luxury home photography UAE',
  ],
  openGraph: {
    title: 'Residential Photography | MyVisual.Space',
    description:
      'Professional residential interior photography - Villas, Penthouses, Apartments, and Vacation Rentals in Dubai and the UAE.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/residential',
  },
};

export default function ResidentialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
