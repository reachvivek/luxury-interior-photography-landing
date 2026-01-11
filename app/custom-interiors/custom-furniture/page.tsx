import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function CustomFurniturePage() {
  return (
    <SubcategoryPage
      mainCategory="Custom Interiors"
      subcategoryTitle="Custom Furniture"
      description="Exquisite photography of bespoke furniture pieces, showcasing craftsmanship, materials, and unique design in custom-made furnishings."
      heroImage="/images/custom-interiors/custom-furniture/bespoke-bedroom-furniture.jpg"
      galleryImages={[
        {
          src: "/images/custom-interiors/custom-furniture/bespoke-bedroom-furniture.jpg",
          alt: "Bespoke bedroom furniture",
        },
        {
          src: "/images/custom-interiors/custom-furniture/luxury-bathroom-vanity.jpg",
          alt: "Luxury bathroom vanity",
        },
        {
          src: "/images/custom-interiors/custom-furniture/custom-salon-divider.jpg",
          alt: "Custom salon divider",
        },
        {
          src: "/images/custom/custom-furniture/art-gallery-custom-seating.jpg",
          alt: "Art gallery custom seating",
        },
        {
          src: "/images/custom/custom-furniture/horse-sculpture-restaurant-detail.jpg",
          alt: "Custom restaurant sculpture detail",
        },
        {
          src: "/images/hospitality/hotel-suites/hotel-lobby-colorful-sofas.jpg",
          alt: "Custom hotel lobby furniture",
        },
      ]}
    />
  );
}
