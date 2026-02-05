import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Premium interior photography services by NASHRAY - Interior Photography, Architectural Photography, Real Estate Photography, and Hospitality Photography in Dubai and the UAE.',
  keywords: [
    'interior photography services',
    'architectural photography Dubai',
    'real estate photography UAE',
    'hospitality photography',
    'professional photography services',
  ],
  openGraph: {
    title: 'Our Services | NASHRAY',
    description:
      'Premium interior photography services - Interior, Architectural, Real Estate, and Hospitality Photography in Dubai and the UAE.',
    images: ['/images/og-image.jpg'],
  },
  twitter: {
    title: 'Our Services | NASHRAY',
    description:
      'Premium interior photography services - Interior, Architectural, Real Estate, and Hospitality Photography in Dubai and the UAE.',
  },
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
