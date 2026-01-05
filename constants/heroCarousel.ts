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
    category: "RESIDENTIAL PHOTOGRAPHY",
    title: "Luxury Living Spaces",
    description: "Professional photography for villas, apartments, and penthouses that showcase every detail of your property",
    image: "/images/residential/villas/luxury-stone-villa-exterior.jpg",
    ctaText: "Order Now",
    ctaLink: "/contact",
  },
  {
    id: 2,
    category: "HOTELS PHOTOGRAPHY",
    title: "Hospitality Excellence",
    description: "Capture the ambiance of hotel suites, restaurants, and event spaces with stunning imagery that attracts guests",
    image: "/images/hospitality/hotel-suites/hotel-courtyard-fountain-night.jpg",
    ctaText: "Order Now",
    ctaLink: "/contact",
  },
  {
    id: 3,
    category: "COMMERCIAL PHOTOGRAPHY",
    title: "Business Spaces",
    description: "Showcase offices, co-working spaces, retail stores, and showrooms with professional photography that drives business",
    image: "/images/commercial/coworking-spaces/cofiesto-cafe-wide-interior.jpg",
    ctaText: "Order Now",
    ctaLink: "/contact",
  },
  {
    id: 4,
    category: "CUSTOM INTERIOR PHOTOGRAPHY",
    title: "Unique Design Details",
    description: "Highlight architectural elements, custom furniture, and design details that make your spaces truly unique",
    image: "/images/custom/architectural-elements/flame-towers-night-illuminated.jpg",
    ctaText: "Order Now",
    ctaLink: "/contact",
  },
];
