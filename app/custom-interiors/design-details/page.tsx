import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function DesignDetailsPage() {
  return (
    <SubcategoryPage
      mainCategory="Custom Interiors"
      subcategoryTitle="Design Details"
      description="Artistic close-up photography of design elements that make spaces unique, from hardware and fixtures to decorative accents and finishing touches."
      heroImage="/images/custom-interiors/design-details/gold-tableware-display.jpg"
      galleryImages={[
        {
          src: "/images/custom-interiors/design-details/gold-tableware-display.jpg",
          alt: "Gold tableware display",
        },
        {
          src: "/images/custom-interiors/design-details/decorative-table-setting.jpg",
          alt: "Decorative table setting",
        },
        {
          src: "/images/custom-interiors/design-details/luxury-serving-detail.jpg",
          alt: "Luxury serving detail",
        },
        {
          src: "/images/custom-interiors/design-details/custom-drapery-detail.jpg",
          alt: "Custom drapery detail",
        },
        {
          src: "/images/custom/design-details/luxury-chandelier-interior.jpg",
          alt: "Luxury chandelier interior",
        },
        {
          src: "/images/custom/design-details/art-gallery-gold-framed-artwork.jpg",
          alt: "Gold framed artwork detail",
        },
      ]}
    />
  );
}
