import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Materials Photography',
  description:
    'Professional materials and textures photography in Dubai and the UAE. Capture marble, wood, stone, metal, and fabric textures with stunning detail.',
  keywords: [
    'materials photography Dubai',
    'texture photography UAE',
    'marble photography',
    'wood grain photography',
    'surface detail photographer',
  ],
  openGraph: {
    title: 'Materials Photography | MyVisual.Space',
    description:
      'Professional materials and textures photography - Capture marble, wood, stone, and fabric textures in Dubai and the UAE.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/custom-interiors/material-closeups-photography-dubai',
  },
};

export default function MaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
