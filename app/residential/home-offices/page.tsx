import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function HomeOfficesPage() {
  return (
    <SubcategoryPage
      mainCategory="Residential"
      subcategoryTitle="Home Offices"
      description="Inspiring home office photography that showcases productive and stylish workspaces, from minimalist setups to executive home offices."
      heroImage="/images/residential/home-offices/contemporary-office-space.jpg"
      galleryImages={[
        {
          src: "/images/residential/home-offices/contemporary-office-space.jpg",
          alt: "Contemporary home office space",
        },
        {
          src: "/images/residential/home-offices/modern-workspace-window-seating.jpg",
          alt: "Home office with window seating",
        },
        {
          src: "/images/residential/home-offices/home-office-storage-design.jpg",
          alt: "Home office with storage design",
        },
        {
          src: "/images/residential/penthouses/penthouse-interior-4.jpg",
          alt: "Executive home office setup",
        },
        {
          src: "/images/commercial/coworking-spaces/modern-workspace-lounge-seating.jpg",
          alt: "Modern workspace design",
        },
        {
          src: "/images/commercial/coworking-spaces/cofiesto-cafe-window-seating.jpg",
          alt: "Compact home office with window view",
        },
      ]}
    />
  );
}
