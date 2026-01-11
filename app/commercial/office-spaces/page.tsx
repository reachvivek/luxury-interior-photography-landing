import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function OfficeSpacesPage() {
  return (
    <SubcategoryPage
      mainCategory="Commercial & Industry"
      subcategoryTitle="Office Spaces"
      description="Professional office photography showcasing modern workspaces, executive offices, and collaborative environments designed for productivity and innovation."
      heroImage="/images/commercial/office-spaces/modern-commercial-building-night.jpg"
      galleryImages={[
        {
          src: "/images/commercial/office-spaces/modern-commercial-building-night.jpg",
          alt: "Modern commercial building at night",
        },
        {
          src: "/images/commercial/coworking-spaces/modern-workspace-lounge-seating.jpg",
          alt: "Modern workspace lounge seating",
        },
        {
          src: "/images/commercial/coworking-spaces/cofiesto-cafe-wide-interior.jpg",
          alt: "Open plan office workspace",
        },
        {
          src: "/images/residential/home-offices/contemporary-office-space.jpg",
          alt: "Contemporary executive office",
        },
        {
          src: "/images/residential/home-offices/modern-workspace-window-seating.jpg",
          alt: "Office with window seating",
        },
        {
          src: "/images/commercial/coworking-spaces/cofiesto-cafe-interior-counter.jpg",
          alt: "Office reception and lounge area",
        },
      ]}
    />
  );
}
