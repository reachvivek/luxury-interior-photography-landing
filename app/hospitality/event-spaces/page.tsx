import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function EventSpacesPage() {
  return (
    <SubcategoryPage
      mainCategory="Hotels & Hospitality"
      subcategoryTitle="Event Spaces"
      description="Professional photography of event venues and spaces, showcasing versatile settings for weddings, conferences, and special occasions."
      heroImage="/images/hospitality/event-spaces/beach-wedding-pavilion.jpg"
      galleryImages={[
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
      ]}
    />
  );
}
