import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import BentoSection from "@/components/BentoSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#020617]">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <BentoSection />
      <Footer />
    </main>
  );
}
