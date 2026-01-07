export interface Feature {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    id: '1',
    number: '01',
    title: 'Proven Experience',
    description: 'Years of experience photographing residential, hospitality, and commercial interiors across the UAE.',
  },
  {
    id: '2',
    number: '02',
    title: 'Transparent Payments',
    description: '50% upfront, 50% upon delivery. No hidden fees.',
  },
  {
    id: '3',
    number: '03',
    title: 'First-Time Client Offer',
    description: 'First-time clients receive a 20% discount on their first project.',
  },
  {
    id: '4',
    number: '04',
    title: 'Fast Turnaround',
    description: 'Short lead times and efficient post-production ensure timely delivery.',
  },
];
