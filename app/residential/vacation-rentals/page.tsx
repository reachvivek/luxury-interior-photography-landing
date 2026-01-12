import SubcategoryPage from "@/components/services/SubcategoryPage";


export default function VacationRentalsPage() {
  return (
    <SubcategoryPage
      mainCategory="Residential"
      subcategoryTitle="Vacation Rentals Photography"
      description="Specialized photography for Airbnb and vacation rental properties that drives bookings, showcasing lifestyle amenities, location highlights, and guest experiences that convert browsers into bookers."
      heroImage="/images/residential/villas/luxury-villa-patio-view.jpg"
      approachTitle="Booking-Driven Photography for Short-Term Rentals"
      approachDescription="Vacation rental photography differs fundamentally from traditional real estate photography - it sells experiences, not just spaces. Nashray understands what drives Airbnb and vacation rental bookings: lifestyle imagery showing how guests will live, comprehensive amenity coverage demonstrating value, location context highlighting convenience, and aspirational moments that create emotional connections. Our photography answers the question 'What will my stay be like?' before guests even arrive, directly impacting your booking rates and nightly rates."
      processTitle="Complete Coverage for Maximum Bookings"
      processSteps={[
        "Strategic shot list development covering all listing essentials: hero images, room details, amenities, outdoor spaces, views, neighborhood context, and unique features that differentiate your property.",
        "Lifestyle-focused composition showing spaces in use - dining areas set for meals, living rooms arranged for relaxation, bedrooms styled for comfort - helping potential guests envision their stay.",
        "Comprehensive amenity documentation capturing everything guests search for: fully-equipped kitchens, entertainment systems, work-from-home setups, pools, gyms, parking, and special features.",
        "Multiple lighting scenarios including natural daylight, golden hour exteriors, and evening ambiance shots that showcase different moods and 24-hour appeal of your property.",
        "Platform-optimized delivery with images sized and formatted specifically for Airbnb, Booking.com, and vacation rental sites - including vertical shots for mobile browsing where 80% of bookings originate."
      ]}
      impactTitle="Proven ROI for Property Owners and Managers"
      impactDescription="Professional vacation rental photography delivers measurable returns. Properties using Nashray's imagery report 40-65% increases in booking inquiries, 25-35% higher nightly rates supported by premium positioning, and 50% reduction in time-to-booking as quality visuals build immediate guest confidence. For property managers handling multiple listings, our efficient workflow and consistent quality across portfolios create a professional brand that commands premium positioning on all platforms. Investment in professional photography typically returns 300-500% in the first year through increased bookings and rate optimization."
      galleryImages={[
        {
          src: "/images/residential/villas/luxury-villa-patio-view.jpg",
          alt: "Luxury villa patio with outdoor living",
        },
        {
          src: "/images/residential/villas/luxury-villa-grand-entrance.jpg",
          alt: "Vacation rental grand entrance",
        },
        {
          src: "/images/residential/penthouses/modern-penthouse-living-room.jpg",
          alt: "Modern vacation rental living space",
        },
        {
          src: "/images/residential/villas/luxury-villa-master-bedroom.jpg",
          alt: "Luxury vacation rental bedroom",
        },
        {
          src: "/images/residential/penthouses/penthouse-bedroom-cityview.jpg",
          alt: "Vacation rental with city views",
        },
        {
          src: "/images/residential/villas/luxury-villa-staircase.jpg",
          alt: "Elegant vacation property interior",
        },
        {
          src: "/images/residential/penthouses/penthouse-bathroom-skyline.jpg",
          alt: "Luxury vacation rental bathroom",
        },
      ]}
    />
  );
}
