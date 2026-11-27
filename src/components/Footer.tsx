import React from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Mail, Shirt } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-[#09090b] border-t border-[#27272a] text-zinc-400 text-xs font-mono">
      {/* Top Banner Concierge Strip */}
      <div className="border-b border-zinc-800/80 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#0c0c0e]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] text-[#e06820] uppercase tracking-[0.2em] font-bold block mb-1">
              DIRECT SHIRT CONCIERGE
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight">
              CUSTOM FIT? SPECIAL VINTAGE FABRIC? TALK TO US.
            </h3>
          </div>

          <a
            href="https://wa.me/2348000000000?text=Hello%20RARE%2C%20I%20want%20to%20enquire%20about%20a%20vintage%20shirt"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#e06820] text-black font-bold uppercase tracking-[0.16em] hover:bg-[#c95716] active:scale-[0.98] transition-all rounded-sm shadow-md shrink-0 cursor-pointer w-full sm:w-auto text-center"
          >
            <MessageCircle className="w-4 h-4 fill-black text-black shrink-0" />
            <span>ORDER ON WHATSAPP</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </a>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl font-black tracking-[-0.05em] text-white hover:text-[#e06820] transition-colors">
              RARE
            </span>
          </Link>
          <p className="text-zinc-400 text-xs leading-relaxed uppercase font-mono">
            NOT MADE TO BLEND IN. Exclusively vintage short-sleeve button-up shirts, locally tailored in Lagos, Nigeria.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
            <Shirt className="w-3.5 h-3.5 text-[#e06820]" />
            <span>VINTAGE SHIRTS ONLY · LAGOS</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">NAVIGATE</h4>
          <ul className="space-y-2 uppercase text-[11px] tracking-wider">
            {[
              { label: "HOME", href: "#" },
              { label: "SHIRT RACK", href: "#shirt-rack" },
              { label: "SHADE COLLECTION", href: "#shirts" },
              { label: "ABOUT RARE", href: "#about" },
              { label: "EDITORIAL LOOKBOOK", href: "#lookbook" },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Shirt Editions */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">SHIRT EDITIONS</h4>
          <ul className="space-y-2 uppercase text-[11px] tracking-wider">
            {[
              "BOTANICAL RESORT PRINTS",
              "70S GEOMETRIC ARCHIVE",
              "RETRO MONOCHROME ABSTRACT",
              "STRIPE HERITAGE CUTS",
              "MOSAIC MODERNIST WEAVES",
            ].map((label) => (
              <li key={label}>
                <Link href="#shirts" className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">INQUIRIES</h4>
          <ul className="space-y-3 text-[11px]">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e06820] transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-3.5 h-3.5 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>@RARE.VINTAGE.SHIRTS</span>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#25D366] transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0 text-[#25D366]" />
                <span>+234 (0) 800 RARE NG</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:shirts@rare-vintage.com"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>SHIRTS@RARE-VINTAGE.COM</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#27272a] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>&copy; {new Date().getFullYear()} RARE VINTAGE SHIRTS. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-6">
            <span>NOT MADE TO BLEND IN</span>
            <span className="text-[#e06820]">LAGOS, NIGERIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}