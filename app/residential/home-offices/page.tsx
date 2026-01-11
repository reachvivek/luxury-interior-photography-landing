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
      approachTitle="Where Productivity Meets Inspiration"
      approachDescription="In the era of remote work, Tsurov's home office photography transcends traditional interior shots to capture the perfect balance of professionalism and personal style. We understand that home offices serve dual purposes—they must inspire productivity while reflecting individual personality. Our approach focuses on showcasing ergonomic design, natural lighting advantages, and the seamless integration of work zones into residential spaces, creating images that appeal to both remote professionals and property buyers seeking modern work-from-home solutions."
      processTitle="Crafting Your Productive Haven"
      processSteps={[
        "Detailed assessment of workspace layout, lighting conditions, and functional zones",
        "Strategic decluttering and styling to showcase both professional functionality and aesthetic appeal",
        "Multi-angle compositions highlighting ergonomic features, storage solutions, and natural light sources",
        "Capture of both wide shots showing space integration and detail shots of premium finishes and equipment",
        "Professional editing that emphasizes clarity, focus, and the energizing qualities of a well-designed workspace"
      ]}
      impactTitle="Elevating Work-From-Home Value"
      impactDescription="Our home office photography adds measurable value to residential listings by highlighting one of the most sought-after features in modern homes. Properties featuring professional home office imagery receive 35% more engagement from remote workers and professionals, and homes with dedicated office spaces photographed by Tsurov command price premiums of 8-12% in today's remote-work-driven market."
    />
  );
}
