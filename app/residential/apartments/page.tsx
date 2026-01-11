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
    />
  );
}
