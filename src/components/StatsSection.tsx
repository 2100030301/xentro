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
      className="relative w-full py-24 px-4 bg-[#fafafa]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-gray-600 text-lg mb-1">Real people, <em className="font-serif text-gray-800">real results.</em></p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-fr">
          
          {/* Large card - Total Transaction Value */}
          <div className="col-span-1 row-span-2 bg-black rounded-2xl p-6 flex flex-col justify-between min-h-[280px]">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Total Transaction Value</span>
            <div>
              <span className="text-white text-5xl md:text-6xl font-bold">
                {inView ? <AnimatedCounter end={1} prefix="$" suffix="B+" inView={inView} duration={1500} /> : "$0B+"}
              </span>
            </div>
          </div>

          {/* Clients Served */}
          <div className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-gray-200">
            <span className="text-gray-500 text-xs uppercase tracking-wider">Clients Served in<br />the past year</span>
            <span className="text-gray-900 text-3xl md:text-4xl font-semibold">
              <AnimatedCounter end={70} suffix="+" inView={inView} duration={1800} />
            </span>
          </div>

          {/* Grants Programs */}
          <div className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-gray-200">
            <span className="text-gray-500 text-xs uppercase tracking-wider">Grants Programs<br />Administered</span>
            <span className="text-gray-900 text-3xl md:text-4xl font-semibold">
              <AnimatedCounter end={3} prefix="$" suffix=".5M+" inView={inView} duration={1500} />
            </span>
          </div>

          {/* Global Presence - Dark card spanning 2 columns */}
          <div className="col-span-2 bg-black rounded-2xl p-6 flex flex-col justify-center items-center relative overflow-hidden min-h-[120px]">
            {/* Spotlight effect */}
            <div 
              className="absolute inset-0 opacity-60"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)"
              }}
            />
            <span className="text-gray-400 text-xs uppercase tracking-wider mb-2 relative z-10">Global Presence</span>
            <span className="text-white text-3xl md:text-4xl font-bold relative z-10">
              <AnimatedCounter end={10} suffix="+ Jurisdictions" inView={inView} duration={1600} />
            </span>
          </div>

          {/* Client Portfolio */}
          <div className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-gray-200">
            <span className="text-gray-500 text-xs uppercase tracking-wider">Client Portfolio<br />Valuation</span>
            <span className="text-gray-900 text-3xl md:text-4xl font-semibold">
              <AnimatedCounter end={600} prefix="$" suffix="M+" inView={inView} duration={2000} />
            </span>
          </div>

          {/* Ecosystem Presence */}
          <div className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-gray-200">
            <span className="text-gray-500 text-xs uppercase tracking-wider">Ecosystem<br />Presence</span>
            <span className="text-gray-900 text-3xl md:text-4xl font-semibold">
              <AnimatedCounter end={10} suffix="+" inView={inView} duration={1400} />
            </span>
          </div>

          {/* VC Backed Clients - Dark card */}
          <div className="col-span-2 md:col-span-2 bg-black rounded-2xl p-6 flex flex-col justify-center items-center relative overflow-hidden min-h-[120px]">
            {/* Spotlight effect */}
            <div 
              className="absolute inset-0 opacity-50"
              style={{
                background: "radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.12) 0%, transparent 55%)"
              }}
            />
            <span className="text-gray-400 text-xs uppercase tracking-wider mb-2 relative z-10">Clients Backed by VCs with</span>
            <span className="text-white text-3xl md:text-4xl font-bold relative z-10">
              <AnimatedCounter end={10} prefix="$" suffix="B+ AUM" inView={inView} duration={1700} />
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
