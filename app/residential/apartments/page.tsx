import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function ApartmentsPage() {
  return (
    <SubcategoryPage
      mainCategory="Residential"
      subcategoryTitle="Apartments"
      description="Professional photography showcasing modern apartment living, from cozy studios to expansive multi-bedroom residences with stunning interior design."
      heroImage="/images/residential/apartments/modern-apartment-building-exterior.jpg"
      galleryImages={[
        {
          src: "/images/residential/apartments/modern-apartment-building-exterior.jpg",
          alt: "Modern apartment building exterior",
        },
        {
          src: "/images/residential/penthouses/modern-penthouse-living-room.jpg",
          alt: "Modern apartment living room",
        },
        {
          src: "/images/residential/penthouses/penthouse-bedroom-cityview.jpg",
          alt: "Apartment bedroom with city view",
        },
        {
          src: "/images/residential/penthouses/penthouse-interior-2.jpg",
          alt: "Contemporary apartment interior",
        },
        {
          src: "/images/residential/home-offices/contemporary-office-space.jpg",
          alt: "Apartment home office space",
        },
        {
          src: "/images/residential/home-offices/modern-workspace-window-seating.jpg",
          alt: "Apartment workspace with window seating",
        },
      ]}
      approachTitle="Urban Sophistication Captured"
      approachDescription="Tsurov understands that apartment photography isn't just about documenting rooms—it's about creating a lifestyle narrative that resonates with young professionals and modern urbanites. Every shot is carefully composed to maximize the perception of space, highlight natural light flow, and showcase the urban sophistication that makes city living irresistible. From compact studios to sprawling multi-bedroom units, we transform square footage into aspirational living."
      processTitle="The Apartment Photography Experience"
      processSteps={[
        "Pre-shoot consultation to understand target demographics and unique selling points of each unit",
        "Strategic styling and staging to maximize spatial perception and create emotional connections",
        "Golden hour and twilight shoots to capture both vibrant city views and intimate evening ambiance",
        "Wide-angle mastery that makes even compact spaces feel expansive and inviting",
        "Post-production optimization ensuring colors, lighting, and atmosphere perfectly represent the urban lifestyle"
      ]}
      impactTitle="Accelerating Leasing Success"
      impactDescription="Our apartment photography consistently drives 40-60% more qualified inquiries by creating an immediate emotional connection with prospective tenants. By showcasing not just the space but the lifestyle it enables, we help property managers reduce vacancy periods and command premium rental rates that reflect the true value of modern urban living."
    />
  );
}
