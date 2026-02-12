import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coworking Spaces Photography',
  description:
    'Professional coworking space interior photography in Dubai and the UAE. Attract members with stunning imagery of your collaborative work environment.',
  keywords: [
    'coworking photography Dubai',
    'shared office photography UAE',
    'business center photography',
    'flexible workspace photography',
    'coworking space photographer',
  ],
  openGraph: {
    title: 'Coworking Spaces Photography | MyVisual.Space',
    description:
      'Professional coworking space interior photography - Attract members with stunning imagery in Dubai and the UAE.',
    images: ['/images/commercial/coworking-spaces/modern-workspace-lounge-seating.jpg'],
  },
  alternates: {
    canonical: '/commercial/coworking-spaces-photography-dubai',
  },
};

export default function CoworkingSpacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
