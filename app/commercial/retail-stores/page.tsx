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
    />
  );
}
