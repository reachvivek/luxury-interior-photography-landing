import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Interiors Photography',
  description:
    'Professional custom interiors photography in Dubai - Architectural Elements, Custom Furniture, Materials, and Design Details. Capture the craftsmanship and artistry.',
  keywords: [
    'custom interiors photography',
    'architectural details photography',
    'furniture photography Dubai',
    'materials photography',
    'design details photography UAE',
  ],
  openGraph: {
    title: 'Custom Interiors Photography | MyVisual.Space',
    description:
      'Professional custom interiors photography - Architectural Elements, Custom Furniture, Materials, and Design Details.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/custom-interiors',
  },
};

export default function CustomInteriorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
