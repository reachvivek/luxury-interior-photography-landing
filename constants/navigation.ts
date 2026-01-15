export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS = {
  left: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" }, // Now a dropdown with 4 main directions
    { href: "/about", label: "About" },
  ] as NavLink[],
  right: [
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ] as NavLink[],
};

export const FOOTER_LINKS = {
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ] as NavLink[],
  services: [
    { href: "/residential", label: "Residential" },
    { href: "/hospitality", label: "Hospitality" },
    { href: "/commercial", label: "Commercial" },
    { href: "/custom-interiors", label: "Custom Interiors" },
  ] as NavLink[],
};
