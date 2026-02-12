import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resort Photography',
  description:
    'Professional resort photography in Dubai and the UAE. Capture the luxury, relaxation, and stunning environments of resorts and spa facilities.',
  keywords: [
    'resort photography Dubai',
    'luxury resort photography UAE',
    'spa photography',
    'beach resort photography',
    'Dubai resort photographer',
  ],
  openGraph: {
    title: 'Resort Photography | MyVisual.Space',
    description:
      'Professional resort photography - Capture the luxury and stunning environments of resorts in Dubai and the UAE.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/hospitality/resorts-photography-dubai',
  },
};

export default function ResortsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
