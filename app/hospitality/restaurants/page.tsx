import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function RestaurantsPage() {
  return (
    <SubcategoryPage
      mainCategory="Hotels & Hospitality"
      subcategoryTitle="Restaurants"
      description="Stunning restaurant photography that captures the ambiance, design, and culinary atmosphere of fine dining establishments and casual eateries."
      heroImage="/images/hospitality/restaurants/salt-restaurant-outdoor-terrace-1.jpg"
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
