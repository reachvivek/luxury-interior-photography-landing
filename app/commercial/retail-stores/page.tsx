import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function RetailStoresPage() {
  return (
    <SubcategoryPage
      mainCategory="Commercial & Industry"
      subcategoryTitle="Retail Stores"
      description="Captivating retail photography that highlights store layouts, product displays, and shopping experiences from boutiques to flagship stores."
      heroImage="/images/commercial/retail-stores/beauty-salon-interior-1.jpg"
      galleryImages={[
        {
          src: "/images/commercial/retail-stores/beauty-salon-interior-1.jpg",
          alt: "Beauty salon interior",
        },
        {
          src: "/images/commercial/retail-stores/hair-salon-wide-angle.jpg",
          alt: "Hair salon wide angle",
        },
        {
          src: "/images/commercial/retail-stores/salon-workstation-detail.jpg",
          alt: "Salon workstation detail",
        },
        {
          src: "/images/commercial/retail-stores/nail-salon-workspace.jpg",
          alt: "Nail salon workspace",
        },
        {
          src: "/images/commercial/retail-stores/retail-store-product-shelving.jpg",
          alt: "Retail store product shelving",
        },
        {
          src: "/images/commercial/retail-stores/cofiesto-storefront-exterior.jpg",
          alt: "Storefront exterior",
        },
      ]}
      approachTitle="Transforming Browsers into Buyers"
      approachDescription="Nashray's retail photography captures the shopping experience your customers crave before they even walk through the door. We go beyond basic storefront documentation to create compelling visual stories that showcase your merchandising expertise, brand aesthetic, and customer journey. From intimate boutique atmospheres to expansive flagship locations, our images drive foot traffic by conveying the quality, curation, and unique shopping experience that sets your retail space apart in a crowded marketplace."
      processTitle="Showcasing Your Retail Vision"
      processSteps={[
        "Consultation to understand brand identity, target demographics, and key seasonal merchandise displays",
        "Strategic shoot timing to capture optimal lighting and perfectly styled product presentations",
        "Comprehensive coverage including storefront, interior flow, merchandising displays, and detail shots of signature products",
        "Multiple angles emphasizing both the curated aesthetic and the functional shopping experience",
        "Editing that enhances product colors, lighting ambiance, and visual appeal while maintaining authentic representation"
      ]}
      impactTitle="Increasing Foot Traffic and Sales"
      impactDescription="Professional retail photography delivers direct impact on your bottom line. Stores using Nashray's imagery in their marketing materials experience 55% higher engagement on social media and 35% more in-store visits from online discovery. Our photography helps boutiques and specialty retailers compete with e-commerce by showcasing the tactile, experiential advantages of in-person shopping, resulting in higher conversion rates and increased average transaction values."
    />
  );
}
