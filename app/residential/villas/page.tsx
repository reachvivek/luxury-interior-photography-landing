import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function VillasPage() {
  return (
    <SubcategoryPage
      mainCategory="Residential"
      subcategoryTitle="Luxury Villas"
      description="Exquisite photography capturing the grandeur and elegance of luxury villa interiors, from spacious living areas to intimate private spaces."
      heroImage="/images/residential/villas/luxury-villa-grand-entrance.jpg"
      approachTitle="Capturing Architectural Stories"
      approachDescription="Each luxury villa tells a unique story of architectural vision and refined living. I spend time understanding the property's character—the way natural light dances through grand entrances, the craftsmanship evident in every detail, and the seamless flow between indoor and outdoor spaces. My approach goes beyond documentation; I create visual narratives that showcase the lifestyle and prestige these exceptional properties represent."
      processTitle="The Tsurov Experience"
      processSteps={[
        "Pre-shoot consultation to understand your vision, property highlights, and target audience for maximum marketing impact.",
        "Strategic timing for optimal natural lighting, capturing golden hour warmth and architectural details at their finest.",
        "Meticulous attention to staging and composition, ensuring every space is presented in its best light with refined styling.",
        "Professional post-production with color grading and enhancement that maintains authenticity while elevating visual appeal.",
        "Fast delivery of high-resolution images optimized for luxury listings, marketing materials, and digital portfolios."
      ]}
      impactTitle="Above and Beyond Results"
      impactDescription="My villa photography doesn't just document spaces—it creates desire. Clients consistently report faster sales, premium offers, and increased interest from high-net-worth buyers. These aren't just photographs; they're powerful marketing assets that showcase architectural investment and lifestyle potential, positioning properties at the top tier of Dubai's luxury market."
      galleryImages={[
        {
          src: "/images/residential/villas/luxury-villa-grand-entrance.jpg",
          alt: "Luxury villa grand entrance",
        },
        {
          src: "/images/residential/villas/luxury-villa-master-bedroom.jpg",
          alt: "Luxury villa master bedroom",
        },
        {
          src: "/images/residential/villas/luxury-villa-staircase.jpg",
          alt: "Luxury villa staircase",
        },
        {
          src: "/images/residential/villas/luxury-villa-patio-view.jpg",
          alt: "Villa patio view",
        },
        {
          src: "/images/residential/villas/luxury-stone-villa-exterior.jpg",
          alt: "Luxury stone villa exterior",
        },
        {
          src: "/images/residential/villas/stone-villa-entrance-car.jpg",
          alt: "Stone villa entrance",
        },
      ]}
    />
  );
}
