import SubcategoryPage from "@/components/services/SubcategoryPage";

export default function MaterialsPage() {
  return (
    <SubcategoryPage
      mainCategory="Custom Interiors"
      subcategoryTitle="Material Close-ups"
      description="Detailed macro photography highlighting textures, finishes, and material quality in interior design, from luxurious fabrics to natural stone and exotic woods."
      heroImage="/images/custom-interiors/materials/marble-gold-bathroom.jpg"
      galleryImages={[
        {
          src: "/images/custom-interiors/materials/marble-gold-bathroom.jpg",
          alt: "Marble and gold bathroom materials",
        },
        {
          src: "/images/custom-interiors/materials/luxury-wall-finish.jpg",
          alt: "Luxury wall finish texture",
        },
        {
          src: "/images/custom-interiors/materials/ornate-upholstery-fabric.jpg",
          alt: "Ornate upholstery fabric",
        },
        {
          src: "/images/custom-interiors/materials/white-brick-wall-texture.jpg",
          alt: "White brick wall texture",
        },
        {
          src: "/images/custom-interiors/materials/luxury-drapery-detail.jpg",
          alt: "Luxury drapery material detail",
        },
        {
          src: "/images/custom/material-closeups/material-texture-detail.jpg",
          alt: "Material texture close-up detail",
        },
      ]}
    />
  );
}
