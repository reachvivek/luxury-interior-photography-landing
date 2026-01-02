import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  title: string;
  image: string;
  href: string;
}

export default function CategoryCard({ title, image, href }: CategoryCardProps) {
  return (
    <Link href={href} className="group cursor-pointer relative">
      <div className="bg-[#f5f3f0] rounded-lg overflow-hidden transition-transform duration-300 ease-out group-hover:scale-[1.02] shadow-md">
        <div className="relative aspect-[5/4] bg-stone-200 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="px-6 py-5 bg-[#EBE6E5]">
          <h3 className="text-[24px] font-serif font-medium text-stone-900 text-center">
            {title}
          </h3>
        </div>
      </div>
      {/* Shadow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-full -z-10 opacity-60">
        <div className="relative w-full h-full rounded-lg overflow-hidden" style={{ filter: "blur(20px)", transform: "translateY(15px)" }}>
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>
    </Link>
  );
}
