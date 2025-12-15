"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Trophy, Zap, Sparkles } from "lucide-react";
import "@/styles/FeaturesIntegrationsSection.css";

// Import feature images
import innovationHubImg from "@/images/featuresection/innovation-hub.png";
import mentorshipImg from "@/images/featuresection/mentorship.png";
import investorImg from "@/images/featuresection/investor.png";
import institutionalImg from "@/images/featuresection/institutional.png";
import eventsImg from "@/images/featuresection/events.png";
import collaborationImg from "@/images/featuresection/collaboration.png";

import type { StaticImageData } from "next/image";

interface Feature {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
}

const features: Feature[] = [
  {
    id: 0,
    title: "Student Innovation Hub",
    description: "A launchpad where students share ideas, projects, and early-stage startups with a vibrant community of creators.",
    image: innovationHubImg,
  },
  {
    id: 1,
    title: "Mentorship Network",
    description: "Direct guidance from experienced entrepreneurs, professors, and industry experts who've been there.",
    image: mentorshipImg,
  },
  {
    id: 2,
    title: "Investor Access",
    description: "Connects student founders with angel investors and Venture Capitalists ready to fuel your vision.",
    image: investorImg,
  },
  {
    id: 3,
    title: "Institutional Support",
    description: "Get matched with universities and incubators perfectly aligned to your startup's unique needs.",
    image: institutionalImg,
  },
  {
    id: 4,
    title: "Events & Hackathons",
    description: "Central hub for entrepreneurship events, hackathons, and pitch nights that spark innovation.",
    image: eventsImg,
  },
  {
    id: 5,
    title: "Collaborative Idea Building",
    description: "Post startup ideas and recruit co-founders or teammates who share your passion.",
    image: collaborationImg,
  },
];

// Floating particles component
const FloatingParticles = () => {
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 15,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            bottom: '-20px',
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(96, 165, 250, 0.6), rgba(43, 64, 246, 0.3))`,
          }}
          animate={{
            y: [0, -800],
            x: [0, Math.sin(particle.id) * 50],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default function FeaturesIntegrationsSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [revealedIcons, setRevealedIcons] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Animation timing synced with beam (2.5s per feature)
  const animationDuration = 2500;

  // Reveal icons as they become active
  useEffect(() => {
    if (!isInView) return;
    
    if (!revealedIcons.has(activeFeature)) {
      setRevealedIcons(prev => new Set([...prev, activeFeature]));
    }
  }, [activeFeature, isInView, revealedIcons]);

  useEffect(() => {
    if (isPaused || !isInView) return;

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, animationDuration);

    return () => clearInterval(interval);
  }, [isPaused, isInView]);

  const handleIconHover = (index: number) => {
    setActiveFeature(index);
    setIsPaused(true);
  };

  const handleIconLeave = () => {
    setIsPaused(false);
  };

  // Calculate beam progress based on active feature (sync with icons)
  const beamProgress = activeFeature / (features.length - 1);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-16 md:py-24 px-4 md:px-6 features-integrations-section overflow-hidden"
      style={{ backgroundColor: "#020617" }}
    >
      {/* Parallax Background Layers */}
      <div className="parallax-bg">
        <motion.div 
          className="parallax-layer parallax-stars"
          style={{ y: starsY }}
        />
        <motion.div 
          className="parallax-layer parallax-grid"
          style={{ y: backgroundY }}
        />
        <div className="parallax-layer parallax-glow" />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        {/* Top Content with Animation */}
        <motion.div 
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p 
            className="text-xs md:text-sm uppercase tracking-[0.3em] text-blue-400/80 mb-4 md:mb-6 font-medium"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.3em" } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Features
          </motion.p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white px-4 leading-tight">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
            >
              {"Empowering Student Founders, ".split("").map((char, index) => (
                <motion.span
                  key={`char-${index}`}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.03, delay: 0.3 + index * 0.03 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            <motion.span 
              className="inline-block glow-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
            >
              {"Seamlessly".split("").map((char, index) => (
                <motion.span
                  key={`glow-char-${index}`}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.03, delay: 1.1 + index * 0.05 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </h2>
          <motion.p
            className="mt-6 text-gray-400/80 max-w-2xl mx-auto text-lg text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            Every tool you need to transform your idea into reality
          </motion.p>
        </motion.div>

        {/* Icon Path Layout */}
        <div className="relative w-full h-[350px] md:h-[450px] mb-12 md:mb-16">
          {/* SVG Curved Line with Synced Beam */}
          <svg
            className="absolute inset-0 w-full h-full hidden md:block"
            viewBox="0 0 1400 450"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(43, 64, 246, 0.2)" />
                <stop offset="50%" stopColor="rgba(96, 165, 250, 0.4)" />
                <stop offset="100%" stopColor="rgba(16, 185, 129, 0.3)" />
              </linearGradient>
              <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(43, 64, 246, 0)" />
                <stop offset="40%" stopColor="rgba(96, 165, 250, 0.9)" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 1)" />
                <stop offset="60%" stopColor="rgba(96, 165, 250, 0.9)" />
                <stop offset="100%" stopColor="rgba(43, 64, 246, 0)" />
              </linearGradient>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(43, 64, 246, 0.8)" />
                <stop offset="50%" stopColor="rgba(96, 165, 250, 0.9)" />
                <stop offset="100%" stopColor="rgba(16, 185, 129, 0.8)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="strongGlow">
                <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Base curve (faded) */}
            <motion.path
              d="M 80 225 Q 350 100, 700 225 T 1320 225"
              stroke="url(#curveGradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8 8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            
            {/* Progress curve (synced with active feature) */}
            <motion.path
              d="M 80 225 Q 350 100, 700 225 T 1320 225"
              stroke="url(#progressGradient)"
              strokeWidth="3"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { 
                pathLength: beamProgress,
                opacity: 0.9
              } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </svg>

          {/* Icons positioned along the curve */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-6xl">
              <div className="flex justify-between items-center px-4 md:px-8 gap-3 md:gap-0 icons-container overflow-x-auto md:overflow-visible pb-4 md:pb-0">
                {features.map((feature, index) => {
                  const isActive = activeFeature === index;
                  const isPassed = activeFeature >= index;
                  const hasRevealed = revealedIcons.has(index);
                  
                  // Calculate Y offset to follow the curve (desktop only)
                  const totalIcons = features.length;
                  const normalizedPos = index / (totalIcons - 1);
                  const curveHeight = 80;
                  const yOffset = typeof window !== 'undefined' && window.innerWidth >= 768 
                    ? -Math.sin(normalizedPos * Math.PI) * curveHeight 
                    : 0;

                  return (
                    <motion.div
                      key={feature.id}
                      className="relative cursor-pointer flex-shrink-0 feature-icon-wrapper"
                      style={{ transform: `translateY(${yOffset}px)` }}
                      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                      animate={{
                        opacity: hasRevealed ? 1 : 0,
                        scale: hasRevealed ? (isActive ? 1.15 : 1) : 0.5,
                        rotate: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.34, 1.56, 0.64, 1],
                        delay: hasRevealed ? 0 : index * 0.12
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.1,
                        transition: { duration: 0.25, ease: "easeOut" }
                      }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => handleIconHover(index)}
                      onMouseLeave={handleIconLeave}
                      onClick={() => handleIconHover(index)}
                      role="button"
                      tabIndex={0}
                      aria-label={feature.title}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleIconHover(index);
                        }
                      }}
                    >
                      {/* Icon container with enhanced styling */}
                      <motion.div
                        className="relative flex items-center justify-center rounded-2xl shadow-2xl icon-inner-glow"
                        style={{
                          width: "96px",
                          height: "96px",
                        }}
                        animate={{
                          background: isActive
                            ? "rgba(15, 23, 42, 0.6)"
                            : isPassed
                            ? "rgba(15, 23, 42, 0.4)"
                            : "rgba(15, 23, 42, 0.3)",
                          boxShadow: isActive
                            ? "0 0 60px rgba(255, 255, 255, 0.3), 0 0 120px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255,255,255,0.1)"
                            : isPassed
                            ? "0 0 30px rgba(255, 255, 255, 0.2), 0 4px 20px rgba(0, 0, 0, 0.4)"
                            : "0 4px 20px rgba(0, 0, 0, 0.4)",
                          borderWidth: "1px",
                          borderColor: isActive 
                            ? "rgba(255, 255, 255, 0.3)" 
                            : isPassed 
                            ? "rgba(255, 255, 255, 0.15)"
                            : "rgba(255, 255, 255, 0.05)",
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <motion.div
                          className="relative w-[88px] h-[88px]"
                          animate={{
                            rotate: isActive ? [0, 5, -5, 0] : 0,
                          }}
                          transition={{
                            duration: 0.5,
                            ease: "easeInOut",
                          }}
                        >
                          <Image
                            src={feature.image}
                            alt={feature.title}
                            width={88}
                            height={88}
                            className="w-full h-full object-contain"
                          />
                        </motion.div>
                        
                        {/* Inner shine effect */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl overflow-hidden"
                          style={{
                            background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)",
                          }}
                        />
                      </motion.div>

                      {/* Pulsing rings for active icon */}
                      {isActive && (
                        <>
                          <motion.div
                            className="absolute inset-0 rounded-2xl"
                            style={{ 
                              border: "2px solid rgba(96, 165, 250, 0.6)",
                            }}
                            initial={{ scale: 1, opacity: 0 }}
                            animate={{ 
                              scale: [1, 1.5, 2],
                              opacity: [0.8, 0.4, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeOut",
                            }}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-2xl"
                            style={{ 
                              border: "1px solid rgba(43, 64, 246, 0.4)",
                            }}
                            initial={{ scale: 1, opacity: 0 }}
                            animate={{ 
                              scale: [1, 1.3, 1.6],
                              opacity: [0.6, 0.3, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeOut",
                              delay: 0.3,
                            }}
                          />
                        </>
                      )}

                      {/* Feature number badge */}
                      <motion.div
                        className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        animate={{
                          background: isPassed 
                            ? "linear-gradient(135deg, #2b40f6, #60a5fa)" 
                            : "rgba(30, 41, 59, 0.8)",
                          color: isPassed ? "#fff" : "rgba(148, 163, 184, 0.8)",
                          boxShadow: isPassed 
                            ? "0 0 15px rgba(43, 64, 246, 0.5)" 
                            : "none",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {index + 1}
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* Upskilling Outcome - Final Destination */}
                <motion.div
                  className="relative cursor-pointer flex-shrink-0 feature-icon-wrapper"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { 
                    opacity: activeFeature === features.length - 1 ? 1 : 0.5,
                    scale: activeFeature === features.length - 1 ? 1.1 : 0.9,
                  } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <motion.div
                    className="upskilling-outcome rounded-2xl px-6 py-4 flex flex-col items-center gap-2"
                    animate={{
                      boxShadow: activeFeature === features.length - 1
                        ? "0 0 80px rgba(16, 185, 129, 0.5), 0 0 160px rgba(43, 64, 246, 0.3)"
                        : "0 4px 20px rgba(0, 0, 0, 0.3)",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500"
                      animate={{
                        rotate: activeFeature === features.length - 1 ? [0, 10, -10, 0] : 0,
                        scale: activeFeature === features.length - 1 ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ 
                        duration: 0.6, 
                        repeat: activeFeature === features.length - 1 ? Infinity : 0,
                        repeatDelay: 2
                      }}
                    >
                      <Trophy className="text-white" size={28} strokeWidth={1.5} />
                    </motion.div>
                    <div className="text-center">
                      <motion.p 
                        className="text-xs font-semibold text-emerald-400 uppercase tracking-wider"
                        animate={{
                          opacity: activeFeature === features.length - 1 ? [0.7, 1, 0.7] : 0.7,
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Outcome
                      </motion.p>
                      <p className="text-sm font-bold text-white mt-1">
                        Launch Ready
                      </p>
                    </div>
                    
                    {/* Sparkle effects when active */}
                    {activeFeature === features.length - 1 && (
                      <>
                        <motion.div
                          className="absolute -top-2 -right-2"
                          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <Zap className="text-yellow-400" size={16} />
                        </motion.div>
                        <motion.div
                          className="absolute -bottom-2 -left-2"
                          animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <Sparkles className="text-emerald-400" size={14} />
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Description Area with Enhanced Animation */}
        <motion.div 
          className="text-center max-w-3xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.5), transparent)",
                }}
                animate={{ scaleX: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  {features[activeFeature].title}
                </span>
              </h3>
              <p className="text-base md:text-lg text-gray-400/90 leading-relaxed">
                {features[activeFeature].description}
              </p>
              
              {/* Progress indicator dots */}
              <div className="flex justify-center gap-2 mt-8">
                {features.map((_, idx) => (
                  <motion.button
                    key={idx}
                    className="w-2 h-2 rounded-full transition-colors"
                    style={{
                      backgroundColor: idx === activeFeature 
                        ? "rgb(96, 165, 250)" 
                        : idx < activeFeature 
                        ? "rgba(43, 64, 246, 0.6)"
                        : "rgba(71, 85, 105, 0.5)",
                    }}
                    whileHover={{ scale: 1.5 }}
                    onClick={() => {
                      setActiveFeature(idx);
                      setIsPaused(true);
                    }}
                    aria-label={`Go to feature ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
