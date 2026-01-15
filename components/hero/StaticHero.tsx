import HeroTemplate from "@/components/shared/HeroTemplate";

interface StaticHeroProps {
  imageSrc: string;
  imageAlt: string;
  category: string;
  title: string;
  description: string;
}

export default function StaticHero({
  imageSrc,
  imageAlt,
  category,
  title,
  description,
}: StaticHeroProps) {
  return (
    <HeroTemplate
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      category={category}
      title={title}
      description={description}
    />
  );
}
