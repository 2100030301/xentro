"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import bg1 from "@/images/bg1.jpg";
import bg2 from "@/images/bg2.jpg";
import bg5 from "@/images/bg5.jpeg";
import bg6 from "@/images/bg6.jpeg";
import { Button } from "@/components/ui/button";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Bitcount+Grid+Double:wght@100..900&family=Bitcount+Prop+Double+Ink:wght,SZP1,SZP2,XPN1,XPN2@100..900,0..100,0..100,-100..100,-100..100&family=Bitcount+Prop+Single:wght@100..900&family=Macondo&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Unna:ital,wght@0,400;0,700;1,400;1,700&display=swap');
  
  /* Keyframe animations - refined for subtlety */
  @keyframes slideFromBottom {
    from { opacity: 0; transform: translateY(60px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes pulseDot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
  }

  @keyframes floatSlow {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-15px) rotate(120deg); }
    66% { transform: translateY(10px) rotate(240deg); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes buttonHoverArrow {
    from { transform: translateX(0); }
    to { transform: translateX(4px); }
  }

  @keyframes imageReveal {
    from { opacity: 0; filter: blur(10px); }
    to { opacity: 1; filter: blur(0); }
  }

  @keyframes scaleIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  @keyframes shimmer {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }

  @keyframes parallax {
    0% { transform: translateY(-5%) scale(1.05); }
    50% { transform: translateY(2%) scale(1.03); }
    100% { transform: translateY(-5%) scale(1.05); }
  }

  /* Core layout and spacing */
  .hero-section {
    min-height: 100vh;
    padding-top: 100px;
    padding-bottom: 100px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (min-width: 640px) { .hero-section { padding-top: 110px; padding-bottom: 110px; } }
  @media (min-width: 1024px) { .hero-section { padding-top: 120px; padding-bottom: 120px; } }

  .content-column {
    max-width: 950px;
    margin: 0 auto;
  }

  /* Consistent vertical rhythm */
  .content-stack > * + * {
    margin-top: 16px;
  }
  @media (min-width: 768px) { .content-stack > * + * { margin-top: 20px; } }

  /* Background & atmosphere */
  .bg-overlay {
    background: linear-gradient(
  180deg,
  rgba(0, 0, 0, 0.55) 0%,
  rgba(0, 0, 0, 0.65) 40%,
  rgba(0, 0, 0, 0.75) 70%,
  rgba(0, 0, 0, 0.95) 100%
);

    animation: imageReveal 1.2s ease-out forwards;
  }

  .text-backdrop {
    position: relative;
  }
  .text-backdrop::before {
    content: '';
    position: absolute;
    top: -40px; left: -40px; right: -40px; bottom: -40px;
    background: radial-gradient(circle at center, rgba(15,23,42,0.6) 0%, transparent 70%);
    filter: blur(40px);
    z-index: -1;
  }

  /* Badge */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 1.5rem;
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    color: rgba(255,255,255,0.95);
    animation: scaleIn 0.6s ease-out forwards;
  }

  .badge-dot {
    width: 8px;
    height: 8px;
    background: #3b82f6;
    border-radius: 50%;
    animation: pulseDot 2s ease-in-out infinite;
  }

  /* Pre-headline */
  .pre-headline {
    font-size: 1.125rem;
    font-weight: 400;
    color: rgba(255,255,255,0.7);
    letter-spacing: -0.025em;
  }

  /* Main headline */
  .hero-headline {
    font-family: 'Playfair Display', 'Audiowide', 'Bitcount Prop Double Ink', 'Macondo', -apple-system, sans-serif;
    font-weight: 800;
    font-size: clamp(2.5rem, 7vw, 5rem);
    line-height: 1.05;
    color: #ffffff;
    letter-spacing: -0.02em;
    max-width: 28em;
    margin-left: auto;
    margin-right: auto;
  }

  .typewriter-container {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid rgba(255,255,255,0.6);
  }
  .typewriter-text {
    animation: typewriter 2.2s steps(40) forwards;
  }
  .typewriter-text.done {
    border-right: none;
  }

  /* Subheading */
  .hero-subheading {
    font-size: clamp(1.125rem, 2.5vw, 1.25rem);
    line-height: 1.6;
    color: rgba(255,255,255,0.82);
    font-weight: 400;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
  }

  /* Buttons */
  .cta-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  @media (min-width: 640px) {
    .cta-buttons { flex-direction: row; gap: 1.5rem; }
  }

  .btn-primary, .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.125rem 2rem;
    font-size: 1.125rem;
    font-weight: 600;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
    position: relative;
    min-height: 56px;
  }

  @media (min-width: 768px) {
    .btn-primary, .btn-secondary { padding: 1.125rem 2.5rem; min-height: 60px; }
  }

  .btn-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    box-shadow: 0 20px 40px rgba(59,130,246,0.35);
  }
  .btn-primary:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 25px 50px rgba(59,130,246,0.5);
    background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
    animation: shimmer 2s ease-in-out infinite;
  }

  .btn-secondary {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.3);
    color: rgba(255,255,255,0.9);
  }
  .btn-secondary:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.6);
    transform: translateY(-2px) scale(1.02);
    color: white;
  }

  .btn-icon {
    width: 1.5rem;
    height: 1.5rem;
    transition: transform 0.25s ease;
  }
  .group:hover .btn-icon { transform: translateX(4px); }

  /* Helper text */
  .helper-text {
    font-size: 0.875rem;
    color: rgba(255,255,255,0.6);
    font-weight: 400;
    animation: fadeInUp 0.8s ease-out forwards 1.2s;
    opacity: 0;
  }

  /* Animations */
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  .animate-delay-200 { animation-delay: 0.2s; }
  .animate-delay-400 { animation-delay: 0.4s; }
  .animate-delay-600 { animation-delay: 0.6s; }
  .animate-delay-800 { animation-delay: 0.8s; }
  .animate-delay-1000 { animation-delay: 1s; }

  /* Floating elements - more subtle */
  .floating-element {
    mix-blend-mode: screen;
    filter: blur(2rem);
    opacity: 0.15;
    animation: floatSlow 12s ease-in-out infinite;
  }
  .floating-element-1 { 
    background: radial-gradient(circle, #3b82f6aa 0%, transparent 70%);
    animation: floatSlow 14s ease-in-out infinite;
  }
  .floating-element-2 { 
    background: radial-gradient(circle, #8b5cf6aa 0%, transparent 70%);
    animation: floatSlow 18s ease-in-out infinite;
    animation-delay: -4s;
  }

  /* Mobile optimizations */
  @media (max-width: 639px) {
    .btn-primary, .btn-secondary { 
      width: 100%; 
      justify-content: center;
      padding-left: 2.5rem;
      padding-right: 2.5rem;
    }
    .hero-headline { max-width: 100%; }
  }

  /* Scroll indicator */
  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 44px;
    height: 44px;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 25px;
    cursor: pointer;
  }
  .scroll-indicator::after {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    width: 24px;
    height: 24px;
    background: rgba(255,255,255,0.6);
    mask-image: radial-gradient(circle 8px at 8px 8px, black 100%, transparent 0);
    mask-size: 50%;
    animation: fadeInUp 2s infinite;
  }
`;

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [typewriterDone, setTypewriterDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setTypewriterDone(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx global>{styles}</style>
      <section className="hero-section relative flex items-center justify-center overflow-hidden text-white">
        {/* Enhanced background */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={bg6}
            alt="XENTRO futuristic tech background"
            fill
            priority
            quality={100}
            className="object-cover object-center"
            style={{ animation: 'imageReveal 1.2s ease-out forwards, parallax 8s ease-in-out infinite' }}
          />
          <div className="bg-overlay absolute inset-0" />
        </div>

        {/* Subtle floating elements */}
        <div className={`absolute inset-0 pointer-events-none ${mounted ? '' : 'opacity-0'}`}>
          <div className="floating-element-1 absolute top-1/4 left-1/4 w-72 h-72 rounded-full" />
          <div className="floating-element-2 absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full" />
        </div>

        {/* Main content */}
        <div className="content-column z-10 text-center">
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

            {/* Main headline */}
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
            <div className={`cta-buttons flex flex-col sm:flex-row gap-4 justify-center items-center ${mounted ? 'animate-fade-in-up animate-delay-1000' : ''}`}>
              <button className="btn-primary group">
                <span>Get Started</span>
                <svg className="btn-icon btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="btn-secondary group">
                <span>Learn More</span>
                <svg className="btn-icon btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Helper text */}
            <p className={`helper-text ${mounted ? 'animate-fade-in-up' : ''}`}>
              Early access for student founders across India. Join the waitlist today.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator animate-fade-in-up" style={{animationDelay: '1.2s'}} />
      </section>
    </>
  );
}
