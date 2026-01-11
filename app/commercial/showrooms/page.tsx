import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function ShowroomsPage() {
  return (
    <SubcategoryPage
      mainCategory="Commercial & Industry"
      subcategoryTitle="Showrooms"
      description="Professional showroom photography showcasing product displays, automotive showrooms, furniture galleries, and design exhibitions in their best light."
      heroImage="/images/residential/villas/luxury-villa-with-porsche.jpg"
      galleryImages={[
        {
          src: "/images/residential/villas/luxury-villa-with-porsche.jpg",
          alt: "Luxury automotive showroom",
        },
        {
          src: "/images/hospitality/hotel-suites/luxury-resort-lobby-entrance.jpg",
          alt: "Modern showroom entrance",
        },
        {
          src: "/images/hospitality/hotel-suites/hotel-lobby-colorful-sofas.jpg",
          alt: "Furniture showroom display",
        },
        {
          src: "/images/custom/custom-furniture/art-gallery-custom-seating.jpg",
          alt: "Design gallery with custom seating",
        },
        {
          src: "/images/commercial/retail-stores/retail-store-product-shelving.jpg",
          alt: "Product display showroom",
        },
        {
          src: "/images/custom/design-details/luxury-chandelier-interior.jpg",
          alt: "Lighting design showroom",
        },
      ]}
    />
  );
}
