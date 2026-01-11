import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function HotelSuitesPage() {
  return (
    <SubcategoryPage
      mainCategory="Hotels & Hospitality"
      subcategoryTitle="Hotel Suites"
      description="Elegant photography capturing the luxury and comfort of hotel suites, from boutique rooms to presidential suites with world-class amenities."
      heroImage="/images/hospitality/hotel-suites/luxury-resort-lobby-entrance.jpg"
      galleryImages={[
        {
          src: "/images/hospitality/hotel-suites/luxury-resort-lobby-entrance.jpg",
          alt: "Luxury resort lobby entrance",
        },
        {
          src: "/images/hospitality/hotel-suites/hotel-lobby-colorful-sofas.jpg",
          alt: "Hotel lobby with colorful sofas",
        },
        {
          src: "/images/hospitality/hotel-suites/hotel-courtyard-fountain-night.jpg",
          alt: "Hotel courtyard with fountain at night",
        },
        {
          src: "/images/hospitality/hotel-suites/modern-resort-exterior-sunset.jpg",
          alt: "Modern resort exterior at sunset",
        },
        {
          src: "/images/hospitality/hotel-suites/luxury-garden-terrace-night.jpg",
          alt: "Luxury garden terrace at night",
        },
        {
          src: "/images/hospitality/hotel-suites/resort-pool-archway-view.jpg",
          alt: "Resort pool with archway view",
        },
      ]}
    />
  );
}
