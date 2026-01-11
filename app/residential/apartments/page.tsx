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
      approachTitle="Tailored Approach for Modern Living Spaces"
      approachDescription="Apartment photography requires careful attention to specific color palettes and atmosphere created through interior lighting. We use additional artificial light with varying temperatures to achieve more professional and attractive images. Each apartment type—from compact studios to premium multi-bedroom units—cannot be photographed with the same techniques; all have their own specific characteristics both in terms of technique and lighting approach that maximize their appeal."
      processTitle="Professional Techniques for Every Space"
      processSteps={[
        "Detailed pre-shoot planning with technical specifications including color balancing, distortion preferences (straight lines vs. creative perspectives), and style requirements.",
        "Strategic use of external light sources to create attractive interior color tones that convey comfort and uniqueness while maintaining realistic proximity to actual conditions.",
        "Various lens types to capture volume, atmosphere, and depth of rooms, with special attention to materials and finishes that define quality living.",
        "Comprehensive coverage including daytime and evening shots, wide interior perspectives, and panoramic photography that showcases the full apartment experience.",
        "Professional space preparation with strategic furniture arrangement (coordinated with designers or client agreement) to create deeper, more attractive images with maximum visual effect."
      ]}
      impactTitle="Efficient, Professional Results"
      impactDescription="Our apartment photography delivers maximum results in minimum time. We offer free consultations to discuss all project details, quickly prepare detailed work plans with dates and angle examples, and deliver high-quality images that effectively market your properties. This combination of quality, competitive pricing, and fast turnaround makes our service profitable and convenient for residential property marketing."
    />
  );
}
