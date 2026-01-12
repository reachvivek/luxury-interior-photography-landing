import SubcategoryPage from "@/components/services/SubcategoryPage";


export default function VillasPage() {
  return (
    <SubcategoryPage
      mainCategory="Residential"
      subcategoryTitle="Luxury Villas Photography"
      description="Exquisite photography capturing the grandeur and elegance of luxury villa interiors, from spacious living areas to intimate private spaces."
      heroImage="/images/residential/villas/luxury-villa-grand-entrance.jpg"
      approachTitle="Harmonizing Exterior and Interior Excellence"
      approachDescription="Villa photography requires a unique understanding of how exterior aesthetics harmonize with interior design and window views to create a unified atmosphere. The aesthetics of the villa's exterior, the interior spaces, and the views from the windows must work together seamlessly. We capture this holistic experience - whether showcasing day and night views, or the stunning colors of sunset moments that define luxury villa living. Each villa demands its own specific approach in technique and lighting strategy."
      processTitle="The Technical Excellence Behind Every Shot"
      processSteps={[
        "Pre-shoot consultation with detailed technical specifications, providing visual guidelines and clear photography direction tailored to your property's unique features.",
        "Strategic use of external light sources for both interior and exterior shots, creating attractive color tones that convey comfort and uniqueness while maintaining realism.",
        "Diverse lens selection to capture volume, atmosphere, and depth - paying special attention to luxury details like unique furniture, expensive marble, wood, textiles, and glass reflections.",
        "Comprehensive shoot coverage including large interior shots, panoramic photography, day and evening sessions, timelapses, and aerial photography for villas and gated complexes.",
        "Professional space preparation with strategic furniture arrangement (coordinated with designers when needed) to create deeper, more attractive compositions with maximum visual impact."
      ]}
      impactTitle="Fast, Quality Results That Sell"
      impactDescription="Our approach delivers maximum effectiveness in minimum time. We provide free consultations to discuss all project complexities, quickly prepare detailed work plans with dates and angle examples, and deliver high-quality results that showcase your property's true value. This combination of quality, competitive pricing, and fast turnaround makes our photography both profitable and convenient for luxury villa marketing."
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
