export interface JournalPost {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
  slug: string;
}

export const journalPosts: JournalPost[] = [
  {
    id: '1',
    title: 'Light as Language: Capturing Spatial Depth',
    description: 'How we use natural and artificial light to reveal the true character of architectural spaces.',
    category: 'Behind the Shoot',
    date: 'Jan 2026',
    image: '/images/hospitality/event-spaces/outdoor-patio-courtyard.jpg',
    slug: 'light-as-language-capturing-spatial-depth'
  },
  {
    id: '2',
    title: 'Material Honesty: Textures That Speak',
    description: 'Showcasing authentic materials and surface qualities that define contemporary interior design.',
    category: 'Design Insight',
    date: 'Dec 2025',
    image: '/images/residential/apartments/modern-apartment-building-exterior.jpg',
    slug: 'material-honesty-textures-that-speak'
  },
  {
    id: '3',
    title: 'Preparing a Space for Photography',
    description: 'Essential steps we take to ensure every space looks its absolute best before the shoot begins.',
    category: 'Process',
    date: 'Nov 2025',
    image: '/images/residential/villas/luxury-villa-with-porsche.jpg',
    slug: 'preparing-a-space-for-photography'
  }
];
