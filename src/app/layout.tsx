import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neon Arcade | Private Arcade Parties & Event Venue in Sacramento CA",
  description:
    "Book Neon Arcade for private parties, corporate events, and birthday buyouts. Classic arcade cabinets, dedicated party hosts, and fully catered packages in Sacramento, CA.",
  keywords: [
    "arcade party venue Sacramento",
    "private arcade rental",
    "birthday party arcade Sacramento",
    "retro arcade events California",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["EntertainmentBusiness", "EventVenue"],
  name: "Neon Arcade",
  description:
    "Private arcade party venue with classic cabinets, dedicated hosts, and catered packages in Sacramento, CA.",
  url: "https://neonarcade.com",
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
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-arcade-bg text-arcade-white">{children}</body>
    </html>
  );
}
