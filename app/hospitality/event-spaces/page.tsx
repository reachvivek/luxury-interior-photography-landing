import SubcategoryPage from "@/components/services/SubcategoryPage";
import { prisma } from "@/lib/prisma";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getSubcategoryData() {
  try {
    const record = await prisma.contentSection.findUnique({ where: { section: "portfolio" } });
    return (record?.data as any)?.hospitality?.subcategories?.["event-spaces"] ?? null;
  } catch {
    return null;
  }
}

const FALLBACK = {
  mainCategory: "Hotels & Hospitality",
  subcategoryTitle: "Event Spaces Photography",
  description:
    "Professional photography of event venues and spaces, showcasing versatile settings for weddings, conferences, and special occasions.",
  heroImage: "/images/hospitality/event-spaces/beach-wedding-pavilion.jpg",
  approachTitle: "Spaces That Inspire Celebrations",
  approachDescription:
    "Nashray captures event spaces in their most aspirational light - showing not just empty venues, but the promise of unforgettable moments. Our photography tells the story of transformation potential, whether it's an intimate wedding, corporate gala, or destination conference. We emphasize versatility, capacity, and the unique atmosphere that makes planners and hosts choose your venue over competitors, capturing both grand scale and intimate details.",
  processTitle: "Showcasing Every Occasion",
  processSteps: [
    "Multi-configuration shoots showing versatility - ceremony setups, cocktail receptions, banquet configurations, and conference arrangements",
    "Strategic timing to capture natural light advantages, sunset backdrops, and elegant evening ambiance with dramatic lighting",
    "Wide-angle perspectives demonstrating capacity and flow while maintaining the intimate, welcoming feel that attracts bookings",
    "Architectural and landscape integration highlighting unique features - waterfront views, garden settings, or city skylines",
    "Post-production that enhances the 'blank canvas' appeal while showcasing the venue's distinct character and atmosphere",
  ],
  impactTitle: "Converting Inquiries to Bookings",
  impactDescription:
    "Our event space photography directly impacts venue booking rates by helping planners envision their perfect event. Venues showcasing Nashray's imagery report 50-65% increases in qualified inquiries and 35% higher conversion rates from site visits to bookings. By presenting spaces that inspire emotional connections and practical confidence, we help venues command premium pricing and secure high-value corporate contracts and destination weddings.",
  galleryImages: [
    {
      src: "/images/hospitality/event-spaces/beach-wedding-pavilion.jpg",
      alt: "Beach wedding pavilion",
    },
    {
      src: "/images/hospitality/event-spaces/lake-resort-panoramic-view-1.jpg",
      alt: "Lake resort panoramic view",
    },
    {
      src: "/images/hospitality/event-spaces/pool-terrace-evening.jpg",
      alt: "Pool terrace evening event space",
    },
    {
      src: "/images/hospitality/event-spaces/resort-event-pathway.jpg",
      alt: "Resort event pathway",
    },
    {
      src: "/images/hospitality/event-spaces/outdoor-patio-courtyard.jpg",
      alt: "Outdoor patio courtyard",
    },
    {
      src: "/images/hospitality/event-spaces/cityscape-sunset-view.jpg",
      alt: "Event space with cityscape sunset view",
    },
  ],
};

export const dynamic = "force-dynamic";

export default async function EventSpacesPage() {
  const data = await getSubcategoryData();
  const d = data ?? FALLBACK;

  return (
    <SubcategoryPage
      mainCategory={d.mainCategory}
      subcategoryTitle={d.subcategoryTitle}
      description={d.description}
      heroImage={d.heroImage}
      approachTitle={d.approachTitle}
      approachDescription={d.approachDescription}
      processTitle={d.processTitle}
      processSteps={d.processSteps}
      impactTitle={d.impactTitle}
      impactDescription={d.impactDescription}
      galleryImages={d.galleryImages}
    />
  );
}
