import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function PenthousesPage() {
  return (
    <SubcategoryPage
      mainCategory="Residential"
      subcategoryTitle="Penthouses"
      description="Capturing the pinnacle of luxury living with breathtaking penthouse interiors featuring panoramic views, sophisticated design, and premium finishes."
      heroImage="/images/residential/penthouses/penthouse-interior-1.jpg"
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
