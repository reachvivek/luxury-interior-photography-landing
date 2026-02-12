import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Furniture Photography',
  description:
    'Professional custom furniture photography in Dubai and the UAE. Capture bespoke furniture pieces, craftsmanship, and design details with precision.',
  keywords: [
    'furniture photography Dubai',
    'custom furniture photography UAE',
    'bespoke furniture photography',
    'furniture detail photography',
    'Dubai furniture photographer',
  ],
  openGraph: {
    title: 'Custom Furniture Photography | MyVisual.Space',
    description:
      'Professional custom furniture photography - Capture bespoke furniture pieces and craftsmanship in Dubai and the UAE.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/custom-interiors/custom-furniture-photography-dubai',
  },
};

export default function CustomFurnitureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
