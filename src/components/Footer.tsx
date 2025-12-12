"use client";

import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-[#020617]">
      <div className="w-full flex justify-center px-6 lg:px-12 py-6 sm:py-8">
        <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
            © {currentYear} XENTRO. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 sm:gap-4 order-1 sm:order-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300"
                aria-label={social.name}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Join Waitlist Button */}
          <button
            className="w-full sm:w-auto order-3 group px-8 py-3 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/10 hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
            onClick={() => console.log("Join Waitlist clicked")}
          >
            <span className="px-2">Join Waitlist</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
