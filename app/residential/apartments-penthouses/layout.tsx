import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apartments & Penthouses Photography',
  description:
    'Professional apartment and penthouse interior photography in Dubai. Showcase luxury high-rise living spaces with stunning compositions and natural light.',
  keywords: [
    'penthouse photography Dubai',
    'apartment photography UAE',
    'luxury apartment photography',
    'high-rise interior photography',
    'Dubai penthouse photographer',
  ],
  openGraph: {
    title: 'Apartments & Penthouses Photography | NASHRAY',
    description:
      'Professional apartment and penthouse interior photography - Showcase luxury high-rise living spaces in Dubai and the UAE.',
    images: ['/images/residential/penthouses/modern-penthouse-living-room.jpg'],
  },
  alternates: {
    canonical: '/residential/apartments-penthouses',
  },
};

export default function ApartmentsPenthousesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
