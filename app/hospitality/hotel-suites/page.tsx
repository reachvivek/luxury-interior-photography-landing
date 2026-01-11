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
      approachTitle="Luxury Hospitality Reimagined"
      approachDescription="Nashray's hotel suite photography transforms rooms into destinations, capturing the indulgent experience that drives bookings and justifies premium rates. We go beyond standard room documentation to showcase the emotional journey guests crave - from the welcoming ambiance of thoughtfully designed spaces to the exquisite details that define five-star hospitality. Whether capturing intimate boutique suites or sprawling presidential accommodations, our imagery tells a story of escape, comfort, and memorable experiences that resonate with luxury travelers worldwide."
      processTitle="Crafting Your Guest Experience Story"
      processSteps={[
        "Detailed briefing to understand your property's unique positioning, signature amenities, and target guest demographics",
        "Strategic timing for optimal natural lighting in suites while capturing atmospheric evening shots of common areas",
        "Comprehensive coverage including suite layouts, bathroom luxury, views, and lifestyle-focused vignettes",
        "Both wide architectural perspectives and intimate detail shots of premium linens, fixtures, and finishing touches",
        "Professional editing that enhances the aspirational quality while maintaining authentic representation of your offerings"
      ]}
      impactTitle="Driving Direct Bookings and Revenue"
      impactDescription="Professional hotel photography directly impacts your revenue per available room. Properties featuring Nashray's imagery see 70% higher engagement on booking platforms and 50% increases in direct website bookings. Our photography reduces dependency on OTA commissions by creating compelling reasons for guests to book directly. Luxury properties using our imagery command 15-25% rate premiums and achieve higher guest satisfaction scores, as expectations align perfectly with the actual experience."
    />
  );
}
