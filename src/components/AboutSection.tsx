"use client";

import { useEffect, useRef, useState } from "react";
import "@/styles/AboutSection.css";

const aboutText =
  "XENTRO is India's first digital incubator designed exclusively for student entrepreneurs. We believe every student has the potential to create something extraordinary. Our mission is to bridge the gap between classroom learning and real-world entrepreneurship by providing comprehensive support, mentorship, and resources. From idea validation to product development, from building your first MVP to securing funding, we walk alongside you at every step of your startup journey. Join a thriving community of innovators, dreamers, and doers who are turning bold ideas into impactful ventures that shape the future of India and beyond.";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateWords();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateWords = () => {
    const words = document.querySelectorAll(".about-word");
    words.forEach((word, index) => {
      setTimeout(() => {
        word.classList.add("active");
      }, index * 180);
    });
  };

  const words = aboutText.split(" ");

  return (
    <section ref={sectionRef} className="about-section">
      <div className="about-container">
        <p className="about-paragraph">
          {words.map((word, index) => (
            <span key={index} className="about-word">
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}