import SubcategoryPage from "@/components/services/SubcategoryPage";


export default function RestaurantsPage() {
  return (
    <SubcategoryPage
      mainCategory="Hotels & Hospitality"
      subcategoryTitle="Restaurants Photography"
      description="Stunning restaurant photography that captures the ambiance, design, and culinary atmosphere of fine dining establishments and casual eateries."
      heroImage="/images/hospitality/restaurants/salt-restaurant-outdoor-terrace-1.jpg"
      approachTitle="Where Ambiance Meets Appetite"
      approachDescription="Nashray's restaurant photography goes beyond capturing beautiful interiors - we create visual invitations that make diners crave the experience. Understanding that restaurants sell atmosphere as much as cuisine, our approach emphasizes mood lighting, intimate table settings, and the unique personality that defines each establishment. From Michelin-starred fine dining to trendy casual eateries, we capture the sensory experience that drives reservations and social media buzz."
      processTitle="The Full Dining Experience"
      processSteps={[
        "Comprehensive venue walkthrough during service hours to understand flow, lighting transitions, and signature design elements",
        "Strategic shooting during golden hour, twilight, and evening service to capture ambiance at its peak",
        "Focus on hero spaces - bar areas, outdoor terraces, private dining rooms - that define your restaurant's unique appeal",
        "Detail shots of table settings, lighting fixtures, and architectural elements that convey attention to quality",
        "Color grading that enhances warmth and appetite appeal while maintaining authentic representation of your brand"
      ]}
      impactTitle="Driving Bookings and Social Engagement"
      impactDescription="Our restaurant photography transforms marketing materials into powerful booking drivers. Restaurants featuring Nashray's imagery see 60-80% increases in social media engagement, with images regularly shared by diners and influencers. More importantly, these visuals translate to measurable business results - 25-40% increases in online reservations and enhanced ability to command premium pricing for special events and private bookings."
      galleryImages={[
        {
          src: "/images/hospitality/restaurants/salt-restaurant-outdoor-terrace-1.jpg",
          alt: "Salt restaurant outdoor terrace",
        },
        {
          src: "/images/hospitality/restaurants/salt-restaurant-terrace-view.jpg",
          alt: "Salt restaurant terrace view",
        },
        {
          src: "/images/hospitality/restaurants/restaurant-dining-gallery.jpg",
          alt: "Restaurant dining gallery",
        },
        {
          src: "/images/hospitality/restaurants/colorful-restaurant-interior.jpg",
          alt: "Colorful restaurant interior",
        },
        {
          src: "/images/hospitality/restaurants/modern-cafe-interior-1.jpg",
          alt: "Modern cafe interior",
        },
        {
          src: "/images/hospitality/restaurants/minimalist-cafe-design.jpg",
          alt: "Minimalist cafe design",
        },
      ]}
    />
  );
}
