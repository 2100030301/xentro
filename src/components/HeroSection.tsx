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

  const lightX = 50 + offset.x * 1.2;
  const lightY = 6 + offset.y * 0.6;
  const bandMask =
    "radial-gradient(ellipse 70% 18% at 50% 0%, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 55%, rgba(255,255,255,0) 82%)";

  return (
    <div
      ref={orbRef}
      className="relative w-screen h-[500px] sm:h-[600px] lg:h-[700px]"
      style={{ maxWidth: '100vw' }}
    >
      {/* Planet body - large curved surface */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[250vw] h-[250vw] rounded-full"
        style={{ 
          background: `
            radial-gradient(circle at ${lightX}% ${lightY}%, rgba(70, 150, 255, 0.22) 0%, rgba(25, 60, 110, 0.18) 22%, rgba(0, 0, 0, 0) 58%),
            radial-gradient(circle at 50% 0%, #0b182b 0%, #050c16 20%, #02050b 42%, #000000 70%)
          `,
        }}
      />

      {/* Terminator / curvature shading */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[250vw] h-[250vw] rounded-full opacity-80"
        style={{
          background: `radial-gradient(circle at ${lightX + 10}% ${lightY + 6}%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.72) 62%, rgba(0,0,0,0.92) 100%)`,
          mixBlendMode: "multiply",
        }}
      />
      
      {/* Surface texture - subtle blue variations */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[250vw] h-[250vw] rounded-full opacity-40"
        style={{ 
          background: `
            radial-gradient(ellipse 30% 8% at ${45 + offset.x * 0.5}% 3%, rgba(80, 130, 180, 0.3) 0%, transparent 100%),
            radial-gradient(ellipse 25% 6% at ${55 + offset.x * 0.3}% 5%, rgba(60, 110, 160, 0.25) 0%, transparent 100%),
            radial-gradient(ellipse 35% 10% at ${50 + offset.x * 0.2}% 8%, rgba(50, 100, 150, 0.2) 0%, transparent 100%)
          `,
          WebkitMaskImage: bandMask,
          maskImage: bandMask,
        }}
      />

      {/* Cloud / haze band (masked to the horizon area) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[250vw] h-[250vw] rounded-full opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 24% 6% at ${40 + offset.x * 0.6}% 4.4%, rgba(210, 235, 255, 0.18) 0%, transparent 78%),
            radial-gradient(ellipse 20% 5% at ${58 + offset.x * 0.45}% 5.6%, rgba(190, 220, 255, 0.16) 0%, transparent 75%),
            radial-gradient(ellipse 28% 7% at ${50 + offset.x * 0.35}% 7.2%, rgba(170, 210, 255, 0.12) 0%, transparent 76%)
          `,
          filter: "blur(10px)",
          mixBlendMode: "screen",
          WebkitMaskImage: bandMask,
          maskImage: bandMask,
        }}
      />

      {/* Specular highlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[250vw] h-[250vw] rounded-full opacity-60"
        style={{
          background: `radial-gradient(ellipse 18% 5% at ${46 + offset.x * 0.7}% 3.2%, rgba(200, 235, 255, 0.22) 0%, rgba(140, 200, 255, 0.08) 28%, transparent 75%)`,
          filter: "blur(6px)",
          mixBlendMode: "screen",
          WebkitMaskImage: bandMask,
          maskImage: bandMask,
        }}
      />
      
      {/* City lights */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[250vw] h-[250vw] rounded-full opacity-50"
        style={{ 
          background: `
            radial-gradient(ellipse 1.5% 0.4% at 42% 4%, rgba(255, 200, 100, 0.7) 0%, transparent 100%),
            radial-gradient(ellipse 2% 0.5% at 58% 5%, rgba(255, 220, 150, 0.6) 0%, transparent 100%),
            radial-gradient(ellipse 1% 0.3% at 48% 6%, rgba(255, 180, 80, 0.5) 0%, transparent 100%),
            radial-gradient(ellipse 1.8% 0.4% at 63% 4.5%, rgba(255, 200, 120, 0.6) 0%, transparent 100%),
            radial-gradient(ellipse 1.2% 0.3% at 38% 5.5%, rgba(255, 210, 140, 0.5) 0%, transparent 100%)
          `,
          filter: "blur(0.4px)",
          mixBlendMode: "screen",
          WebkitMaskImage: bandMask,
          maskImage: bandMask,
        }}
      />

      {/* Atmospheric glow on the curved edge */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[250vw] h-[250vw] rounded-full"
        style={{ 
          boxShadow: `
            inset 0 14px 120px rgba(120, 200, 255, 0.08),
            inset 0 6px 55px rgba(90, 170, 255, 0.12),
            inset 0 2px 18px rgba(140, 215, 255, 0.16),
            0 -18px 90px rgba(70, 150, 255, 0.16),
            0 -10px 55px rgba(90, 175, 255, 0.20),
            0 -5px 28px rgba(120, 200, 255, 0.22),
            0 -2px 14px rgba(150, 225, 255, 0.24)
          `,
        }}
      />
      
      {/* Soft curved glow following the planet edge */}
      <div 
        className="absolute top-0 left-0 right-0 h-[110px] transition-all duration-700 rounded-b-[55%]"
        style={{ 
          background: `radial-gradient(ellipse 62% 100% at 50% 0%,
            rgba(140, 215, 255, 0.24) 0%,
            rgba(90, 175, 255, 0.14) 28%,
            rgba(60, 130, 230, 0.08) 55%,
            rgba(20, 60, 140, 0.05) 70%,
            transparent 100%
          )`,
          filter: "blur(12px)",
          mixBlendMode: "screen",
          transform: `translate3d(${offset.x * 1.1}px, ${offset.y * 0.8}px, 0)`,
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
        className={`relative z-10 text-center px-4 -mt-24 sm:-mt-32 lg:-mt-40 transition-opacity duration-700 ${
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
