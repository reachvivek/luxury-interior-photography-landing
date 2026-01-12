import SubcategoryPage from "@/components/services/SubcategoryPage";


export default function ResortsPage() {
  return (
    <SubcategoryPage
      mainCategory="Hotels & Hospitality"
      subcategoryTitle="Resorts Photography"
      description="Breathtaking resort photography capturing the essence of luxury destinations, from beachfront paradises to mountain retreats, showcasing both grand amenities and intimate guest experiences."
      heroImage="/images/hospitality/hotel-suites/beachfront-resort-architecture.jpg"
      approachTitle="Capturing Paradise and Possibility"
      approachDescription="Resort photography transcends simple documentation - it sells dreams, escapes, and transformative experiences. Nashray captures the complete resort narrative: stunning architecture harmonizing with natural surroundings, world-class amenities that define luxury, and those perfect moments that make destinations unforgettable. From sunrise over infinity pools to sunset dining terraces, we create imagery that drives bookings and positions your resort as the ultimate destination for discerning travelers seeking exceptional experiences."
      processTitle="Comprehensive Resort Coverage"
      processSteps={[
        "Multi-day shooting capturing golden hour magic, day and evening ambiance, seasonal variations, and diverse weather conditions that showcase your resort's year-round appeal",
        "Strategic coverage of signature spaces - grand lobbies, luxury suites, infinity pools, spa facilities, dining venues, beaches, and recreational areas",
        "Lifestyle photography showing guest experiences without staged models, capturing authentic moments that resonate with target demographics",
        "Aerial and elevated perspectives showcasing resort scale, beachfront positioning, surrounding landscapes, and architectural integration with natural beauty",
        "Detail work highlighting luxury finishes, resort amenities, culinary presentations, and those small touches that differentiate five-star properties"
      ]}
      impactTitle="Driving Direct Bookings and Premium Rates"
      impactDescription="Professional resort photography directly impacts revenue by reducing dependency on OTAs, supporting premium pricing strategies, and driving direct bookings. Resorts featuring Nashray's imagery report 45-60% increases in direct website bookings, 30% higher conversion rates, and the ability to command 15-20% rate premiums. Our photography becomes the cornerstone of integrated marketing campaigns across social media, print advertising, and partnership materials that establish your resort as a bucket-list destination."
      galleryImages={[
        {
          src: "/images/hospitality/hotel-suites/beachfront-resort-architecture.jpg",
          alt: "Beachfront resort architecture",
        },
        {
          src: "/images/hospitality/hotel-suites/modern-resort-exterior-sunset.jpg",
          alt: "Modern resort exterior at sunset",
        },
        {
          src: "/images/hospitality/hotel-suites/resort-pool-archway-view.jpg",
          alt: "Resort pool through archway",
        },
        {
          src: "/images/hospitality/event-spaces/lake-resort-panoramic-view-1.jpg",
          alt: "Lake resort panoramic view",
        },
        {
          src: "/images/hospitality/hotel-suites/luxury-resort-lobby-entrance.jpg",
          alt: "Luxury resort lobby entrance",
        },
        {
          src: "/images/hospitality/event-spaces/pool-terrace-evening.jpg",
          alt: "Pool terrace evening ambiance",
        },
      ]}
    />
  );
}
