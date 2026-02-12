import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about MyVisual.Space - Dubai-based luxury interior and architectural photography studio specializing in clarity, restraint, and timeless composition.',
  keywords: [
    'about MyVisual.Space',
    'interior photography studio',
    'Dubai photographer',
    'architectural photography Dubai',
    'luxury photography studio UAE',
  ],
  openGraph: {
    title: 'About Us | MyVisual.Space',
    description:
      'Dubai-based interior and architectural photography studio specializing in clarity, restraint, and timeless composition.',
    images: ['/images/og-image.jpg'],
  },
  twitter: {
    title: 'About Us | MyVisual.Space',
    description:
      'Dubai-based interior and architectural photography studio specializing in clarity, restraint, and timeless composition.',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
