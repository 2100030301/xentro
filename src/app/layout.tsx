import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
      <body className={`${inter.variable} antialiased bg-[#020617]`}>
        {children}
      </body>
    </html>
  );
}
