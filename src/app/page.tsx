import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesIntegrationsSection from "@/components/FeaturesIntegrationsSection";
import FeaturesWheelSection from "@/components/FeaturesWheelSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#020617]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesIntegrationsSection />
      <FeaturesWheelSection />
      <Footer />
    </main>
  );
}