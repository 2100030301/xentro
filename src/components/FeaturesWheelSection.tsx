"use client";

import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import Image, { StaticImageData } from "next/image";
import "@/styles/FeaturesIntegrationsSection.css";

// Import feature images
import innovationHubImg from "@/images/featuresection/innovation-hub.png";
import mentorshipImg from "@/images/featuresection/mentorship.png";
import investorImg from "@/images/featuresection/investor.png";
import institutionalImg from "@/images/featuresection/institutional.png";
import eventsImg from "@/images/featuresection/events.png";
import collaborationImg from "@/images/featuresection/collaboration.png";

interface Feature {
  title: string;
  subtitle: string;
  description: string;
  image: StaticImageData;
  gradientFrom: string;
  gradientTo: string;
}

const features: Feature[] = [
  {
    title: "Student Innovation Hub",
    subtitle: "Ideation & Community",
    description: "A launchpad where students share ideas, projects, and early-stage startups with a vibrant community of creators.",
    image: innovationHubImg,
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-600",
  },
  {
    title: "Mentorship Network",
    subtitle: "Expert Guidance",
    description: "Direct guidance from experienced entrepreneurs, professors, and industry experts who've been there.",
    image: mentorshipImg,
    gradientFrom: "from-indigo-500",
    gradientTo: "to-purple-600",
  },
  {
    title: "Investor Access",
    subtitle: "Funding Opportunities",
    description: "Connects student founders with angel investors and Venture Capitalists ready to fuel your vision.",
    image: investorImg,
    gradientFrom: "from-purple-500",
    gradientTo: "to-pink-600",
  },
  {
    title: "Institutional Support",
    subtitle: "University Partnership",
    description: "Get matched with universities and incubators perfectly aligned to your startup's unique needs.",
    image: institutionalImg,
    gradientFrom: "from-pink-500",
    gradientTo: "to-rose-600",
  },
  {
    title: "Events & Hackathons",
    subtitle: "Innovation Events",
    description: "Central hub for entrepreneurship events, hackathons, and pitch nights that spark innovation.",
    image: eventsImg,
    gradientFrom: "from-rose-500",
    gradientTo: "to-red-600",
  },
  {
    title: "Collaborative Idea Building",
    subtitle: "Team Formation",
    description: "Post startup ideas and recruit co-founders or teammates who share your passion.",
    image: collaborationImg,
    gradientFrom: "from-red-500",
    gradientTo: "to-orange-600",
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

export default function FeaturesWheelSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Get position for LEFT hemisphere arc
  // Icons positioned on the arc line from 90° (top) to 270° (bottom) - LEFT side
  const getIconPosition = (index: number, currentActiveIndex: number) => {
    const totalItems = features.length;
    const arcSpan = 150; // Arc span in degrees
    const angleStep = arcSpan / (totalItems - 1);
    
    // Calculate relative position based on distance from active index
    const relativeIndex = (index - currentActiveIndex + totalItems) % totalItems;
    
    // Active item goes to middle-left (180°), others distribute above and below
    let angle: number;
    if (relativeIndex === 0) {
      angle = 180; // Active item at middle-left (on the arc)
    } else if (relativeIndex <= totalItems / 2) {
      // Items below active (toward 270°)
      angle = 180 + relativeIndex * angleStep;
    } else {
      // Items above active (toward 90°)
      angle = 180 + (relativeIndex - totalItems) * angleStep;
    }
    
    const angleRad = angle * (Math.PI / 180);
    const radius = 220; // Radius for the arc
    const x = Math.cos(angleRad) * radius;
    const y = Math.sin(angleRad) * radius;
    
    return { x, y, angle };
  };

  const handleFeatureClick = (index: number) => {
    setActiveIndex(index);
  };

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
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white px-4 leading-tight">
            {"Every tool you need to ".split("").map((char, index) => (
              <motion.span
                key={`char1-${index}`}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.3 + index * 0.02,
                  ease: "easeOut"
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <span className="inline-block glow-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              {"transform your idea into reality".split("").map((char, index) => (
                <motion.span
                  key={`char2-${index}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.3 + ("Every tool you need to ".length + index) * 0.02,
                    ease: "easeOut"
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[700px]">
          
          {/* Left side - Active feature content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-20 order-1 pl-8 lg:pl-16 flex items-center justify-center"
          >
            {/* Active feature info - Enhanced styling */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative max-w-xl"
              >
                {/* Glowing background card */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-40"
                  style={{
                    background: "radial-gradient(circle at center, rgba(96, 165, 250, 0.1), transparent 70%)",
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Top decorative line */}
                <motion.div
                  className="flex items-center justify-center gap-3 mb-6"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <motion.div
                    className="h-px w-12 md:w-16 rounded-full bg-gradient-to-r from-transparent to-blue-400/50"
                    animate={{ scaleX: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.p 
                    className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-blue-300/70 font-semibold"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {features[activeIndex].subtitle}
                  </motion.p>
                  <motion.div
                    className="h-px w-12 md:w-16 rounded-full bg-gradient-to-l from-transparent to-blue-400/50"
                    animate={{ scaleX: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </motion.div>
                
                {/* Main title with enhanced styling */}
                <motion.h3 
                  className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 relative text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent relative z-10">
                      {features[activeIndex].title}
                    </span>
                    {/* Glow effect behind text */}
                    <motion.span
                      className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-400/30 via-blue-300/40 to-blue-400/30"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </span>
                </motion.h3>

                {/* Description with enhanced styling */}
                <motion.div
                  className="relative inline-block mx-auto text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {/* Decorative quotes */}
                  <motion.div 
                    className="absolute -left-4 md:-left-8 -top-2 text-blue-400/20 text-4xl md:text-6xl font-serif"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 0.3, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    "
                  </motion.div>
                  
                  <p className="text-base md:text-lg lg:text-xl text-gray-300/90 leading-relaxed px-6 md:px-12">
                    {features[activeIndex].description}
                  </p>

                  <motion.div 
                    className="absolute -right-4 md:-right-8 -bottom-6 text-blue-400/20 text-4xl md:text-6xl font-serif"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 0.3, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    "
                  </motion.div>
                </motion.div>
                
                {/* Progress indicator dots with enhanced styling */}
                <div className="flex justify-center items-center gap-2 mt-12">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500/30" />
                  {features.map((_, idx) => (
                    <motion.button
                      key={idx}
                      className="relative group"
                      whileHover={{ scale: 1.5 }}
                      onClick={() => handleFeatureClick(idx)}
                      aria-label={`Go to feature ${idx + 1}`}
                    >
                      <motion.div
                        className="w-2.5 h-2.5 rounded-full transition-all"
                        style={{
                          backgroundColor: idx === activeIndex 
                            ? "rgb(96, 165, 250)" 
                            : idx < activeIndex 
                            ? "rgba(43, 64, 246, 0.6)"
                            : "rgba(71, 85, 105, 0.5)",
                        }}
                        animate={idx === activeIndex ? {
                          boxShadow: [
                            "0 0 0 0 rgba(96, 165, 250, 0.4)",
                            "0 0 0 8px rgba(96, 165, 250, 0)",
                            "0 0 0 0 rgba(96, 165, 250, 0)"
                          ]
                        } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.button>
                  ))}
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500/30" />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right side - Hemisphere wheel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] lg:h-[650px] flex items-center order-2 justify-end"
          >
            {/* Wheel container - positioned to show hemisphere on left edge */}
            <div className="relative w-full h-full flex items-center justify-start">
              
              {/* Left hemisphere arc container */}
              <div className="relative" style={{ width: '650px', height: '600px' }}>
                
                {/* Center glow effect - positioned at center of hemisphere (right edge of arc) */}
                <div 
                  className="absolute w-72 h-72 bg-gradient-to-r from-primary/25 via-secondary/20 to-accent/15 rounded-full blur-[100px] animate-pulse-glow pointer-events-none"
                  style={{ top: '50%', right: '0', transform: 'translate(50%, -50%)' }}
                />

                {/* Outer orbital arc - LEFT hemisphere only (curving to right) */}
                <svg 
                  className="absolute pointer-events-none" 
                  style={{ top: '50%', right: '0', transform: 'translate(50%, -50%)' }}
                  width="500" 
                  height="500" 
                  viewBox="0 0 500 500"
                >
                  <defs>
                    <linearGradient id="arcGradientLeft" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="hsl(238, 84%, 67%)" stopOpacity="0.5" />
                      <stop offset="50%" stopColor="hsl(270, 60%, 55%)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="hsl(330, 80%, 60%)" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                  {/* Left hemisphere arc from top to bottom */}
                  <path
                    d="M 250 30 A 220 220 0 0 0 250 470"
                    fill="none"
                    stroke="url(#arcGradientLeft)"
                    strokeWidth="2"
                    strokeDasharray="12 8"
                  />
                </svg>

                {/* Inner orbital arc */}
                <svg 
                  className="absolute pointer-events-none" 
                  style={{ top: '50%', right: '0', transform: 'translate(50%, -50%)' }}
                  width="400" 
                  height="400" 
                  viewBox="0 0 400 400"
                >
                  <path
                    d="M 200 30 A 170 170 0 0 0 200 370"
                    fill="none"
                    stroke="hsl(240, 10%, 25%)"
                    strokeWidth="1"
                    strokeDasharray="6 6"
                    opacity="0.5"
                  />
                </svg>

                {/* Connection lines removed - active icon now stays on arc */}

                {/* Orbiting icons on the LEFT arc - now includes active icon */}
                {features.map((feature, index) => {
                  const pos = getIconPosition(index, activeIndex);
                  const isCenter = index === activeIndex;
                  
                  return (
                    <motion.div
                      key={feature.title}
                      className="absolute cursor-pointer z-20"
                      style={{
                        top: '50%',
                        right: '0',
                        transform: 'translate(50%, -50%)',
                      }}
                      animate={{
                        x: pos.x - (isCenter ? 60 : 28), // Adjusted for smaller icons
                        y: pos.y - (isCenter ? 60 : 28),
                        scale: 1,
                        opacity: 1,
                      }}
                      transition={{ 
                        duration: 0.7, 
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      onClick={() => handleFeatureClick(index)}
                      whileHover={{ 
                        scale: 1.12,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${feature.title}-${isCenter ? 'active' : 'inactive'}`}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className={`${isCenter ? 'w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl' : 'w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl'} bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} ${isCenter ? 'shadow-2xl' : 'shadow-xl hover:shadow-2xl'} transition-all duration-300 border-2 border-white/25 overflow-hidden relative group`}
                          style={isCenter ? {
                            boxShadow: `
                              0 0 80px -20px hsl(238, 84%, 67%, 0.6),
                              0 0 120px -40px hsl(270, 60%, 55%, 0.5),
                              0 30px 60px -15px rgba(0, 0, 0, 0.6)
                            `
                          } : {}}
                        >
                          <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} ${isCenter ? 'opacity-15' : 'opacity-20 group-hover:opacity-10'} transition-opacity duration-300`} />
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>


        </div>
      </div>
    </section>
  );
}
