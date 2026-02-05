import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about NASHRAY interior photography services, pricing, process, preparation, and deliverables.',
  keywords: [
    'interior photography FAQ',
    'photography services questions',
    'NASHRAY FAQ',
    'photography pricing Dubai',
    'photo shoot preparation',
  ],
  openGraph: {
    title: 'Frequently Asked Questions | NASHRAY',
    description:
      'Find answers to common questions about NASHRAY interior photography services, pricing, process, and deliverables.',
    images: ['/images/og-image.jpg'],
  },
  twitter: {
    title: 'Frequently Asked Questions | NASHRAY',
    description:
      'Find answers to common questions about NASHRAY interior photography services, pricing, process, and deliverables.',
  },
  alternates: {
    canonical: '/faq',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
