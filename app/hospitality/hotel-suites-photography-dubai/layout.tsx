import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hotel Suites Photography',
  description:
    'Professional hotel suite photography in Dubai and the UAE. Capture the luxury, comfort, and ambiance of hotel rooms and suites for marketing and booking platforms.',
  keywords: [
    'hotel photography Dubai',
    'hotel suite photography UAE',
    'luxury hotel photography',
    'hotel room photography',
    'Dubai hotel photographer',
  ],
  openGraph: {
    title: 'Hotel Suites Photography | MyVisual.Space',
    description:
      'Professional hotel suite photography - Capture the luxury and ambiance of hotel rooms and suites in Dubai and the UAE.',
    images: ['/images/hospitality/hotel-suites/hotel-lobby-colorful-sofas.jpg'],
  },
  alternates: {
    canonical: '/hospitality/hotel-suites-photography-dubai',
  },
};

export default function HotelSuitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
