export const CONTACT = {
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP || "971502060674",
    url: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "971502060674"}`,
  },
  instagram: {
    handle: process.env.NEXT_PUBLIC_INSTAGRAM || "dubai.tsurov",
    url: `https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM || "dubai.tsurov"}`,
  },
  designer: {
    name: "Vivek Kumar Singh",
    whatsapp: process.env.NEXT_PUBLIC_DESIGNER_WHATSAPP || "971501480042",
    message: "Hi%20Vivek,%20I%20saw%20your%20work%20on%20the%20Tsurov%20website",
  },
};
