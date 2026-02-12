import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Villa Photography',
  description:
    'Professional villa interior photography in Dubai and the UAE. Capture the elegance, space, and architectural details of luxury villas with precision and artistry.',
  keywords: [
    'villa photography Dubai',
    'luxury villa photography',
    'villa interior photography UAE',
    'residential villa photography',
    'Dubai villa photographer',
  ],
  openGraph: {
    title: 'Villa Photography | MyVisual.Space',
    description:
      'Professional villa interior photography - Capture the elegance and architectural details of luxury villas in Dubai and the UAE.',
    images: ['/images/residential/villas/luxury-villa-with-porsche.jpg'],
  },
  alternates: {
    canonical: '/residential/luxury-villas-photography-dubai',
  },
};

export default function VillasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
