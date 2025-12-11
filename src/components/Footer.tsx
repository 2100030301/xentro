"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import "@/styles/Footer.css";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Programs", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand + short text */}
        <div className="footer-block">
          <h3 className="footer-logo">XENTRO</h3>
          <p className="footer-text">
            India&apos;s first digital incubator for student founders.
          </p>
          <div className="footer-contact">
            <div className="contact-row">
              <MapPin size={16} />
              <span>VDC, GITAM University, Visakhapatnam</span>
            </div>
            <div className="contact-row">
              <Phone size={16} />
              <span>+91 79935 04337</span>
            </div>
            <div className="contact-row">
              <Mail size={16} />
              <span>xentro@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="footer-block">
          <h4 className="footer-heading">Links</h4>
          <nav className="footer-links" aria-label="Footer navigation">
            {quickLinks.map((link) => (
              <Link key={link.name} href={link.href} className="footer-link">
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Newsletter */}
        <div className="footer-block">
          <h4 className="footer-heading">Stay updated</h4>
          <p className="footer-text">
            Get updates about new cohorts, events, and resources.
          </p>
          <form
            className="footer-newsletter"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("subscribe");
            }}
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="newsletter-input"
              aria-label="Email address"
            />
            <button type="submit" className="newsletter-btn">
              Join
            </button>
          </form>
          <div className="footer-social">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  aria-label={item.name}
                  className="social-icon"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {currentYear} XENTRO. All rights reserved.</span>
        <div className="bottom-links">
          <Link href="#privacy">Privacy</Link>
          <Link href="#terms">Terms</Link>
          <Link href="#cookies">Cookies</Link>
        </div>
      </div>

      <button
        type="button"
        className={`top-btn ${showTop ? "top-btn-show" : ""}`}
        onClick={handleScrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}
