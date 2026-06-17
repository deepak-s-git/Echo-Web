import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import TimelineShowcase from "@/components/TimelineShowcase";
import MenuBarSection from "@/components/MenuBarSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <TrustBar />
        <Features />
        <HowItWorks />
        <TimelineShowcase />
        <MenuBarSection />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
