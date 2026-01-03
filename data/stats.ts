import { StatItem } from "@/types";

export const STATS_CONFIG = {
  projects: 150,
  experience: 8,
  properties: 200,
  satisfaction: 98,
};

export const stats: StatItem[] = [
  {
    label: "Projects Completed",
    value: STATS_CONFIG.projects,
    suffix: "+",
  },
  {
    label: "Years Experience",
    value: STATS_CONFIG.experience,
    suffix: "+",
  },
  {
    label: "Properties Photographed",
    value: STATS_CONFIG.properties,
    suffix: "+",
  },
  {
    label: "Client Satisfaction",
    value: STATS_CONFIG.satisfaction,
    suffix: "%",
  },
];
