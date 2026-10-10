import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর | বাংলাদেশের বাজারমূল্য",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর দেখুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-screen bg-[#f0f5f1]">
        <Navbar />
        <Marquee />
        <main>{children}</main>
      </body>
    </html>
  );
}