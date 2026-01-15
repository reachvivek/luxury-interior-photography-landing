"use client";

import HeroTemplate from "@/components/shared/HeroTemplate";

interface ServiceHeroProps {
  imageSrc: string;
  category: string;
  title: string;
  description: string;
}

export default function ServiceHero({
  imageSrc,
  category,
  title,
  description,
}: ServiceHeroProps) {
  return (
    <HeroTemplate
      imageSrc={imageSrc}
      imageAlt={`${category} Photography`}
      category={category}
      title={title}
      description={description}
    />
  );
}
