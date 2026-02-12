import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restaurant Photography',
  description:
    'Professional restaurant interior photography in Dubai and the UAE. Showcase your dining space, ambiance, and culinary environment to attract guests.',
  keywords: [
    'restaurant photography Dubai',
    'restaurant interior photography UAE',
    'dining space photography',
    'cafe photography Dubai',
    'Dubai restaurant photographer',
  ],
  openGraph: {
    title: 'Restaurant Photography | MyVisual.Space',
    description:
      'Professional restaurant interior photography - Showcase your dining space and ambiance in Dubai and the UAE.',
    images: ['/images/hospitality/restaurants/art-gallery-dining-room.jpg'],
  },
  alternates: {
    canonical: '/hospitality/restaurants-photography-dubai',
  },
};

export default function RestaurantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
