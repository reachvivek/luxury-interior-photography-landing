import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vacation Rentals Photography',
  description:
    'Professional vacation rental photography in Dubai and the UAE. Attract more bookings with stunning interior photos that showcase your property at its best.',
  keywords: [
    'vacation rental photography Dubai',
    'Airbnb photography UAE',
    'holiday home photography',
    'short-term rental photography',
    'Dubai rental property photographer',
  ],
  openGraph: {
    title: 'Vacation Rentals Photography | NASHRAY',
    description:
      'Professional vacation rental photography - Attract more bookings with stunning interior photos in Dubai and the UAE.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/residential/vacation-rentals',
  },
};

export default function VacationRentalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
