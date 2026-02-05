import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with NASHRAY for luxury interior photography services in Dubai and the UAE. Book a consultation for your residential, hospitality, or commercial project.',
  keywords: [
    'contact NASHRAY',
    'interior photography booking',
    'Dubai photographer contact',
    'photography consultation',
    'book interior photographer',
  ],
  openGraph: {
    title: 'Contact Us | NASHRAY',
    description:
      'Get in touch with NASHRAY for luxury interior photography services in Dubai and the UAE.',
    images: ['/images/og-image.jpg'],
  },
  twitter: {
    title: 'Contact Us | NASHRAY',
    description:
      'Get in touch with NASHRAY for luxury interior photography services in Dubai and the UAE.',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
