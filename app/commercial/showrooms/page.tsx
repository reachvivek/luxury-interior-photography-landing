import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function ShowroomsPage() {
  return (
    <SubcategoryPage
      mainCategory="Commercial & Industry"
      subcategoryTitle="Showrooms"
      description="Professional showroom photography showcasing product displays, automotive showrooms, furniture galleries, and design exhibitions in their best light."
      heroImage="/images/residential/villas/luxury-villa-with-porsche.jpg"
      galleryImages={[
        {
          src: "/images/residential/villas/luxury-villa-with-porsche.jpg",
          alt: "Luxury automotive showroom",
        },
        {
          src: "/images/hospitality/hotel-suites/luxury-resort-lobby-entrance.jpg",
          alt: "Modern showroom entrance",
        },
        {
          src: "/images/hospitality/hotel-suites/hotel-lobby-colorful-sofas.jpg",
          alt: "Furniture showroom display",
        },
        {
          src: "/images/custom/custom-furniture/art-gallery-custom-seating.jpg",
          alt: "Design gallery with custom seating",
        },
        {
          src: "/images/commercial/retail-stores/retail-store-product-shelving.jpg",
          alt: "Product display showroom",
        },
        {
          src: "/images/custom/design-details/luxury-chandelier-interior.jpg",
          alt: "Lighting design showroom",
        },
      ]}
      approachTitle="Prestige Products Presented Flawlessly"
      approachDescription="Nashray's showroom photography elevates product presentation to an art form, whether showcasing luxury automobiles, designer furniture, or architectural materials. We understand that showrooms are theater - every display is carefully curated to inspire desire and communicate quality. Our photography captures the aspirational essence of your products while highlighting the immersive brand experience your showroom provides. From dramatic automotive reveals to elegant furniture vignettes, we create imagery that drives qualified buyers through your doors."
      processTitle="Perfecting Product Presentation"
      processSteps={[
        "Detailed planning session to understand featured products, brand positioning, and target clientele",
        "Precision lighting setup that enhances product finishes, textures, and premium details without distortion",
        "Strategic composition emphasizing both individual product excellence and cohesive display design",
        "Multiple perspectives capturing showroom flow, featured installations, and intimate product details",
        "Meticulous post-production ensuring accurate color representation and luxurious visual appeal"
      ]}
      impactTitle="Converting Browsers to Buyers"
      impactDescription="Professional showroom photography accelerates the sales cycle by pre-qualifying prospects and building desire before the first visit. Automotive showrooms using Nashray's imagery report 60% more qualified appointments, while furniture and design showrooms see 45% longer customer dwell time and significantly higher conversion rates. Our photography becomes a powerful sales tool across digital marketing, print catalogs, and social media, establishing your showroom as the premier destination for discerning buyers."
    />
  );
}
