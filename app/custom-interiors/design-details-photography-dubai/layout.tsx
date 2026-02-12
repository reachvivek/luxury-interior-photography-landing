import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design Details Photography',
  description:
    'Professional design details photography in Dubai and the UAE. Capture hardware, fixtures, art installations, and decorative elements with artistic precision.',
  keywords: [
    'design details photography Dubai',
    'interior details photography UAE',
    'hardware photography',
    'fixture photography',
    'decorative elements photographer',
  ],
  openGraph: {
    title: 'Design Details Photography | MyVisual.Space',
    description:
      'Professional design details photography - Capture hardware, fixtures, and decorative elements in Dubai and the UAE.',
    images: ['/images/custom/design-details/art-gallery-gold-framed-artwork.jpg'],
  },
  alternates: {
    canonical: '/custom-interiors/design-details-photography-dubai',
  },
};

export default function DesignDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
