"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lightbulb, 
  Users, 
  TrendingUp, 
  GraduationCap, 
  Calendar, 
  MessageSquare 
} from "lucide-react";
import "@/styles/FeaturesIntegrationsSection.css";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: typeof Lightbulb;
}

const features: Feature[] = [
  {
    id: 0,
    title: "Student Innovation Hub",
    description: "A launchpad where students share ideas, projects, and early-stage startups.",
    icon: Lightbulb,
  },
  {
    id: 1,
    title: "Mentorship Network",
    description: "Direct guidance from experienced entrepreneurs, professors, and industry experts.",
    icon: Users,
  },
  {
    id: 2,
    title: "Investor Access",
    description: "Connects student founders with angel investors and Venture Capitalists.",
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "Institutional Support",
    description: "Students get matched with the right universities and incubators to support their specific needs.",
    icon: GraduationCap,
  },
  {
    id: 4,
    title: "Events & Hackathons",
    description: "Central hub for entrepreneurship events, hackathons, and pitch nights.",
    icon: Calendar,
  },
  {
    id: 5,
    title: "Collaborative Idea Building",
    description: "A space where students can post startup ideas and recruit co-founders or teammates.",
    icon: MessageSquare,
  },
];

export default function FeaturesIntegrationsSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleIconHover = (index: number) => {
    setActiveFeature(index);
    setIsPaused(true);
  };

  const handleIconLeave = () => {
    setIsPaused(false);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-16 md:py-24 px-4 md:px-6 features-integrations-section"
      style={{ backgroundColor: "#020617" }}
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Top Content */}
        <div className="text-center mb-12 md:mb-20">
          <p className="text-xs md:text-sm uppercase tracking-wider text-gray-400 mb-3 md:mb-4 font-medium">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white px-4">
            Empowering Student Founders,{" "}
            <span className="text-[#2b40f6]">Seamlessly</span>
          </h2>
        </div>

        {/* Icon Path Layout */}
        <div className="relative w-full h-[300px] md:h-[400px] mb-12 md:mb-16">
          {/* SVG Curved Line - Hidden on mobile */}
          <svg
            className="absolute inset-0 w-full h-full hidden md:block"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(43, 64, 246, 0.3)" />
                <stop offset="50%" stopColor="rgba(96, 165, 250, 0.5)" />
                <stop offset="100%" stopColor="rgba(43, 64, 246, 0.3)" />
              </linearGradient>
            </defs>
            <path
              d="M 100 200 Q 300 120, 600 200 T 1100 200"
              stroke="url(#curveGradient)"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
          </svg>

          {/* Icons positioned along the curve */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-6xl">
              <div className="flex justify-between items-center px-2 md:px-4 gap-2 md:gap-0 icons-container overflow-x-auto md:overflow-visible pb-4 md:pb-0">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  const isActive = activeFeature === index;
                  
                  // Calculate Y offset to follow the curve (desktop only)
                  const totalIcons = features.length;
                  const normalizedPos = index / (totalIcons - 1);
                  const curveHeight = 60;
                  const yOffset = window.innerWidth >= 768 ? -Math.sin(normalizedPos * Math.PI) * curveHeight : 0;

                  return (
                    <motion.div
                      key={feature.id}
                      className="relative cursor-pointer flex-shrink-0 feature-icon-wrapper"
                      style={{ transform: `translateY(${yOffset}px)` }}
                      onMouseEnter={() => handleIconHover(index)}
                      onMouseLeave={handleIconLeave}
                      onClick={() => handleIconHover(index)}
                      animate={{
                        scale: isActive ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      role="button"
                      tabIndex={0}
                      aria-label={feature.title}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleIconHover(index);
                        }
                      }}
                    >
                      <motion.div
                        className="relative flex items-center justify-center rounded-full bg-gradient-to-br shadow-xl"
                        style={{
                          width: "64px",
                          height: "64px",
                          background: isActive
                            ? "linear-gradient(135deg, #2b40f6 0%, #60a5fa 100%)"
                            : "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                          opacity: isActive ? 1 : 0.5,
                        }}
                        animate={{
                          boxShadow: isActive
                            ? "0 0 40px rgba(43, 64, 246, 0.6), 0 0 80px rgba(43, 64, 246, 0.3)"
                            : "0 4px 20px rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        <Icon
                          className="text-white"
                          size={28}
                          strokeWidth={2}
                        />
                      </motion.div>

                      {/* Active indicator ring */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 active-ring"
                          style={{
                            borderColor: "#2b40f6",
                          }}
                          initial={{ scale: 1, opacity: 0 }}
                          animate={{ 
                            scale: 1.3, 
                            opacity: [0.5, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Description Area */}
        <div className="text-center max-w-3xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
                {features[activeFeature].title}
              </h3>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                {features[activeFeature].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
