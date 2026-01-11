import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function CoworkingSpacesPage() {
  return (
    <SubcategoryPage
      mainCategory="Commercial & Industry"
      subcategoryTitle="Co-working Spaces"
      description="Dynamic photography of collaborative co-working environments, hot desks, private booths, and community spaces that inspire creativity and connection."
      heroImage="/images/commercial/coworking-spaces/cofiesto-cafe-full-view.jpg"
      galleryImages={[
        {
          src: "/images/commercial/coworking-spaces/cofiesto-cafe-full-view.jpg",
          alt: "Coworking cafe full view",
        },
        {
          src: "/images/commercial/coworking-spaces/cofiesto-cafe-wide-interior.jpg",
          alt: "Wide coworking interior",
        },
        {
          src: "/images/commercial/coworking-spaces/cofiesto-cafe-seating-area.jpg",
          alt: "Coworking seating area",
        },
        {
          src: "/images/commercial/coworking-spaces/cofiesto-cafe-window-seating.jpg",
          alt: "Window seating workspace",
        },
        {
          src: "/images/commercial/coworking-spaces/modern-workspace-lounge-seating.jpg",
          alt: "Modern workspace lounge",
        },
        {
          src: "/images/commercial/coworking-spaces/cofiesto-cafe-outdoor-seating.jpg",
          alt: "Outdoor coworking space",
        },
      ]}
    />
  );
}
