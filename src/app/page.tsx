import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PartyPackages from "@/components/PartyPackages";
import EventBooking from "@/components/EventBooking";
import GameCatalog from "@/components/GameCatalog";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { partyPackages, faqItems } from "@/data/arcade";
import { SITE_URL } from "@/lib/site";

const offerCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Neon Arcade Party Packages",
  url: `${SITE_URL}/#packages`,
  itemListElement: partyPackages.map((pkg) => ({
    "@type": "Offer",
    name: pkg.name,
    description: pkg.tagline,
    url: `${SITE_URL}/#packages`,
    priceCurrency: "USD",
    price: pkg.priceFlat > 0 ? pkg.priceFlat : pkg.pricePerGuest,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: pkg.pricePerGuest,
      priceCurrency: "USD",
      unitText: "per guest",
      referenceQuantity: {
        "@type": "QuantitativeValue",
        minValue: pkg.minGuests,
        maxValue: pkg.maxGuests,
      },
    },
    availability: "https://schema.org/InStock",
    itemOffered: {
      "@type": "Service",
      name: pkg.name,
      description: pkg.tagline,
    },
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main id="main-content">
        <Hero />
        <PartyPackages />
        <section id="book" className="py-16 sm:py-24 px-5 sm:px-6 bg-arcade-bg">
          <EventBooking />
        </section>
        <GameCatalog />
        <Gallery />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
