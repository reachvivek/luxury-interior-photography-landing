import { Feature } from "@/data/features";

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="relative bg-white border border-stone-200 rounded-lg p-5 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-stone-300 group">
      <div className="relative">
        <div className="text-stone-300 text-4xl md:text-6xl font-serif font-light mb-4 md:mb-6 group-hover:text-stone-400 transition-colors">
          {feature.number}
        </div>
        <div className="h-px w-10 md:w-12 bg-gradient-to-r from-stone-300 to-transparent mb-3 md:mb-5"></div>
        <h3 className="text-base md:text-xl font-serif font-light text-stone-900 mb-2 md:mb-3">
          {feature.title}
        </h3>
        <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
