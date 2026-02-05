import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Architectural Elements Photography',
  description:
    'Professional architectural elements photography in Dubai and the UAE. Capture staircases, ceilings, columns, and structural details with artistic precision.',
  keywords: [
    'architectural details photography Dubai',
    'architectural elements photography UAE',
    'structural photography',
    'staircase photography',
    'Dubai architectural photographer',
  ],
  openGraph: {
    title: 'Architectural Elements Photography | NASHRAY',
    description:
      'Professional architectural elements photography - Capture staircases, ceilings, and structural details in Dubai and the UAE.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/custom-interiors/architectural-elements',
  },
};

export default function ArchitecturalElementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
