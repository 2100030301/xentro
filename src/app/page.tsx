import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { CircuitBackground } from "./components/CircuitBackground";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen overflow-hidden">
      <CircuitBackground>
        <div className="w-full">
          <Navbar />
          <HeroSection />
        </div>
      </CircuitBackground>
      <Footer />
    </main>
  );
}
