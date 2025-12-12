"use client";

import { useEffect, useState, useRef } from "react";

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
      className="relative w-screen h-[500px] sm:h-[600px] lg:h-[700px]"
      style={{ maxWidth: '100vw' }}
    >
      {/* Planet body - large curved surface */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[250vw] h-[250vw] rounded-full"
        style={{ 
          background: "radial-gradient(circle at 50% 0%, #0c1a2d 0%, #06101c 15%, #030810 30%, #010204 50%, #000000 70%)",
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
        }}
      />

      {/* Atmospheric glow on the curved edge */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[250vw] h-[250vw] rounded-full"
        style={{ 
          boxShadow: `
            inset 0 5px 60px rgba(80, 160, 255, 0.15),
            inset 0 10px 30px rgba(100, 180, 255, 0.18),
            inset 0 2px 15px rgba(120, 200, 255, 0.2),
            0 -15px 60px rgba(60, 140, 255, 0.2),
            0 -8px 40px rgba(80, 170, 255, 0.25),
            0 -4px 20px rgba(100, 190, 255, 0.3),
            0 -2px 10px rgba(140, 210, 255, 0.35)
          `,
        }}
      />
      
      {/* Soft curved glow following the planet edge */}
      <div 
        className="absolute top-0 left-0 right-0 h-[60px] transition-all duration-700 rounded-b-[50%]"
        style={{ 
          background: `radial-gradient(ellipse 60% 100% at 50% 0%, 
            rgba(80, 160, 255, 0.2) 0%,
            rgba(60, 140, 230, 0.12) 30%,
            rgba(40, 100, 180, 0.06) 60%,
            transparent 100%
          )`,
          filter: 'blur(10px)',
        }}
      />
    </div>
  );
}

// Space dust particle component
function SpaceDust({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    color: string;
    trail: Array<{ x: number; y: number }>;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Premium color palette - elegant blues and silvers
    const particleCount = 800;
    const colors = ["#a8c7fa", "#c4d7ff", "#e8f0ff", "#7da8f5", "#bdd0ff"];
    const trailLength = 6;
    
    particlesRef.current = Array.from({ length: particleCount }, () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        trail: [],
      };
    });

    // Mouse move handler - immediate update
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationId: number;
    const trailLength_max = trailLength;
    
    const animate = () => {
      // Clear canvas completely for transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Store position in trail
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > trailLength_max) {
          particle.trail.shift();
        }

        // Calculate distance from mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 180;

        // Track if particle is being repelled by mouse
        const isRepelled = distance < maxDistance;

        // Repel particles from mouse - immediate response
        if (isRepelled) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          
          // Direct position update for instant response
          particle.x -= Math.cos(angle) * force * 25;
          particle.y -= Math.sin(angle) * force * 25;
        } else {
          // Slowly return to floating motion
          particle.baseX += particle.speedX;
          particle.baseY += particle.speedY;

          // Wrap around edges
          if (particle.baseX < 0) particle.baseX = canvas.width;
          if (particle.baseX > canvas.width) particle.baseX = 0;
          if (particle.baseY < 0) particle.baseY = canvas.height;
          if (particle.baseY > canvas.height) particle.baseY = 0;

          // Smooth return to base position
          particle.x += (particle.baseX - particle.x) * 0.08;
          particle.y += (particle.baseY - particle.y) * 0.08;
        }

        // Draw subtle trail
        if (particle.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
          
          for (let i = 1; i < particle.trail.length; i++) {
            ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
          }
          ctx.lineTo(particle.x, particle.y);
          
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = particle.size * 0.5;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.globalAlpha = particle.opacity * 0.15;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw subtle glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2.5, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2.5
        );
        gradient.addColorStop(0, particle.color + "15");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [canvasRef]);

  return null;
}

export default function HeroSection() {
  const [animationPhase, setAnimationPhase] = useState<"hidden" | "appearing" | "visible" | "dissolving">("hidden");
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
  }, [currentSentenceIndex]);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black pb-60">
      {/* Static star field background */}
      <div className="absolute inset-0 z-0">
        {/* Tiny stars layer */}
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 20px 30px, white, transparent),
              radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 90px 40px, white, transparent),
              radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent),
              radial-gradient(1px 1px at 160px 120px, white, transparent),
              radial-gradient(1.5px 1.5px at 200px 50px, rgba(200,220,255,0.9), transparent),
              radial-gradient(1px 1px at 220px 150px, white, transparent),
              radial-gradient(1px 1px at 280px 90px, rgba(255,255,255,0.6), transparent),
              radial-gradient(1.5px 1.5px at 320px 20px, rgba(180,200,255,0.8), transparent),
              radial-gradient(1px 1px at 350px 180px, white, transparent),
              radial-gradient(1px 1px at 400px 60px, rgba(255,255,255,0.7), transparent),
              radial-gradient(1px 1px at 450px 140px, white, transparent),
              radial-gradient(1.5px 1.5px at 500px 30px, rgba(220,200,255,0.8), transparent),
              radial-gradient(1px 1px at 550px 100px, rgba(255,255,255,0.5), transparent)
            `,
            backgroundSize: '600px 200px',
          }}
        />
        {/* Second stars layer offset */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 100px 50px, white, transparent),
              radial-gradient(1.5px 1.5px at 200px 150px, rgba(200,180,255,0.7), transparent),
              radial-gradient(1px 1px at 300px 100px, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 400px 200px, white, transparent),
              radial-gradient(2px 2px at 500px 80px, rgba(180,200,255,0.5), transparent),
              radial-gradient(1px 1px at 150px 250px, rgba(255,255,255,0.7), transparent),
              radial-gradient(1px 1px at 350px 300px, white, transparent),
              radial-gradient(1.5px 1.5px at 450px 350px, rgba(220,200,255,0.6), transparent)
            `,
            backgroundSize: '550px 400px',
          }}
        />
      </div>

      {/* Nebula clouds */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        {/* Top right nebula */}
        <div 
          className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] opacity-20 blur-[100px]"
          style={{ background: "radial-gradient(ellipse, rgba(76, 29, 149, 0.5) 0%, rgba(30, 58, 138, 0.3) 40%, transparent 70%)" }}
        />
        {/* Bottom left nebula */}
        <div 
          className="absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] opacity-15 blur-[120px]"
          style={{ background: "radial-gradient(ellipse, rgba(30, 58, 138, 0.5) 0%, rgba(88, 28, 135, 0.3) 40%, transparent 70%)" }}
        />
        {/* Center subtle glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-10 blur-[150px]"
          style={{ background: "radial-gradient(ellipse, rgba(99, 102, 241, 0.4) 0%, transparent 60%)" }}
        />
      </div>

      {/* Planet horizon orb - positioned below the text */}
      <div className="absolute bottom-[-2500px] sm:bottom-[-350px] lg:bottom-[-450px] left-0 right-0 z-2">
        <SpotlightOrb mousePos={mousePos} />
      </div>

      {/* Space dust canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-3"
        style={{ pointerEvents: "none" }}
      />
      <SpaceDust canvasRef={canvasRef} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 -mt-24 sm:-mt-32 lg:-mt-40">
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
