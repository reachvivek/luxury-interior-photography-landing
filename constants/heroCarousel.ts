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
    description: "Professional photography for villas, apartments, and penthouses that showcase every detail of your property",
    image: "/images/residential/villas/luxury-stone-villa-exterior.jpg",
    ctaText: "View Portfolio",
    ctaLink: "/residential",
  },
  {
    id: 2,
    category: "HOTELS & HOSPITALITY",
    title: "Elevating Guest Experiences",
    description: "Capture the ambiance of hotel suites, restaurants, and event spaces with stunning imagery that attracts guests",
    image: "/images/hospitality/hotel-suites/hotel-courtyard-fountain-night.jpg",
    ctaText: "Explore Projects",
    ctaLink: "/hospitality",
  },
  {
    id: 3,
    category: "COMMERCIAL & INDUSTRY",
    title: "Professional Spaces Captured",
    description: "Showcase offices, co-working spaces, retail stores, and showrooms with professional photography that drives business",
    image: "/images/commercial/coworking-spaces/cofiesto-cafe-wide-interior.jpg",
    ctaText: "View Portfolio",
    ctaLink: "/commercial",
  },
  {
    id: 4,
    category: "CUSTOM INTERIORS",
    title: "Architectural Artistry",
    description: "Highlight architectural elements, custom furniture, and design details that make your spaces truly unique",
    image: "/images/custom/architectural-elements/flame-towers-night-illuminated.jpg",
    ctaText: "Explore Projects",
    ctaLink: "/custom-interiors",
  },
];
