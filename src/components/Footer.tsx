"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Twitter, Linkedin, Instagram } from "lucide-react";
import logoWhite from "@/images/XENTRO-DARK.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative w-full bg-[#020617] border-t border-white/[0.08]"
      style={{ clear: "both" }}
    >
      {/* Ambient top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-px bg-gradient-to-r from-transparent via-[#2b40f6]/30 to-transparent" />

      {/* Centered container */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl px-6 lg:px-16">
          {/* Main content */}
          <div style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
            {/* Top row */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-14">
              {/* Logo + description */}
              <div className="flex-1">
                <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                  <Image
                    src={logoWhite}
                    alt="XENTRO"
                    width={40}
                    height={40}
                    className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="text-2xl font-semibold tracking-tight text-white">
                    XENTRO
                  </span>
                </Link>

                <p className="text-sm leading-relaxed text-gray-400 max-w-md">
                  India&apos;s first digital incubator empowering student founders
                  to transform ideas into impactful ventures.
                </p>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-4">
                {[Twitter, Linkedin, Instagram, Mail].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08]
                               flex items-center justify-center
                               hover:border-[#2b40f6]/50 hover:bg-white/[0.06]
                               transition-all duration-300"
                  >
                    <Icon className="w-4 h-4 text-gray-400 hover:text-[#2b40f6] transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/[0.08] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
              <p>© {currentYear} XENTRO. All rights reserved.</p>
              <a
                href="mailto:contact@xentro.in"
                className="hover:text-gray-300 transition-colors"
              >
                contact@xentro.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
