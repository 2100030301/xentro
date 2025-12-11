import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { CircuitBackground } from "./components/CircuitBackground";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden w-full max-w-full">
      <Navbar />
      <div className="pt-[56px] sm:pt-[64px] lg:pt-[70px] w-full">
        <CircuitBackground>
          <div className="w-full">
            <HeroSection />
          </div>
        </CircuitBackground>
        <Footer />
      </div>
    </main>
  );
}
