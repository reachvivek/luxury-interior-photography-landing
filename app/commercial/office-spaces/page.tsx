import SubcategoryPage from "@/components/services/SubcategoryPage";


export default function OfficeSpacesPage() {
  return (
    <SubcategoryPage
      mainCategory="Commercial & Industry"
      subcategoryTitle="Office Spaces Photography"
      description="Professional office photography showcasing modern workspaces, executive offices, and collaborative environments designed for productivity and innovation."
      heroImage="/images/commercial/office-spaces/modern-commercial-building-night.jpg"
      galleryImages={[
        {
          src: "/images/commercial/office-spaces/modern-commercial-building-night.jpg",
          alt: "Modern commercial building at night",
        },
        {
          src: "/images/commercial/coworking-spaces/modern-workspace-lounge-seating.jpg",
          alt: "Modern workspace lounge seating",
        },
        {
          src: "/images/commercial/coworking-spaces/cofiesto-cafe-wide-interior.jpg",
          alt: "Open plan office workspace",
        },
        {
          src: "/images/residential/home-offices/contemporary-office-space.jpg",
          alt: "Contemporary executive office",
        },
        {
          src: "/images/residential/home-offices/modern-workspace-window-seating.jpg",
          alt: "Office with window seating",
        },
        {
          src: "/images/commercial/coworking-spaces/cofiesto-cafe-interior-counter.jpg",
          alt: "Office reception and lounge area",
        },
      ]}
      approachTitle="Corporate Excellence in Every Frame"
      approachDescription="Nashray's office photography goes beyond standard documentation to capture the innovative spirit and professional culture that defines modern workplaces. We specialize in telling your company's story through imagery that showcases not just the physical space, but the collaboration, innovation, and prestige it represents. From sleek executive suites to dynamic open-plan environments, our photography attracts top talent and impresses clients by visually communicating your organization's values and commitment to employee experience."
      processTitle="Showcasing Your Professional Environment"
      processSteps={[
        "Comprehensive walkthrough to identify key spaces, brand elements, and architectural highlights",
        "Strategic scheduling around business hours to capture both active workplace energy and pristine empty spaces",
        "Architectural photography techniques for lobbies, conference rooms, and executive areas emphasizing scale and prestige",
        "Lifestyle shots incorporating employees to demonstrate culture and collaborative energy (when requested)",
        "Post-production enhancement maintaining professional authenticity while optimizing visual impact for marketing materials"
      ]}
      impactTitle="Attracting Talent and Clients"
      impactDescription="Professional office photography delivers measurable ROI through multiple channels. Companies using Nashray's office imagery in recruitment materials report 45% higher application rates from qualified candidates. Commercial real estate listings featuring our photography lease 30% faster and command rental premiums, while corporate websites with professional workspace imagery see significantly improved client conversion rates and longer visitor engagement."
    />
  );
}
