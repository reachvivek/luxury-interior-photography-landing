import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function ArchitecturalElementsPage() {
  return (
    <SubcategoryPage
      mainCategory="Custom Interiors"
      subcategoryTitle="Architectural Elements"
      description="Detailed photography capturing unique architectural features, from custom staircases and columns to decorative ceilings and structural design elements."
      heroImage="/images/custom-interiors/architectural-elements/resort-archway-night.jpg"
      galleryImages={[
        {
          src: "/images/custom-interiors/architectural-elements/resort-archway-night.jpg",
          alt: "Resort archway at night",
        },
        {
          src: "/images/custom-interiors/architectural-elements/arched-poolside-view.jpg",
          alt: "Arched poolside view",
        },
        {
          src: "/images/custom-interiors/architectural-elements/luxury-ceiling-detail.jpg",
          alt: "Luxury ceiling detail",
        },
        {
          src: "/images/custom-interiors/architectural-elements/ornate-bathroom-ceiling.jpg",
          alt: "Ornate bathroom ceiling",
        },
        {
          src: "/images/custom/architectural-elements/pool-area-cityscape-view.jpg",
          alt: "Pool area with cityscape architectural view",
        },
        {
          src: "/images/custom/architectural-elements/flame-towers-night-illuminated.jpg",
          alt: "Architectural night illumination",
        },
      ]}
    />
  );
}
