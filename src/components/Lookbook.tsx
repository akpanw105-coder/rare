"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { FABRIC_IMAGES } from "@/data/products";

// Distinct individual vintage-inspired shirt photographs showcasing fabric, cut, and needlework
const EDITORIAL_LOOKS = [
  {
    id: "look-01",
    image: FABRIC_IMAGES.botanicalResort,
    title: "Botanical Resort Viscose",
    category: "ARCHIVAL PRINT",
    edition: "EDITION 01",
    description: "Hand-printed palm foliage on breathable drape viscose with an open Cuban camp collar and reinforced French seams.",
  },
  {
    id: "look-02",
    image: FABRIC_IMAGES.geometric70s,
    title: "1974 Geometric Mirage",
    category: "MID-CENTURY",
    edition: "EDITION 02",
    description: "Interlocking burnt amber and mustard architectural blocks tailored on crisp cotton-rayon with vintage horn buttons.",
  },
  {
    id: "look-03",
    image: FABRIC_IMAGES.abstractWaves,
    title: "Monochrome Wave Slub",
    category: "MONOCHROME",
    edition: "EDITION 03",
    description: "High-contrast ivory and obsidian undulating brushwork cut into RARE's signature relaxed straight-hem silhouette.",
  },
  {
    id: "look-04",
    image: FABRIC_IMAGES.heritageStripe,
    title: "Sunset Slub Cotton Rhythm",
    category: "TEXTURED WEAVE",
    edition: "EDITION 04",
    description: "Terracotta and sunburst slub cotton weave with vertical rhythm striping, wooden buttons, and twin side vents.",
  },
  {
    id: "look-05",
    image: FABRIC_IMAGES.tanikaNoir,
    title: "Tanika Midnight Noir Twill",
    category: "MICRO-PRINT",
    edition: "EDITION 05",
    description: "Deep obsidian peach-skin twill accented with burnished copper micro-motifs, notch collar, and tailored box pleat.",
  },
  {
    id: "look-06",
    image: FABRIC_IMAGES.mosaicEarth,
    title: "Mosaic Modernist Linen",
    category: "WEST AFRICAN",
    edition: "EDITION 06",
    description: "Raw earth terracotta and forest olive modernist mosaic tile motifs on linen-cotton with carved coconut shell buttons.",
  },
];

export function Lookbook() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position bounds
  const updateScrollButtons = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft: sLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(sLeft > 10);
    setCanScrollRight(sLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons]);

  // Horizontal scroll buttons
  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const cardWidth = 380;
    const distance = direction === "left" ? -cardWidth : cardWidth;
    sliderRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  // Drag interaction handlers (Desktop Mouse Dragging)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="lookbook"
      className="py-24 lg:py-32 border-b border-[#27272a] bg-[#09090b] relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Heading & Interactive Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-zinc-800/60 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#e06820] tracking-[0.2em] mb-3">
              <span className="w-6 h-0.5 bg-[#e06820]" />
              <span>Editorial Archives & Needlework</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em] text-[#f4efe6]">
              The Lookbook
            </h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Gallery Hint */}
            <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              Drag or scroll to explore
            </span>

            {/* Slider Prev / Next Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="w-10 h-10 flex items-center justify-center border border-zinc-700/80 text-zinc-300 hover:border-[#e06820] hover:text-[#e06820] disabled:opacity-20 disabled:cursor-not-allowed transition-colors rounded-sm cursor-pointer select-none"
                aria-label="Scroll left in lookbook"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="w-10 h-10 flex items-center justify-center border border-zinc-700/80 text-zinc-300 hover:border-[#e06820] hover:text-[#e06820] disabled:opacity-20 disabled:cursor-not-allowed transition-colors rounded-sm cursor-pointer select-none"
                aria-label="Scroll right in lookbook"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE HORIZONTAL GALLERY ───────────────────── */}
      <div className="relative w-full">
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex gap-6 sm:gap-8 overflow-x-auto px-5 sm:px-8 lg:px-12 pb-8 pt-2 hide-scrollbar select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            scrollSnapType: isDragging ? "none" : "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {EDITORIAL_LOOKS.map((item, index) => (
            <div
              key={item.id}
              className="group relative flex-none w-[290px] sm:w-[350px] lg:w-[380px] flex flex-col justify-between overflow-hidden border border-[#27272a] hover:border-[#e06820]/70 transition-all duration-500 rounded-sm bg-[#101012] shadow-xl hover:shadow-2xl hover:shadow-black/60"
              style={{
                scrollSnapAlign: "start",
              }}
            >
              {/* Image Container with existing smooth hover zoom animation preserved */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading={index < 3 ? "eager" : "lazy"}
                  draggable={false}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106 transform-gpu pointer-events-none"
                />

                {/* Subtle cinematic gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

                {/* Category Badge Top Left */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span className="px-2.5 py-1 text-[9px] font-mono font-bold tracking-[0.18em] uppercase bg-black/90 text-[#e06820] border border-[#e06820]/40 backdrop-blur-md rounded-[2px] shadow-md">
                    {item.category}
                  </span>
                </div>

                {/* Edition Stamp Top Right */}
                <div className="absolute top-4 right-4 z-10 text-[10px] font-mono text-zinc-400 bg-black/80 px-2.5 py-1 rounded-[2px] border border-white/10 pointer-events-none">
                  {item.edition}
                </div>
              </div>

              {/* Editorial Caption Box */}
              <div className="p-6 flex-1 flex flex-col justify-between border-t border-[#27272a] bg-[#101012]">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-[#f4efe6] group-hover:text-[#e06820] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono uppercase text-zinc-500 tracking-[0.18em]">
                  <span className="font-medium text-zinc-400">RARE · LAGOS</span>
                  <Link
                    href="#shirts"
                    className="text-zinc-300 group-hover:text-[#e06820] transition-colors flex items-center gap-1.5 font-bold"
                  >
                    <span>VIEW FABRICS</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Hover Bottom Accent Bar (Preserved micro-interaction) */}
              <div className="h-0.5 bg-[#e06820] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Editorial Callout Strip */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mt-12 sm:mt-16">
        <div className="pt-8 border-t border-[#27272a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase tracking-wider max-w-xl leading-relaxed">
            <Sparkles className="w-4 h-4 text-[#e06820] shrink-0" />
            <span>Different vintage fabrics sourced across Lagos — tailored exclusively in RARE’s signature camp-collar cut.</span>
          </div>
          <Link
            href="#shirt-rack"
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 border border-zinc-700/80 text-zinc-300 font-mono text-xs uppercase tracking-[0.18em] hover:border-[#e06820] hover:text-[#e06820] hover:bg-zinc-900/60 transition-all rounded-sm cursor-pointer shadow-sm"
          >
            <span>Inspect the Shirt Rack</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
