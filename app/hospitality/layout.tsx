import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hospitality Photography',
  description:
    'Professional hospitality photography in Dubai - Hotels, Restaurants, Resorts, and Event Spaces. Capture the atmosphere and luxury of your hospitality venue.',
  keywords: [
    'hospitality photography Dubai',
    'hotel photography',
    'restaurant photography',
    'resort photography UAE',
    'event space photography',
  ],
  openGraph: {
    title: 'Hospitality Photography | NASHRAY',
    description:
      'Professional hospitality photography - Hotels, Restaurants, Resorts, and Event Spaces in Dubai and the UAE.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/hospitality',
  },
};

export default function HospitalityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
