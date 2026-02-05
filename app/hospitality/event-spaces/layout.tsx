import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Spaces Photography',
  description:
    'Professional event space photography in Dubai and the UAE. Showcase wedding venues, conference halls, and banquet facilities with stunning imagery.',
  keywords: [
    'event space photography Dubai',
    'wedding venue photography UAE',
    'conference room photography',
    'banquet hall photography',
    'Dubai event space photographer',
  ],
  openGraph: {
    title: 'Event Spaces Photography | NASHRAY',
    description:
      'Professional event space photography - Showcase wedding venues and conference halls in Dubai and the UAE.',
    images: ['/images/hospitality/event-spaces/outdoor-patio-courtyard.jpg'],
  },
  alternates: {
    canonical: '/hospitality/event-spaces',
  },
};

export default function EventSpacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
