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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-[#020617]/60 backdrop-blur-xl border-b border-white/5"
        : "bg-transparent border-b border-transparent"
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
            className="
              group relative
              inline-flex items-center gap-3
              px-6 py-2.5
              bg-white/5 hover:bg-white/10
              border border-white/10 hover:border-blue-500/30
              rounded-full
              backdrop-blur-md
              transition-all duration-300
              hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]
            "
            style={{ paddingLeft: "1.5rem" }}
          >
            <span className="text-sm font-medium text-white tracking-wide">
              Join Waitlist
            </span>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-blue-500/20 transition-all duration-300 group-hover:scale-110">
              <svg
                className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </button>

        </div>
      </div>
    </nav>
  );
}
