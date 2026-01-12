import SubcategoryPage from "@/components/services/SubcategoryPage";


export default function ApartmentsPenthousesPage() {
  return (
    <SubcategoryPage
      mainCategory="Residential"
      subcategoryTitle="Apartments & Penthouses Photography"
      description="Professional photography showcasing modern apartment living from cozy studios to luxury penthouses with panoramic city views, capturing sophisticated design and premium finishes."
      heroImage="/images/residential/apartments/modern-apartment-building-exterior.jpg"
      galleryImages={[
        {
          src: "/images/residential/apartments/modern-apartment-building-exterior.jpg",
          alt: "Modern apartment building exterior",
        },
        {
          src: "/images/residential/penthouses/modern-penthouse-living-room.jpg",
          alt: "Modern penthouse living room",
        },
        {
          src: "/images/residential/penthouses/penthouse-interior-1.jpg",
          alt: "Luxury penthouse interior",
        },
        {
          src: "/images/residential/penthouses/penthouse-bedroom-cityview.jpg",
          alt: "Penthouse bedroom with city view",
        },
        {
          src: "/images/residential/penthouses/penthouse-bathroom-skyline.jpg",
          alt: "Penthouse bathroom with skyline view",
        },
        {
          src: "/images/residential/penthouses/penthouse-interior-2.jpg",
          alt: "Contemporary apartment interior",
        },
        {
          src: "/images/residential/penthouses/penthouse-interior-3.jpg",
          alt: "Penthouse with city views",
        },
      ]}
      approachTitle="Mastering Color Palettes and Lighting Atmosphere"
      approachDescription="Apartment and penthouse photography requires careful attention to specific color palettes and atmosphere created through interior lighting. To achieve professional and attractive results, we use additional artificial light with varying temperatures that complement the property's design. Each property type - from contemporary apartments to luxury penthouses - demands its own unique technical approach with specific techniques for capturing both the living spaces and the dramatic city views that define elevated urban living."
      processTitle="Technical Precision for Professional Results"
      processSteps={[
        "Detailed pre-shoot planning with technical specifications including color balancing, distortion preferences (straight lines vs. creative perspectives), and style requirements tailored to your property.",
        "Strategic use of external light sources to create attractive interior color tones that convey comfort and uniqueness while maintaining realistic proximity to actual conditions.",
        "Various lens types to capture volume, atmosphere, and depth of rooms, with special attention to materials, finishes, and architectural details that define quality urban living.",
        "Comprehensive coverage including daytime and evening shots, wide interior perspectives, and panoramic photography showcasing both intimate spaces and expansive city views.",
        "Professional space preparation with strategic furniture arrangement (coordinated with designers or client agreement) to create deeper, more attractive images with maximum visual effect."
      ]}
      impactTitle="Efficient, Professional Results"
      impactDescription="Our apartment and penthouse photography delivers maximum results in minimum time. We offer free consultations to discuss all project details, quickly prepare detailed work plans with dates and angle examples, and deliver high-quality images that effectively market your properties. This combination of quality, competitive pricing, and fast turnaround makes our service profitable and convenient for residential property marketing in Dubai's competitive real estate market."
    />
  );
}
