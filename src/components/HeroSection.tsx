"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import bg6 from "@/images/HeroSection.jpeg";
import "@/styles/HeroSection.css";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [typewriterDone, setTypewriterDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setTypewriterDone(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section">
      {/* Background Image */}
      <Image
        src={bg6}
        alt="XENTRO futuristic tech background - digital incubator for students"
        fill
        priority
        quality={100}
        className="hero-bg-image"
      />

      {/* Overlay */}
      <div className="bg-overlay" />

      {/* Floating Elements */}
      <div className={`absolute inset-0 pointer-events-none ${mounted ? '' : 'opacity-0'}`}>
        <div className="floating-element-1 absolute top-1/4 left-1/4 w-72 h-72 rounded-full" />
        <div className="floating-element-2 absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full" />
      </div>

      {/* Main Content */}
      <div className="content-column">
        <div className="content-stack">
          {/* Badge */}
          <div className={`badge inline-flex ${mounted ? 'animate-fade-in-up animate-delay-200' : ''}`}>
            <div className="badge-dot" />
            <span>India's First Student Digital Incubator</span>
          </div>

          {/* Pre-headline */}
          <div className={`pre-headline ${mounted ? 'animate-fade-in-up animate-delay-400' : ''}`}>
            For ambitious student founders
          </div>

          {/* Main Headline */}
          <div className="text-backdrop">
            <h1 className={`hero-headline ${mounted ? 'animate-fade-in-up animate-delay-600' : ''}`}>
              <div className="typewriter-container">
                <span className={`typewriter-text ${typewriterDone ? 'done' : ''}`}>
                  Igniting India's Next <br />Generation of Entrepreneurs.
                </span>
              </div>
            </h1>
          </div>

          {/* Subheading */}
          <p className={`hero-subheading ${mounted ? 'animate-fade-in-up animate-delay-800' : ''}`}>
            XENTRO is India's first digital incubator for students — connecting ambitious founders 
            with world-class mentors, investors, and institutions to transform ideas into thriving startups.
          </p>

          {/* CTA Buttons */}
          <div className={`cta-buttons ${mounted ? 'animate-fade-in-up animate-delay-1000' : ''}`}>
            <button 
              className="btn-primary group"
              onClick={() => console.log('Get Started clicked')}
              aria-label="Get started with XENTRO"
            >
              <span>Get Started</span>
              <svg 
                className="btn-icon" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button 
              className="btn-secondary group"
              onClick={() => console.log('Learn More clicked')}
              aria-label="Learn more about XENTRO"
            >
              <span>Learn More</span>
              <svg 
                className="btn-icon" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Helper Text */}
          <p className={`helper-text ${mounted ? 'animate-fade-in-up' : ''}`}>
            Early access for student founders across India. Join the waitlist today.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="scroll-indicator animate-fade-in-up" 
        style={{ animationDelay: '1.2s' }}
        role="presentation"
        aria-label="Scroll down"
      />
    </section>
  );
}
