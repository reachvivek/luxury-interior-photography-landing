import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retail Store Photography',
  description:
    'Professional retail store interior photography in Dubai and the UAE. Capture the design, ambiance, and visual merchandising of your retail space.',
  keywords: [
    'retail photography Dubai',
    'store interior photography UAE',
    'boutique photography',
    'shop photography Dubai',
    'retail space photographer',
  ],
  openGraph: {
    title: 'Retail Store Photography | NASHRAY',
    description:
      'Professional retail store interior photography - Capture the design and visual merchandising in Dubai and the UAE.',
    images: ['/images/commercial/retail-stores/beauty-salon-interior-1.jpg'],
  },
  alternates: {
    canonical: '/commercial/retail-stores',
  },
};

export default function RetailStoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
