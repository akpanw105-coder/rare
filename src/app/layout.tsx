import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "RARE — NOT MADE TO BLEND IN | Vintage Shirts Made in Lagos",
  description:
    "RARE is an independent Lagos studio exclusively producing locally tailored vintage short-sleeve button-up shirts. Camp collars, archival retro prints, and limited edition runs.",
  keywords: [
    "RARE",
    "vintage shirts Lagos",
    "vintage button-up shirts Nigeria",
    "camp collar shirts Lagos",
    "retro printed shirts Nigeria",
    "locally tailored shirts Lagos",
    "Cuban collar vintage shirts",
    "Nigerian vintage fashion",
  ],
  openGraph: {
    title: "RARE — NOT MADE TO BLEND IN | Vintage Shirts Made in Lagos",
    description:
      "Locally tailored vintage short-sleeve button-up shirts. Archival prints, camp collars, limited editions. Exclusively RARE.",
    type: "website",
    locale: "en_US",
    siteName: "RARE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#09090b] text-[#f4f4f5] selection:bg-[#e06820] selection:text-black font-sans">
        <CustomCursor />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
