import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "interior-photography",
    title: "Interior Photography",
    description: "Professional high-resolution photography capturing the essence and beauty of interior spaces.",
    icon: "camera",
    features: [
      "High-resolution images",
      "HDR photography",
      "Twilight shoots",
      "Professional editing",
    ],
  },
  {
    id: "virtual-tours",
    title: "360° Virtual Tours",
    description: "Immersive virtual tours that let clients explore spaces from anywhere in the world.",
    icon: "360",
    features: [
      "Interactive navigation",
      "4K quality",
      "Mobile compatible",
      "Embedded hotspots",
    ],
  },
  {
    id: "video-walkthroughs",
    title: "Video Walkthroughs",
    description: "Cinematic video tours showcasing spaces with smooth transitions and professional narration.",
    icon: "video",
    features: [
      "4K video quality",
      "Drone footage",
      "Professional editing",
      "Background music",
    ],
  },
  {
    id: "lifestyle-hospitality",
    title: "Lifestyle & Hospitality",
    description: "Specialized photography for hotels, restaurants, and hospitality spaces that tell a story.",
    icon: "hospitality",
    features: [
      "Styled shoots",
      "Lifestyle imagery",
      "Brand storytelling",
      "Social media ready",
    ],
  },
];
