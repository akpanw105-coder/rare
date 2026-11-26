"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, MessageCircle, Shirt } from "lucide-react";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "SHIRTS", href: "#shirts" },
    { label: "SHIRT RACK", href: "#shirt-rack" },
    { label: "ABOUT", href: "#about" },
    { label: "LOOKBOOK", href: "#lookbook" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090b]/92 backdrop-blur-md border-b border-[#27272a] shadow-lg shadow-black/30"
          : "bg-[#09090b]/80 backdrop-blur-sm border-b border-[#27272a]/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6 sm:gap-10">
          <Link
            href="/"
            className="group flex items-center leading-none tracking-tighter cursor-pointer"
          >
            <span className="text-2xl sm:text-3xl font-black tracking-[-0.06em] text-white group-hover:text-[#f97316] transition-colors duration-200">
              RARE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-mono tracking-[0.16em] uppercase">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-zinc-400 hover:text-white transition-colors duration-200 relative py-1 text-[11px] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#f97316] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="https://wa.me/2348000000000?text=Hi%20RARE%2C%20I%20want%20to%20order%20a%20vintage%20shirt"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-300 border border-zinc-700/80 hover:border-zinc-500 hover:text-white transition-all duration-200 rounded-sm cursor-pointer hover:bg-zinc-900/60"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WHATSAPP ORDER</span>
          </a>

          <Link
            href="#shirts"
            className="group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.16em] bg-[#f97316] text-black font-bold hover:bg-[#ea580c] active:scale-[0.98] transition-all duration-200 rounded-sm shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Shirt className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>SHOP SHIRTS</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform hidden xs:inline-block" />
          </Link>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 rounded-sm cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#27272a] bg-[#0c0c0e]/98 backdrop-blur-md px-6 pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-1 font-mono text-xs uppercase tracking-widest pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-2 text-zinc-300 hover:text-[#f97316] hover:bg-zinc-900/60 rounded transition-colors flex items-center justify-between border-b border-zinc-900/80 text-[11px] tracking-[0.18em]"
              >
                <span>{link.label}</span>
                <span className="text-zinc-600">→</span>
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#27272a] space-y-2">
            <a
              href="https://wa.me/2348000000000?text=Hi%20RARE%2C%20I%20want%20to%20order%20a%20vintage%20shirt"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-mono uppercase tracking-wider border border-zinc-700 text-zinc-200 hover:border-zinc-500 rounded-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>ORDER VINTAGE SHIRT ON WHATSAPP</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
