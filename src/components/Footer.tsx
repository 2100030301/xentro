"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import "@/styles/Footer.css";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/xentro",
    icon: Facebook,
    label: "Visit XENTRO on Facebook"
  },
  {
    name: "Twitter",
    href: "https://twitter.com/xentro",
    icon: Twitter,
    label: "Follow XENTRO on Twitter"
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/xentro",
    icon: Linkedin,
    label: "Connect with XENTRO on LinkedIn"
  },
  {
    name: "Instagram",
    href: "https://instagram.com/xentro",
    icon: Instagram,
    label: "Follow XENTRO on Instagram"
  }
];

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Logo Section */}
          <div className="footer-logo-section">
            <div className="footer-logo">
              <svg
                viewBox="0 0 80 80"
                className="footer-logo-icon"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Xentro logo"
              >
                {/* Double Chevron */}
                <path
                  d="M 20 20 L 40 40 L 20 60"
                  stroke="#1f2937"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 40 20 L 60 40 L 40 60"
                  stroke="#1f2937"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="footer-brand">XENTRO</h2>
          </div>

          {/* Description */}
          <p className="footer-description">
            India's first digital incubator for students, connecting ambitious founders 
            with world-class mentors, investors, and institutions.
          </p>

          {/* Social Icons */}
          <div className="footer-social">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={social.label}
                  title={social.label}
                >
                  <Icon className="footer-social-icon" />
                  <span className="sr-only">{social.name}</span>
                </a>
              );
            })}
          </div>

          {/* Footer Navigation Links */}
          <nav className="footer-nav" aria-label="Footer navigation">
            {footerLinks.map((link, index) => (
              <div key={link.name} className="footer-nav-item">
                <Link href={link.href} className="footer-link">
                  {link.name}
                </Link>
                {index < footerLinks.length - 1 && (
                  <span className="footer-link-divider" aria-hidden="true">·</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="footer-copyright">
            © {currentYear} XENTRO. All rights reserved.
          </p>
          <p className="footer-credit">
            Made with <span className="footer-heart">♥</span> by XENTRO Team
          </p>
        </div>
      </div>
    </footer>
  );
}
