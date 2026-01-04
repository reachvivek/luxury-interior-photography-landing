export interface HeroSlide {
  id: number;
  category: string;
  title: string;
  image: string;
  link: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  // Residential
  {
    id: 1,
    category: "RESIDENTIAL",
    title: "Luxury Villas",
    image: "/images/_DSC7069.jpg",
    link: "/residential#villas",
  },
  {
    id: 2,
    category: "RESIDENTIAL",
    title: "Apartments",
    image: "/images/_DSC7175.jpg",
    link: "/residential#apartments",
  },
  {
    id: 3,
    category: "RESIDENTIAL",
    title: "Penthouses",
    image: "/images/_DSC7177.jpg",
    link: "/residential#penthouses",
  },
  {
    id: 4,
    category: "RESIDENTIAL",
    title: "Home Offices",
    image: "/images/_DSC4765.jpg",
    link: "/residential#offices",
  },

  // Hotels & Hospitality
  {
    id: 5,
    category: "HOTELS & HOSPITALITY",
    title: "Hotel Suites",
    image: "/images/_DSC7184.jpg",
    link: "/hospitality#suites",
  },
  {
    id: 6,
    category: "HOTELS & HOSPITALITY",
    title: "Restaurants",
    image: "/images/_DSC4834.jpg",
    link: "/hospitality#restaurants",
  },
  {
    id: 7,
    category: "HOTELS & HOSPITALITY",
    title: "Event Spaces",
    image: "/images/_DSC7181.jpg",
    link: "/hospitality#events",
  },

  // Commercial & Industry
  {
    id: 8,
    category: "COMMERCIAL & INDUSTRY",
    title: "Office Spaces",
    image: "/images/_DSC4757.jpg",
    link: "/commercial#offices",
  },
  {
    id: 9,
    category: "COMMERCIAL & INDUSTRY",
    title: "Co-working Spaces",
    image: "/images/_DSC4762.jpg",
    link: "/commercial#coworking",
  },
  {
    id: 10,
    category: "COMMERCIAL & INDUSTRY",
    title: "Retail Stores",
    image: "/images/_DSC7135.jpg",
    link: "/commercial#retail",
  },
  {
    id: 11,
    category: "COMMERCIAL & INDUSTRY",
    title: "Showrooms",
    image: "/images/_DSC7417.jpg",
    link: "/commercial#showrooms",
  },

  // Custom Interiors
  {
    id: 12,
    category: "CUSTOM INTERIORS",
    title: "Unique Architectural Elements",
    image: "/images/_DSC7341.jpg",
    link: "/custom-interiors#architecture",
  },
  {
    id: 13,
    category: "CUSTOM INTERIORS",
    title: "Custom Furniture Photography",
    image: "/images/_DSC6309.jpg",
    link: "/custom-interiors#furniture",
  },
  {
    id: 14,
    category: "CUSTOM INTERIORS",
    title: "Material Close-Ups",
    image: "/images/_DSC7472.jpg",
    link: "/custom-interiors#materials",
  },
  {
    id: 15,
    category: "CUSTOM INTERIORS",
    title: "Design Details",
    image: "/images/_DSC4821.jpg",
    link: "/custom-interiors#details",
  },
];
