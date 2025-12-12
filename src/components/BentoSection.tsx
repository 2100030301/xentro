"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Users, Rocket, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const bentoItems = [
  {
    id: 1,
    title: "Learn",
    description: "Master startup concepts from idea validation to MVP building",
    icon: Lightbulb,
    gradient: "from-blue-500/20 to-purple-500/20"
  },
  {
    id: 2,
    title: "Connect",
    description: "Join a community of ambitious student founders",
    icon: Users,
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 3,
    title: "Build",
    description: "Access mentorship, tools, and resources to turn ideas into ventures",
    icon: Rocket,
    gradient: "from-pink-500/20 to-orange-500/20"
  },
  {
    id: 4,
    title: "Scale",
    description: "Get connected with investors and grow your startup",
    icon: TrendingUp,
    gradient: "from-orange-500/20 to-blue-500/20"
  }
];

export default function BentoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.bento-card');
    
    cards.forEach((card, index) => {
      gsap.from(card as gsap.TweenTarget, {
        scrollTrigger: {
          trigger: card as gsap.DOMTarget,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out"
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 lg:py-32 bg-[#020617]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              How We <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Help You</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to turn your idea into a thriving startup
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 justify-items-center max-w-5xl mx-auto">
          {bentoItems.map((item) => (
            <div
              key={item.id}
              className="bento-card group w-full relative bg-white/2 backdrop-blur-sm border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-500 overflow-hidden"
              style={{ padding: '2.5rem' }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-3 grow">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-base lg:text-lg leading-relaxed pr-4">
                    {item.description}
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="mt-6 flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Explore</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 lg:mt-16 max-w-5xl mx-auto text-center">
          {[
            { value: "500+", label: "Student Founders" },
            { value: "50+", label: "Mentors" },
            { value: "₹10Cr+", label: "Funding Raised" },
            { value: "25+", label: "Startups Launched" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-8 bg-white/2 backdrop-blur-sm border border-white/10 rounded-2xl">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm lg:text-base text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
