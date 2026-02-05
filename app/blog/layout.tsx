import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Insights',
  description:
    'Explore insights on interior photography, architectural photography techniques, design trends, and the art of capturing exceptional spaces by NASHRAY.',
  keywords: [
    'interior photography blog',
    'architectural photography tips',
    'photography insights',
    'design photography trends',
    'luxury photography journal',
  ],
  openGraph: {
    title: 'Blog & Insights | NASHRAY',
    description:
      'Explore insights on interior photography, architectural photography techniques, and the art of capturing exceptional spaces.',
    images: ['/images/og-image.jpg'],
  },
  twitter: {
    title: 'Blog & Insights | NASHRAY',
    description:
      'Explore insights on interior photography, architectural photography techniques, and the art of capturing exceptional spaces.',
  },
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
