import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PartyPackages from "@/components/PartyPackages";
import EventBooking from "@/components/EventBooking";
import GameCatalog from "@/components/GameCatalog";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PartyPackages />
        <section id="book" className="py-24 px-6 bg-arcade-bg">
          <EventBooking />
        </section>
        <section className="bg-arcade-surface">
          <GameCatalog />
        </section>
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
