"use client";

import { useEffect, useState, useRef } from "react";
import ParallaxSpaceBackground from "@/app/components/ParallaxSpaceBackground";

const sentences = [
  [
    { text: "We", weight: "font-semibold", color: "text-white" },
    { text: "Are", weight: "font-semibold", color: "text-white" },
    { text: "XENTRO", weight: "font-bold", color: "text-[#2b40f6]" },
  ],
  [
    { text: "India's", weight: "font-semibold", color: "text-white" },
    { text: "First", weight: "font-semibold", color: "text-white" },
    { text: "Digital", weight: "font-bold", color: "text-[#2b40f6]" },
    { text: "Incubator", weight: "font-bold", color: "text-[#2b40f6]" },
  ],
  [
    { text: "For", weight: "font-semibold", color: "text-white" },
    { text: "Student", weight: "font-bold", color: "text-[#2b40f6]" },
    { text: "Founders", weight: "font-bold", color: "text-[#2b40f6]" },
  ],
  [
    { text: "Turn", weight: "font-semibold", color: "text-white" },
    { text: "Ideas", weight: "font-semibold", color: "text-white" },
    { text: "Into", weight: "font-semibold", color: "text-white" },
    { text: "Impact", weight: "font-bold", color: "text-[#2b40f6]" },
  ],
  [
    { text: "Learn", weight: "font-bold", color: "text-[#2b40f6]" },
    { text: "Build", weight: "font-bold", color: "text-[#2b40f6]" },
    { text: "Launch", weight: "font-bold", color: "text-[#2b40f6]" },
  ],
];

function DissolveWord({
  word,
  delay,
  phase,
  dissolveOutDelay,
}: {
  word: { text: string; weight: string; color: string };
  delay: number;
  phase: "hidden" | "appearing" | "visible" | "dissolving";
  dissolveOutDelay: number;
}) {
  const [localPhase, setLocalPhase] = useState<"hidden" | "visible" | "dissolving">("hidden");

  useEffect(() => {
    if (phase === "appearing") {
      const showTimer = setTimeout(() => setLocalPhase("visible"), delay);
      return () => clearTimeout(showTimer);
    }

    if (phase === "dissolving") {
      const hideTimer = setTimeout(() => setLocalPhase("dissolving"), dissolveOutDelay);
      return () => clearTimeout(hideTimer);
    }

    if (phase === "hidden") {
      const resetTimer = setTimeout(() => setLocalPhase("hidden"), 0);
      return () => clearTimeout(resetTimer);
    }
  }, [phase, delay, dissolveOutDelay]);

  return (
    <span
      className={`inline-block transition-all duration-700 ease-out ${word.weight} ${word.color} ${
        localPhase === "visible"
          ? "opacity-100 blur-0 scale-100"
          : localPhase === "dissolving"
          ? "opacity-0 blur-md scale-95"
          : "opacity-0 blur-sm scale-105"
      }`}
    >
      {word.text}
    </span>
  );
}

// Planet horizon orb component with subtle mouse reaction
function SpotlightOrb({ mousePos }: { mousePos: { x: number; y: number } }) {
  const orbRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!orbRef.current || (mousePos.x === 0 && mousePos.y === 0)) return;
    
    const rect = orbRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = (mousePos.x - centerX) / (window.innerWidth / 2);
    const dy = (mousePos.y - centerY) / (window.innerHeight / 2);
    
    setOffset({ 
      x: dx * 8, 
      y: dy * 5 
    });
  }, [mousePos]);

  return (
    <div
      ref={orbRef}
      className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] flex justify-center"
      style={{ maxWidth: '100vw' }}
    >
      {/* Sun/Starburst Glow - Behind the planet */}
      <div 
        className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[120vw] h-[500px] z-0 transition-transform duration-300 ease-out"
        style={{
            transform: `translateX(${offset.x * 3}px)`,
            background: `
                radial-gradient(circle at 50% 100%, 
                rgba(255, 255, 255, 1) 0%, 
                rgba(255, 230, 200, 0.8) 4%, 
                rgba(100, 200, 255, 0.4) 12%, 
                rgba(30, 80, 180, 0.2) 30%, 
                transparent 60%)
            `,
            filter: 'blur(25px)',
            mixBlendMode: 'screen',
            opacity: 0.9
        }}
      />

      {/* Atmospheric Outer Glow (The blue haze above horizon) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[250vw] h-[250vw] rounded-full z-10"
        style={{
            background: 'transparent',
            boxShadow: `
                0 -4px 20px rgba(100, 200, 255, 0.5),
                0 -15px 50px rgba(50, 150, 255, 0.3),
                0 -50px 120px rgba(20, 80, 200, 0.2)
            `
        }}
      />

      {/* The Planet Body (Silhouette) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[250vw] h-[250vw] rounded-full z-20 bg-black"
        style={{ 
          // The sharp thin blue line is created by this inset shadow
          boxShadow: `
            inset 0 2px 3px rgba(255, 255, 255, 0.95),
            inset 0 5px 10px rgba(120, 220, 255, 0.8),
            inset 0 15px 30px rgba(40, 120, 220, 0.6),
            inset 0 40px 80px rgba(10, 40, 100, 0.4)
          `
        }}
      />
    </div>
  );
}

export default function HeroSection() {
  const [animationPhase, setAnimationPhase] = useState<"hidden" | "appearing" | "visible" | "dissolving">("hidden");
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [introDone, setIntroDone] = useState(false);
  const [textReady, setTextReady] = useState(false);

  // Track mouse position for spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const currentWords = sentences[currentSentenceIndex];

  useEffect(() => {
    if (!introDone) return;
    const t = setTimeout(() => setTextReady(true), 650);
    return () => clearTimeout(t);
  }, [introDone]);

  useEffect(() => {
    if (!textReady) return;

    // Animation cycle timings
    const maxWords = Math.max(...sentences.map(s => s.length));
    const appearDuration = maxWords * 300; // Faster word appearance
    const visibleDuration = 3000; // Stay visible for 3 seconds
    const dissolveDuration = maxWords * 350; // Faster dissolve
    const hiddenDuration = 1000; // 1 second gap before next

    const runCycle = () => {
      // Phase 1: Start appearing
      setAnimationPhase("appearing");

      // Phase 2: All visible, wait 5 seconds
      setTimeout(() => {
        setAnimationPhase("visible");
      }, appearDuration);

      // Phase 3: Start dissolving after 5 seconds visible
      setTimeout(() => {
        setAnimationPhase("dissolving");
      }, appearDuration + visibleDuration);

      // Phase 4: All hidden, move to next sentence
      setTimeout(() => {
        setAnimationPhase("hidden");
        setCurrentSentenceIndex((prev) => (prev + 1) % sentences.length);
      }, appearDuration + visibleDuration + dissolveDuration);
    };

    // Start first cycle
    runCycle();

    // Set up loop
    const totalCycleDuration = appearDuration + visibleDuration + dissolveDuration + hiddenDuration;
    const interval = setInterval(runCycle, totalCycleDuration);

    // Show scroll indicator after first cycle
    const scrollTimer = setTimeout(() => setShowScroll(true), appearDuration + 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(scrollTimer);
    };
  }, [currentSentenceIndex, textReady]);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black pb-60">
      <ParallaxSpaceBackground introMs={2000} settleMs={700} onIntroComplete={() => setIntroDone(true)} />

      {/* Planet horizon orb - positioned below the text */}
      <div
        className={`absolute bottom-[-2500px] sm:bottom-[-350px] lg:bottom-[-450px] left-0 right-0 z-2 will-change-transform transition-[transform,opacity] duration-1000 ease-out ${
          introDone ? "translate-y-0 opacity-100" : "translate-y-[70vh] opacity-0"
        }`}
      >
        <SpotlightOrb mousePos={mousePos} />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center px-4 pt-16 sm:pt-20 lg:pt-24 transition-opacity duration-700 ${
          textReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight">
          <span className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 md:gap-6">
            {currentWords.map((word, index) => (
              <DissolveWord
                key={`${currentSentenceIndex}-${word.text}-${index}`}
                word={word}
                delay={index * 300}
                phase={animationPhase}
                dissolveOutDelay={index * 350}
              />
            ))}
          </span>
        </h1>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 transition-all duration-1000 z-10 ${
          showScroll ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span className="text-xs uppercase tracking-wider">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-gray-400 to-transparent" />
      </div>

      {/* Bottom edge glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/50 to-transparent z-4" />
    </section>
  );
}
