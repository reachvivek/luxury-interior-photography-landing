// Type definitions for Tsurov Photography

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
}

export interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  category: PortfolioCategory;
  subcategory?: string;
  title?: string;
  location?: string;
  featured?: boolean;
}

export type PortfolioCategory =
  | "residential"
  | "hotels"
  | "commercial"
  | "restrooms"
  | "custom";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  image?: string;
  rating?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  projectType: string;
  message: string;
}

export interface HowItWorksStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface CategorySpace {
  title: string;
  image: string;
  href: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

export interface TrustedByLogo {
  src: string;
  alt: string;
}
