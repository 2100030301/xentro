"use client";

import { useEffect, useState, useRef } from "react";

// Animated counter component
function AnimatedCounter({ 
  end, 
  duration = 2000, 
  prefix = "", 
  suffix = "",
  inView 
}: { 
  end: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, inView]);

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-24 px-4 bg-[#020617]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Impact by the <span className="text-[#2b40f6]">Numbers</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Real people, <em className="font-serif text-white">real results.</em>
          </p>
        </div>

        {/* Bento Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
          
          {/* Large card - Total Transaction Value (Rowspan 2) */}
          <div className="col-span-1 md:row-span-2 bg-[#0B1221] border border-white/10 rounded-2xl p-8 flex flex-col relative overflow-hidden min-h-[320px] group">
             {/* Spotlight effect */}
             <div 
              className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)"
              }}
            />
            <div className="relative z-10 flex flex-col h-full w-full">
              <div className="flex-1 flex items-center justify-center">
                <span className="text-white text-5xl md:text-6xl lg:text-7xl font-bold">
                  {inView ? <AnimatedCounter end={1} prefix="$" suffix="B+" inView={inView} duration={1500} /> : "$0B+"}
                </span>
              </div>
              <span className="text-gray-400 text-sm uppercase tracking-wider text-left">Total Transaction Value</span>
            </div>
          </div>

          {/* Clients Served */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between items-start text-left hover:bg-white/10 transition-colors duration-300 min-h-[160px]">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Clients Served in<br />the past year</span>
            <span className="text-white text-3xl md:text-4xl font-semibold mt-4">
              <AnimatedCounter end={70} suffix="+" inView={inView} duration={1800} />
            </span>
          </div>

          {/* Grants Programs */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between items-start text-left hover:bg-white/10 transition-colors duration-300 min-h-[160px]">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Grants Programs<br />Administered</span>
            <span className="text-white text-3xl md:text-4xl font-semibold mt-4">
              <AnimatedCounter end={3} prefix="$" suffix=".5M+" inView={inView} duration={1500} />
            </span>
          </div>

          {/* Global Presence - Spans 2 columns */}
          <div className="col-span-1 md:col-span-2 bg-[#0B1221] border border-white/10 rounded-2xl p-6 flex flex-col justify-between items-start text-left relative overflow-hidden min-h-[160px] group">
            {/* Spotlight effect */}
            <div 
              className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              style={{
                background: "radial-gradient(ellipse at 80% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 60%)"
              }}
            />
            <div className="relative z-10 flex flex-col h-full justify-between items-start w-full">
              <span className="text-gray-400 text-xs uppercase tracking-wider mb-2">Global Presence</span>
              <span className="text-white text-3xl md:text-4xl font-bold mt-auto">
                <AnimatedCounter end={10} suffix="+ Jurisdictions" inView={inView} duration={1600} />
              </span>
            </div>
          </div>

          {/* Client Portfolio */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between items-start text-left hover:bg-white/10 transition-colors duration-300 min-h-[160px]">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Client Portfolio<br />Valuation</span>
            <span className="text-white text-3xl md:text-4xl font-semibold mt-4">
              <AnimatedCounter end={600} prefix="$" suffix="M+" inView={inView} duration={2000} />
            </span>
          </div>

          {/* Ecosystem Presence */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between items-start text-left hover:bg-white/10 transition-colors duration-300 min-h-[160px]">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Ecosystem<br />Presence</span>
            <span className="text-white text-3xl md:text-4xl font-semibold mt-4">
              <AnimatedCounter end={10} suffix="+" inView={inView} duration={1400} />
            </span>
          </div>

          {/* VC Backed Clients - Dark card */}
          <div className="bg-[#0B1221] border border-white/10 rounded-2xl p-6 flex flex-col justify-between items-start text-left relative overflow-hidden min-h-[160px] group">
            {/* Spotlight effect */}
            <div 
              className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-500"
              style={{
                background: "radial-gradient(ellipse at 100% 100%, rgba(255, 255, 255, 0.1) 0%, transparent 60%)"
              }}
            />
            <div className="relative z-10 flex flex-col h-full justify-between items-start w-full">
              <span className="text-gray-400 text-xs uppercase tracking-wider mb-2">Clients Backed by VCs with</span>
              <span className="text-white text-3xl md:text-4xl font-bold mt-auto">
                <AnimatedCounter end={10} prefix="$" suffix="B+ AUM" inView={inView} duration={1700} />
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
