import type { Metadata } from "next";
import { Montserrat, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MainSiteOnly } from "@/components/ConditionalLayout";
import Analytics from "@/components/Analytics";
import SessionProvider from "@/components/SessionProvider";
import { ToastProvider } from "@/components/shared/Toast";
import { CONTACT } from "@/data/contact";
import { SEO_CONFIG } from "@/constants/seo";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const { siteUrl, siteName, siteDescription, twitterHandle, locale } = SEO_CONFIG;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Luxury Interior Photography`,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  keywords: [
    "interior photography Dubai",
    "luxury photography Dubai",
    "architectural photography Dubai",
    "real estate photography Dubai",
    "hospitality photography Dubai",
    "commercial photography Dubai",
    "residential photography Dubai",
    "interior design photography Dubai",
    "luxury villas photography Dubai",
    "hotel photography Dubai",
    "restaurant photography Dubai",
    "showroom photography Dubai",
    "property photography UAE",
    "interior photography",
    "luxury interiors",
    "high-end photography",
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
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
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
        alt: "MyVisual.Space - Exceptional Interior Photography",
        type: "image/jpeg",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Luxury Interior Photography`,
    description: siteDescription,
    images: ["/images/og-image.jpg"],
    creator: twitterHandle,
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
    "logo": `${siteUrl}/logo/myvisualspace_logo.png`,
    "image": `${siteUrl}/images/og-image.jpg`,
    "priceRange": "$$$",
    "areaServed": {
      "@type": "Country",
      "name": "United Arab Emirates"
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
      `https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM || "dubai.tsurov"}`,
      `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "971502060674"}`
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
        className={`${montserrat.variable} ${inter.variable} ${cormorantGaramond.variable} antialiased`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <ToastProvider>
            <MainSiteOnly>
              <Preloader />
              <Navigation />
            </MainSiteOnly>
            {children}
            <MainSiteOnly>
              <WhatsAppButton
                phoneNumber={CONTACT.whatsapp.number}
                message="Hi! I'm interested in booking a professional interior photography shoot."
              />
            </MainSiteOnly>
            <Analytics />
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
