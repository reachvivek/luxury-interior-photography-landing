import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function HomeOfficesPage() {
  return (
    <SubcategoryPage
      mainCategory="Residential"
      subcategoryTitle="Home Offices"
      description="Inspiring home office photography that showcases productive and stylish workspaces, from minimalist setups to executive home offices."
      heroImage="/images/residential/home-offices/contemporary-office-space.jpg"
      galleryImages={[
        {
          src: "/images/residential/home-offices/contemporary-office-space.jpg",
          alt: "Contemporary home office space",
        },
        {
          src: "/images/residential/home-offices/modern-workspace-window-seating.jpg",
          alt: "Home office with window seating",
        },
        {
          src: "/images/residential/home-offices/home-office-storage-design.jpg",
          alt: "Home office with storage design",
        },
        {
          src: "/images/residential/penthouses/penthouse-interior-4.jpg",
          alt: "Executive home office setup",
        },
        {
          src: "/images/commercial/coworking-spaces/modern-workspace-lounge-seating.jpg",
          alt: "Modern workspace design",
        },
        {
          src: "/images/commercial/coworking-spaces/cofiesto-cafe-window-seating.jpg",
          alt: "Compact home office with window view",
        },
      ]}
      approachTitle="Specialized Approach for Workspace Photography"
      approachDescription="Home office photography requires the same professional attention to color palettes and lighting atmosphere as other residential spaces. We use additional artificial light with varying temperatures to create professional, attractive images that showcase both functionality and design. Each workspace has unique characteristics—whether minimalist modern or executive traditional—and demands specific technical and lighting approaches to properly convey its value as part of premium residential properties."
      processTitle="Technical Excellence for Workspace Capture"
      processSteps={[
        "Pre-shoot consultation with detailed technical specifications for color balancing, line treatment, and style preferences aligned with the overall property marketing.",
        "Strategic use of external light sources to create attractive interior tones that highlight workspace comfort, functionality, and integration with the residential environment.",
        "Diverse lens selection to capture volume and depth while paying attention to quality details—custom furniture, premium materials, technology integration, and design elements.",
        "Comprehensive shooting including wide interior shots showing workspace integration, detail captures of functional features, and proper representation of natural light advantages.",
        "Professional space preparation with strategic arrangement to create attractive compositions that demonstrate both professional capability and residential comfort."
      ]}
      impactTitle="Fast, Professional Service"
      impactDescription="Our home office photography delivers quality results efficiently. We provide free consultations to understand your specific needs, quickly prepare work plans with clear timelines and examples, and deliver images that effectively showcase this valuable feature of modern residential properties. The combination of technical quality, reasonable pricing, and fast delivery makes our service ideal for property marketing."
    />
  );
}
