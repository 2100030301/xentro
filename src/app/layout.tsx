import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xentro - Building India's First Digital Entrepreneurial Ecosystem",
  description: "XENTRO is India's first digital incubator for students — connecting young innovators with mentors, investors, and institutions to turn ideas into thriving startups.",
  keywords: ["startup", "student entrepreneurs", "incubator", "India", "innovation", "mentorship"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020617]`}
      >
        {children}
      </body>
    </html>
  );
}
