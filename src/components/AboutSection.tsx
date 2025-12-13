"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import "@/styles/AboutSection.css";

const lines = [
  "Empowering India's Next Generation of Founders",
  "Your complete digital ecosystem for startup success",
  "Expert mentorship from industry leaders and successful entrepreneurs",
  "Direct access to funding networks and investor connections",
  "Vibrant community of 500+ student founders building together",
  "From idea validation to product launch, we walk with you",
  "Transform your vision into a thriving venture",
];

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

  const getUpcomingLines = () => {
    const upcoming = [];
    for (let i = 1; i <= 3; i++) {
      const index = (activeLineIndex + i) % lines.length;
      upcoming.push({ text: lines[index], offset: i });
    }
    return upcoming;
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* --- BACKGROUND: EXACT BEAM SHAPE --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep black base */}
        <div className="absolute inset-0 bg-black" />

        {/* Very narrow, sharp blue cone starting at vertical center */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 12% 55% at 50% 50%,
                rgba(37, 99, 235, 1) 0%,
                rgba(37, 99, 235, 0.95) 8%,
                rgba(37, 99, 235, 0.8) 18%,
                rgba(30, 64, 175, 0.55) 30%,
                rgba(15, 23, 42, 0.3) 46%,
                transparent 60%
              )
            `,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center bottom",
            backgroundSize: "100% 200%", // stretches downward like the photo
          }}
        />

        {/* Subtle dark top to mimic empty black space above */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(
                to top,
                rgba(0, 0, 0, 0) 40%,
                rgba(0, 0, 0, 0.7) 80%,
                rgba(0, 0, 0, 1) 100%
              )
            `,
          }}
        />
      </div>

      {/* --- TEXT + WHITE DOT AT BEAM ORIGIN --- */}
      <div className="relative z-10 w-full max-w-4xl px-6">
        <div className="flex flex-col items-center text-center gap-4">
          {/* Small white circle exactly at beam origin */}
          <div
            className="rounded-full"
            style={{
              width: "14px",
              height: "14px",
              background:
                "radial-gradient(circle, #ffffff 0%, #e5f4ff 40%, rgba(148, 197, 255, 0.0) 100%)",
              boxShadow: "0 0 18px rgba(148, 197, 255, 0.9)",
            }}
          />

          {/* Active line (main text under the dot) */}
          <motion.div
            key={`active-${activeLineIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-snug px-4"
              style={{
                color: "#e5f4ff",
                letterSpacing: "-0.01em",
                textShadow:
                  "0 0 14px rgba(148, 197, 255, 0.85), 0 0 28px rgba(37, 99, 235, 0.9)",
              }}
            >
              {lines[activeLineIndex]}
            </h1>
          </motion.div>

          {/* Optional extra lines directly under, faint like the image */}
          <div className="space-y-1 max-w-3xl">
            {getUpcomingLines().map((line, index) => (
              <motion.p
                key={`upcoming-${activeLineIndex}-${index}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-[11px] sm:text-xs md:text-sm px-2"
                style={{
                  color: "rgba(200, 210, 230, 0.6)",
                  opacity: Math.max(0.18, 0.45 - line.offset * 0.1),
                  filter: `blur(${line.offset * 0.35}px)`,
                }}
              >
                {line.text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
