import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#020617]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <Footer />
    </main>
  );
}