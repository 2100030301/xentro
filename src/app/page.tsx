import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { CircuitBackground } from "./components/CircuitBackground";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <CircuitBackground>
        <div className="w-full">
          <Navbar />
          <HeroSection />
        </div>
      </CircuitBackground>
    </main>
  );
}
