import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function PenthousesPage() {
  return (
    <SubcategoryPage
      mainCategory="Residential"
      subcategoryTitle="Penthouses"
      description="Capturing the pinnacle of luxury living with breathtaking penthouse interiors featuring panoramic views, sophisticated design, and premium finishes."
      heroImage="/images/residential/penthouses/penthouse-interior-1.jpg"
      approachTitle="Elevating Sky-High Luxury"
      approachDescription="Penthouse photography demands a unique perspective—capturing the seamless blend of interior sophistication and breathtaking cityscape views. I specialize in showcasing how these elevated spaces command Dubai's skyline, emphasizing floor-to-ceiling windows, premium finishes, and the exclusive lifestyle of high-rise living. Every shot is composed to convey both intimacy and grandeur, making potential buyers feel the prestige of owning the sky."
      processTitle="Precision at Every Level"
      processSteps={[
        "Detailed space planning to identify key architectural features, view corridors, and unique selling points that set the penthouse apart.",
        "Twilight and golden hour shoots to capture stunning cityscape views, interior ambiance, and the magical interplay of natural and city lights.",
        "Advanced HDR techniques to perfectly balance bright window views with rich interior detail, avoiding blown-out skies or dark rooms.",
        "Stylized composition highlighting luxury amenities—private terraces, wine cellars, smart home features, and bespoke design elements.",
        "Curated image selection and retouching to create a cohesive visual story that positions the property among Dubai's most coveted residences."
      ]}
      impactTitle="Setting New Standards"
      impactDescription="My penthouse photography transforms listings into aspirational showcases that command attention from ultra-high-net-worth individuals. Clients experience 40-60% faster engagement rates, with images that dominate luxury property portals and social media. By capturing the essence of elevated living, these visuals don't just show a home—they sell a lifestyle."
      galleryImages={[
        {
          src: "/images/residential/penthouses/penthouse-interior-1.jpg",
          alt: "Luxury penthouse interior",
        },
        {
          src: "/images/residential/penthouses/penthouse-interior-2.jpg",
          alt: "Modern penthouse living space",
        },
        {
          src: "/images/residential/penthouses/penthouse-interior-3.jpg",
          alt: "Penthouse with city views",
        },
        {
          src: "/images/residential/penthouses/modern-penthouse-living-room.jpg",
          alt: "Modern penthouse living room",
        },
        {
          src: "/images/residential/penthouses/penthouse-bathroom-skyline.jpg",
          alt: "Penthouse bathroom with skyline view",
        },
        {
          src: "/images/residential/penthouses/penthouse-bedroom-cityview.jpg",
          alt: "Penthouse bedroom city view",
        },
      ]}
    />
  );
}
