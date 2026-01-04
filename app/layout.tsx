import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const siteUrl = "https://tsurov.com"; // Update with your actual domain
const siteName = "TSUROV";
const siteDescription = "Exceptional interior photography capturing luxury, elegance, and detail. Specializing in residential, hospitality, commercial, and custom interior spaces.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Luxury Interior Photography`,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  keywords: [
    "interior photography",
    "luxury photography",
    "architectural photography",
    "real estate photography",
    "hospitality photography",
    "commercial photography",
    "residential photography",
    "interior design photography",
    "luxury interiors",
    "high-end photography",
    "property photography",
    "hotel photography"
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/logo/1.png", sizes: "any" },
      { url: "/logo/1.png", type: "image/png" },
    ],
    apple: "/logo/1.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} | Luxury Interior Photography`,
    description: siteDescription,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TSUROV - Exceptional Interior Photography",
        type: "image/jpeg",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Luxury Interior Photography`,
    description: siteDescription,
    images: ["/images/og-image.jpg"],
    creator: "@tsurov", // Update with actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: "your-google-verification-code", // Add when available
    // yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Photography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": siteUrl,
    "name": siteName,
    "description": siteDescription,
    "url": siteUrl,
    "logo": `${siteUrl}/logo/tsurov.png`,
    "image": `${siteUrl}/images/og-image.jpg`,
    "priceRange": "$$$",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "serviceType": [
      "Interior Photography",
      "Architectural Photography",
      "Real Estate Photography",
      "Commercial Photography",
      "Hospitality Photography"
    ],
    "knowsAbout": [
      "Interior Photography",
      "Luxury Photography",
      "Architectural Photography",
      "Real Estate Photography"
    ],
    "sameAs": [
      // "https://instagram.com/tsurov", // Add your social media URLs
      // "https://facebook.com/tsurov",
      // "https://linkedin.com/company/tsurov"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${dmSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <Preloader />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
