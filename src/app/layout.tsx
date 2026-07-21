import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "Neon Arcade | Private Arcade Parties & Event Venue in Sacramento CA";
const DESCRIPTION =
  "Book Neon Arcade for private parties, corporate events, and birthday buyouts. Classic arcade cabinets, dedicated party hosts, and fully catered packages in Sacramento, CA.";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: TITLE,
    template: "%s | Neon Arcade",
  },
  description: DESCRIPTION,
  keywords: [
    "arcade party venue Sacramento",
    "private arcade rental",
    "birthday party arcade Sacramento",
    "retro arcade events California",
  ],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    siteName: "Neon Arcade",
    locale: "en_US",
    url: "./",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "og-image.png",
        width: 1200,
        height: 630,
        alt: "Neon Arcade — private arcade party venue in Sacramento, CA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "icon.svg",
    apple: "apple-icon.png",
  },
  manifest: "site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["EntertainmentBusiness", "EventVenue"],
  name: "Neon Arcade",
  description:
    "Private arcade party venue with classic cabinets, dedicated hosts, and catered packages in Sacramento, CA.",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "412 Retro Row",
    addressLocality: "Sacramento",
    addressRegion: "CA",
    postalCode: "95814",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.5816,
    longitude: -121.4944,
  },
  openingHours: [
    "Mo-Th 15:00-22:00",
    "Fr 15:00-24:00",
    "Sa 12:00-24:00",
    "Su 12:00-21:00",
  ],
  maximumAttendeeCapacity: 150,
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card",
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "Private Event Hosting",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Dedicated Party Host",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Catering Available",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Parking",
      value: "Adjacent garage on 4th St",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-arcade-bg text-arcade-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded focus:bg-neon-cyan focus:text-arcade-bg focus:font-mono focus:font-bold focus:tracking-widest focus:uppercase focus:text-sm focus:py-3 focus:px-5"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
