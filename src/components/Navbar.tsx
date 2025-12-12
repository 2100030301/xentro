"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logoWhite from "@/images/XENTRO-DARK.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#020617]/60 backdrop-blur-xl border-b border-white/5' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full flex justify-center px-6 lg:px-12">
        <div className="w-full max-w-6xl flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group transition-transform hover:scale-105"
          >
            <Image
              src={logoWhite}
              alt="XENTRO"
              width={100}
              height={32}
              priority
              className="h-7 lg:h-8 w-auto"
            />
            <span className="text-white font-semibold text-base lg:text-lg tracking-tight">
              XENTRO
            </span>
          </Link>

          {/* Join Waitlist Button */}
          <button
            className="group relative inline-flex items-center justify-center gap-4 px-16 py-3.5 text-base font-semibold text-white rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-white/60 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]"
            onClick={() => console.log("Join Waitlist clicked")}
          >
            <span className="relative z-10">Join Waitlist</span>
            <span className="relative z-10 grid place-items-center w-9 h-9 rounded-full bg-white/15 border border-white/30 shadow-inner shadow-black/30 transition-transform duration-300 group-hover:translate-x-0.5 px-1">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-white/5 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </nav>
  );
}
