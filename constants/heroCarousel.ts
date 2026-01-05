export interface HeroSlide {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    category: "RESIDENTIAL",
    title: "Luxury Living Redefined",
    description: "Professional photography for villas, apartments, and penthouses showcasing every detail",
    image: "/images/residential/villas/luxury-stone-villa-exterior.jpg",
    ctaText: "View Portfolio",
    ctaLink: "/residential",
  },
  {
    id: 2,
    category: "HOTELS & HOSPITALITY",
    title: "Elevating Guest Experiences",
    description: "Capture hotel suites, restaurants, and event spaces with imagery that attracts",
    image: "/images/hospitality/hotel-suites/hotel-courtyard-fountain-night.jpg",
    ctaText: "View Portfolio",
    ctaLink: "/hospitality",
  },
  {
    id: 3,
    category: "COMMERCIAL & INDUSTRY",
    title: "Professional Spaces Captured",
    description: "Showcase offices, co-working spaces, and retail with photography that drives business",
    image: "/images/commercial/coworking-spaces/cofiesto-cafe-wide-interior.jpg",
    ctaText: "View Portfolio",
    ctaLink: "/commercial",
  },
  {
    id: 4,
    category: "CUSTOM INTERIORS",
    title: "Architectural Artistry",
    description: "Highlight architectural elements and design details that make spaces unique",
    image: "/images/custom/architectural-elements/flame-towers-night-illuminated.jpg",
    ctaText: "View Portfolio",
    ctaLink: "/custom-interiors",
  },
];
