import SubcategoryPage from "@/components/services/SubcategoryPage";


export default function CoworkingSpacesPage() {
  return (
    <SubcategoryPage
      mainCategory="Commercial & Industry"
      subcategoryTitle="Co-working Spaces Photography"
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
      approachTitle="Community and Productivity in Harmony"
      approachDescription="Nashray captures the unique energy of coworking spaces by balancing the dual narrative of professional productivity and vibrant community. Our photography highlights the versatility of these environments - from focused quiet zones to collaborative hubs - while showcasing the design elements that attract remote workers, freelancers, and startups. We understand that coworking photography must communicate flexibility, connectivity, and the lifestyle advantages that differentiate your space from traditional offices and home setups."
      processTitle="Bringing Your Community to Life"
      processSteps={[
        "Site analysis identifying diverse work zones, amenity areas, and architectural features that define your brand",
        "Timing shoots to capture authentic energy - both the buzz of peak hours and the serene productivity of quieter periods",
        "Varied compositions showcasing hot desks, private offices, meeting rooms, and social spaces to appeal to different user types",
        "Emphasis on connectivity features, natural lighting, and design details that enhance productivity and creativity",
        "Dynamic editing that conveys the vibrant, entrepreneurial atmosphere while maintaining professional polish"
      ]}
      impactTitle="Driving Membership Growth"
      impactDescription="Our coworking space photography directly impacts occupancy rates and membership conversion. Spaces featuring Nashray's imagery consistently see 50-70% increases in virtual tour engagement and 40% higher conversion rates from inquiry to membership. By visually communicating the community vibe, amenity quality, and professional environment, we help operators attract the right members and justify premium pricing in competitive markets."
    />
  );
}
