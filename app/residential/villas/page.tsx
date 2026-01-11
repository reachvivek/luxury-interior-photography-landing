import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function VillasPage() {
  return (
    <SubcategoryPage
      mainCategory="Residential"
      subcategoryTitle="Luxury Villas"
      description="Exquisite photography capturing the grandeur and elegance of luxury villa interiors, from spacious living areas to intimate private spaces."
      heroImage="/images/residential/villas/luxury-villa-grand-entrance.jpg"
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
