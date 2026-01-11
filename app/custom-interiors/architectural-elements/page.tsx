import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function ArchitecturalElementsPage() {
  return (
    <SubcategoryPage
      mainCategory="Custom Interiors"
      subcategoryTitle="Architectural Elements"
      description="Detailed photography capturing unique architectural features, from custom staircases and columns to decorative ceilings and structural design elements."
      heroImage="/images/custom-interiors/architectural-elements/resort-archway-night.jpg"
      approachTitle="Celebrating Architectural Craftsmanship"
      approachDescription="Nashray's architectural element photography honors the artistry and engineering behind bespoke design features. From hand-carved moldings to contemporary geometric staircases, we capture the details that define architectural excellence. Our approach emphasizes texture, scale, and the interplay of light and shadow that brings structural elements to life, creating portfolio-worthy images for architects, designers, and craftspeople who take pride in exceptional execution."
      processTitle="Precision Detail Documentation"
      processSteps={[
        "Collaborative planning with architects and designers to identify signature elements and optimal shooting angles",
        "Controlled lighting setups that enhance three-dimensional form, texture, and material quality",
        "Multiple perspectives - wide establishing shots showing integration, and macro details revealing craftsmanship",
        "Technical photography capturing structural innovation, material junctions, and construction precision",
        "Specialized post-production maintaining architectural accuracy while enhancing visual drama and detail clarity"
      ]}
      impactTitle="Portfolio Excellence That Wins Projects"
      impactDescription="Our architectural element photography elevates design portfolios and marketing materials, helping architects and craftspeople showcase their expertise to high-value clients. These images become powerful sales tools - demonstrating technical capability, design innovation, and attention to quality that justifies premium pricing. Clients report that Nashray's detailed architectural photography helps them win 30-45% more bespoke commissions by clearly communicating their mastery of complex design challenges."
      galleryImages={[
        {
          src: "/images/custom-interiors/architectural-elements/resort-archway-night.jpg",
          alt: "Resort archway at night",
        },
        {
          src: "/images/custom-interiors/architectural-elements/arched-poolside-view.jpg",
          alt: "Arched poolside view",
        },
        {
          src: "/images/custom-interiors/architectural-elements/luxury-ceiling-detail.jpg",
          alt: "Luxury ceiling detail",
        },
        {
          src: "/images/custom-interiors/architectural-elements/ornate-bathroom-ceiling.jpg",
          alt: "Ornate bathroom ceiling",
        },
        {
          src: "/images/custom/architectural-elements/pool-area-cityscape-view.jpg",
          alt: "Pool area with cityscape architectural view",
        },
        {
          src: "/images/custom/architectural-elements/flame-towers-night-illuminated.jpg",
          alt: "Architectural night illumination",
        },
      ]}
    />
  );
}
