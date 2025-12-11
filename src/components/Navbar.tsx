"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
      <div className="navbar-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="navbar-content flex items-center justify-between">
          {/* Logo - Left Side */}
          <Link href="/" className="navbar-logo shrink-0 flex items-center gap-2 sm:gap-3 group">
            <div className="logo-icon-wrapper">
              <svg 
                viewBox="0 0 80 80" 
                className="logo-icon" 
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Xentro logo"
              >
                {/* Double Chevron */}
                <path d="M 20 20 L 40 40 L 20 60" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M 40 20 L 60 40 L 40 60" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text text-white font-bold tracking-wide">XENTRO</span>
          </Link>

          {/* Center: Can add nav links here if needed */}
          <div className="navbar-center hidden lg:flex items-center gap-8">
            {/* Navigation links can be added here */}
          </div>

          {/* Right Side: Join Waitlist Button & Mobile Menu Toggle */}
          <div className="navbar-right flex items-center gap-3 sm:gap-4">
            {/* Join Waitlist Button */}
            <button 
              className="btn-join-waitlist text-sm sm:text-base"
              onClick={() => {
                // Add scroll behavior or modal logic here
                console.log("Join Waitlist clicked");
              }}
              aria-label="Join the waitlist"
            >
              Join Waitlist
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-menu-toggle lg:hidden inline-flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu lg:hidden border-t border-white/10 bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3 sm:space-y-4">
            {/* Mobile menu content */}
            <button 
              className="btn-join-waitlist w-full text-sm sm:text-base"
              onClick={closeMenu}
              aria-label="Join the waitlist"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
