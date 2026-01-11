import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function DesignDetailsPage() {
  return (
    <SubcategoryPage
      mainCategory="Custom Interiors"
      subcategoryTitle="Design Details"
      description="Artistic close-up photography of design elements that make spaces unique, from hardware and fixtures to decorative accents and finishing touches."
      heroImage="/images/custom-interiors/design-details/gold-tableware-display.jpg"
      approachTitle="The Devil Is in the Details"
      approachDescription="Tsurov understands that luxury lives in the details - the weight of a custom door handle, the precision of a lighting fixture, the artistry in decorative hardware, the finishing touches that separate exceptional from ordinary. Our detail photography elevates these elements from functional necessities to design statements, creating a visual language of quality that resonates with clients who expect perfection. These images tell the story of thoughtful design and meticulous execution."
      processTitle="Capturing Refined Excellence"
      processSteps={[
        "Careful identification of signature details that define the space's character and quality level",
        "Artistic lighting that creates drama while revealing the three-dimensional beauty of fixtures, hardware, and accents",
        "Varied perspectives - intimate close-ups revealing craftsmanship and contextual shots showing integration within the design",
        "Styling and composition that presents details as design features worthy of attention and appreciation",
        "Artistic post-production emphasizing the luxury qualities - luster, texture, precision - that justify premium investment"
      ]}
      impactTitle="Completing the Luxury Narrative"
      impactDescription="Our design detail photography provides the finishing touches that luxury marketing demands. Interior designers and luxury brands using these images report that detail shots significantly enhance perceived value - clients who see this level of attention to quality are 40-50% more likely to approve higher budgets and premium specifications. These images become portfolio signatures that demonstrate a commitment to excellence in every aspect of design execution."
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
