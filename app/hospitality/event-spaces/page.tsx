import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function EventSpacesPage() {
  return (
    <SubcategoryPage
      mainCategory="Hotels & Hospitality"
      subcategoryTitle="Event Spaces"
      description="Professional photography of event venues and spaces, showcasing versatile settings for weddings, conferences, and special occasions."
      heroImage="/images/hospitality/event-spaces/beach-wedding-pavilion.jpg"
      approachTitle="Spaces That Inspire Celebrations"
      approachDescription="Nashray captures event spaces in their most aspirational light - showing not just empty venues, but the promise of unforgettable moments. Our photography tells the story of transformation potential, whether it's an intimate wedding, corporate gala, or destination conference. We emphasize versatility, capacity, and the unique atmosphere that makes planners and hosts choose your venue over competitors, capturing both grand scale and intimate details."
      processTitle="Showcasing Every Occasion"
      processSteps={[
        "Multi-configuration shoots showing versatility - ceremony setups, cocktail receptions, banquet configurations, and conference arrangements",
        "Strategic timing to capture natural light advantages, sunset backdrops, and elegant evening ambiance with dramatic lighting",
        "Wide-angle perspectives demonstrating capacity and flow while maintaining the intimate, welcoming feel that attracts bookings",
        "Architectural and landscape integration highlighting unique features - waterfront views, garden settings, or city skylines",
        "Post-production that enhances the 'blank canvas' appeal while showcasing the venue's distinct character and atmosphere"
      ]}
      impactTitle="Converting Inquiries to Bookings"
      impactDescription="Our event space photography directly impacts venue booking rates by helping planners envision their perfect event. Venues showcasing Nashray's imagery report 50-65% increases in qualified inquiries and 35% higher conversion rates from site visits to bookings. By presenting spaces that inspire emotional connections and practical confidence, we help venues command premium pricing and secure high-value corporate contracts and destination weddings."
      galleryImages={[
        {
          src: "/images/hospitality/event-spaces/beach-wedding-pavilion.jpg",
          alt: "Beach wedding pavilion",
        },
        {
          src: "/images/hospitality/event-spaces/lake-resort-panoramic-view-1.jpg",
          alt: "Lake resort panoramic view",
        },
        {
          src: "/images/hospitality/event-spaces/pool-terrace-evening.jpg",
          alt: "Pool terrace evening event space",
        },
        {
          src: "/images/hospitality/event-spaces/resort-event-pathway.jpg",
          alt: "Resort event pathway",
        },
        {
          src: "/images/hospitality/event-spaces/outdoor-patio-courtyard.jpg",
          alt: "Outdoor patio courtyard",
        },
        {
          src: "/images/hospitality/event-spaces/cityscape-sunset-view.jpg",
          alt: "Event space with cityscape sunset view",
        },
      ]}
    />
  );
}
