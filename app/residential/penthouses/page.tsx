import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function PenthousesPage() {
  return (
    <SubcategoryPage
      mainCategory="Residential"
      subcategoryTitle="Penthouses"
      description="Capturing the pinnacle of luxury living with breathtaking penthouse interiors featuring panoramic views, sophisticated design, and premium finishes."
      heroImage="/images/residential/penthouses/penthouse-interior-1.jpg"
      approachTitle="Mastering Color Palettes and Lighting Atmosphere"
      approachDescription="Penthouse photography is conducted with careful consideration of specific color palettes and atmosphere created through interior lighting. To achieve professional and attractive results, we use additional artificial light with varying temperatures that complement the penthouse's design. Each penthouse demands its own unique technical approach - different from villas or standard apartments - with specific techniques for capturing both the luxury of the space and the dramatic city views that define elevated living."
      processTitle="Technical Precision for Premium Results"
      processSteps={[
        "Pre-shoot technical planning including color balancing specifications, line distortion preferences, and style requirements - whether standard modern or creative with unusual tones.",
        "Strategic use of external light sources that create and convey unique style through attractive interior color tones, maintaining realism while highlighting comfort and uniqueness.",
        "Multiple lens types to capture volume and depth while paying special attention to expensive materials - marble, wood, textiles, and glass - including their reflections and colors.",
        "Comprehensive shoot including daytime and evening photography, wide interior shots, and detail captures of exclusive amenities and bespoke design elements.",
        "Professional color grading and post-production maintaining authentic representation while enhancing the luxury atmosphere that positions the property for premium marketing."
      ]}
      impactTitle="Quality, Speed, and Value"
      impactDescription="Our penthouse photography delivers professional results quickly and effectively. We provide detailed pre-shoot consultations, clear technical specifications, and fast turnaround times that respect your schedule. The combination of technical excellence, competitive pricing, and efficient workflow makes our service both profitable and convenient for luxury penthouse marketing in Dubai's competitive real estate market."
      galleryImages={[
        {
          src: "/images/residential/penthouses/penthouse-interior-1.jpg",
          alt: "Luxury penthouse interior",
        },
        {
          src: "/images/residential/penthouses/penthouse-interior-2.jpg",
          alt: "Modern penthouse living space",
        },
        {
          src: "/images/residential/penthouses/penthouse-interior-3.jpg",
          alt: "Penthouse with city views",
        },
        {
          src: "/images/residential/penthouses/modern-penthouse-living-room.jpg",
          alt: "Modern penthouse living room",
        },
        {
          src: "/images/residential/penthouses/penthouse-bathroom-skyline.jpg",
          alt: "Penthouse bathroom with skyline view",
        },
        {
          src: "/images/residential/penthouses/penthouse-bedroom-cityview.jpg",
          alt: "Penthouse bedroom city view",
        },
      ]}
    />
  );
}
