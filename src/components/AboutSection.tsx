"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const lines = [
  "Empowering India's Next Generation of Founders",
  "Your complete digital ecosystem for startup success",
  "Expert mentorship from industry leaders",
  "Direct access to funding networks and investors",
  "500+ student founders building together",
  "From idea validation to product launch",
  "Transform your vision into a thriving venture",
];

const FloatingParticle = ({ delay }: { delay: number }) => {
  const colors = [
    'hsl(217 91% 60%)',  // primary blue
    'hsl(199 89% 48%)',  // accent cyan
    'hsl(260 60% 55%)',  // purple
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full"
      style={{ 
        background: color,
        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
      }}
      initial={{ opacity: 0, y: 100, x: Math.random() * 100 - 50 }}
      animate={{
        opacity: [0, 0.8, 0],
        y: [100, -100],
        x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const isInView = useInView(sectionRef, { once: false, amount: 0.4 });

  useEffect(() => {
    if (!isInView) {
      setActiveLineIndex(0);
      return;
    }

    const interval = setInterval(
      () => setActiveLineIndex((prev) => (prev + 1) % lines.length),
      3000
    );

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 beam-effect opacity-80" />
        
        {/* Primary blue glow - bottom center */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, hsl(217 91% 60% / 0.35) 0%, transparent 70%)' }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Accent cyan glow - top right */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, hsl(199 89% 48% / 0.25) 0%, transparent 70%)' }}
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Secondary purple accent - top left */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, hsl(260 60% 55% / 0.2) 0%, transparent 70%)' }}
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(hsl(217 91% 60% / 0.15) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(217 91% 60% / 0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(8)].map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.5} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-6">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Glowing orb origin point */}
          <motion.div
            className="relative mb-6"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Core orb with gradient */}
            <div 
              className="w-4 h-4 rounded-full relative z-10"
              style={{
                background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(199 89% 48%) 100%)',
                boxShadow: '0 0 20px hsl(217 91% 60% / 0.8), 0 0 40px hsl(199 89% 48% / 0.5)',
              }}
            />
            {/* Inner glow */}
            <div 
              className="absolute inset-0 w-4 h-4 rounded-full blur-md"
              style={{ background: 'hsl(217 91% 60% / 0.6)' }}
            />
            {/* Outer expanding ring */}
            <motion.div
              className="absolute -inset-4 rounded-full"
              style={{ 
                border: '2px solid hsl(217 91% 60% / 0.4)',
                boxShadow: '0 0 20px hsl(217 91% 60% / 0.3), inset 0 0 20px hsl(199 89% 48% / 0.2)',
              }}
              animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            {/* Secondary pulse ring */}
            <motion.div
              className="absolute -inset-2 rounded-full"
              style={{ border: '1px solid hsl(199 89% 48% / 0.5)' }}
              animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            />
          </motion.div>

          {/* Section label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold tracking-[0.25em] uppercase mb-2 text-gradient-primary"
            style={{
              textShadow: '0 0 30px hsl(217 91% 60% / 0.5), 0 0 60px hsl(199 89% 48% / 0.3)',
            }}
          >
            About Us
          </motion.span>

          {/* Karaoke-style lines */}
          <div className="flex flex-col items-center gap-3 py-8">
            {lines.map((line, index) => {
              const isActive = index === activeLineIndex;
              const distance = Math.abs(index - activeLineIndex);
              const isPast = index < activeLineIndex;
              const isFuture = index > activeLineIndex;
              
              return (
                <motion.p
                  key={index}
                  animate={{
                    opacity: isActive ? 1 : Math.max(0.15, 0.5 - distance * 0.12),
                    scale: isActive ? 1.05 : 1 - distance * 0.02,
                    y: isActive ? 0 : distance * 2,
                    filter: isActive ? "blur(0px)" : `blur(${Math.min(distance * 0.8, 2)}px)`,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed transition-colors duration-500 cursor-pointer px-4 ${
                    isActive 
                      ? "text-gradient-primary" 
                      : isPast 
                        ? "text-muted-foreground/35" 
                        : "text-muted-foreground/45"
                  }`}
                  onClick={() => setActiveLineIndex(index)}
                  style={{
                    textShadow: isActive 
                      ? "0 0 40px hsl(217 91% 60% / 0.6), 0 0 80px hsl(199 89% 48% / 0.4), 0 0 120px hsl(217 91% 60% / 0.2)" 
                      : isPast
                        ? "none"
                        : "0 0 10px hsl(215 20% 65% / 0.1)",
                  }}
                >
                  {line}
                </motion.p>
              );
            })}
          </div>

          {/* Progress indicators */}
          <div className="flex gap-2 mt-6">
            {lines.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveLineIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === activeLineIndex
                    ? "w-10"
                    : index < activeLineIndex
                      ? "w-2.5"
                      : "w-2.5 hover:bg-muted-foreground/50"
                }`}
                style={{
                  background: index === activeLineIndex
                    ? 'linear-gradient(90deg, hsl(217 91% 60%) 0%, hsl(199 89% 48%) 100%)'
                    : index < activeLineIndex
                      ? 'hsl(217 91% 60% / 0.5)'
                      : 'hsl(215 20% 65% / 0.3)',
                  boxShadow: index === activeLineIndex
                    ? '0 0 10px hsl(217 91% 60% / 0.6), 0 0 20px hsl(199 89% 48% / 0.4)'
                    : 'none',
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
