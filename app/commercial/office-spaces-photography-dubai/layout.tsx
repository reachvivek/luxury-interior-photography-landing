import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Office Spaces Photography',
  description:
    'Professional office interior photography in Dubai and the UAE. Showcase corporate environments, workspaces, and professional settings with precision.',
  keywords: [
    'office photography Dubai',
    'corporate photography UAE',
    'workspace photography',
    'office interior photography',
    'Dubai office photographer',
  ],
  openGraph: {
    title: 'Office Spaces Photography | MyVisual.Space',
    description:
      'Professional office interior photography - Showcase corporate environments and workspaces in Dubai and the UAE.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/commercial/office-spaces-photography-dubai',
  },
};

export default function OfficeSpacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
