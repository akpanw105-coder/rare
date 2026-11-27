"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VINTAGE_SHIRTS, VintageShirt } from "@/data/products";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  X,
  Check,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Distinct aesthetic accent color and label per fabric design
const RACK_META: Record<string, { accent: string; label: string; year: string }> = {
  "rare-shirt-001": { accent: "#d4a373", label: "BOTANICAL RESORT", year: "EDITION 01" },
  "rare-shirt-002": { accent: "#e0a96d", label: "70s GEOMETRIC", year: "EDITION 02" },
  "rare-shirt-003": { accent: "#f4f4f5", label: "MONOCHROME WAVE", year: "EDITION 03" },
  "rare-shirt-004": { accent: "#fef08a", label: "SUNSET STRIPES", year: "EDITION 04" },
  "rare-shirt-005": { accent: "#e06820", label: "NOIR TANIKA", year: "EDITION 05" },
  "rare-shirt-006": { accent: "#fde68a", label: "MOSAIC EARTH", year: "EDITION 06" },
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

function getWhatsAppLink(shirt: VintageShirt) {
  const text = encodeURIComponent(
    `Hello RARE, I want to choose the "${shirt.fabricName}" fabric design for a custom tailored vintage shirt (${formatPrice(shirt.price)}).\nPlease confirm fabric availability and Lagos/nationwide delivery.`
  );
  return `https://wa.me/2348000000000?text=${text}`;
}

// Realistic Crafted Wooden Hanger with Hook SVG
function HangerSVG({ accent, isActive }: { accent: string; isActive: boolean }) {
  return (
    <div className="relative w-full flex justify-center py-1">
      <svg
        viewBox="0 0 160 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-32 sm:w-40 h-auto overflow-visible transition-all duration-300"
      >
        <defs>
          {/* Metallic hook gradient */}
          <linearGradient id="hookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e4e4e7" />
            <stop offset="50%" stopColor="#71717a" />
            <stop offset="100%" stopColor="#3f3f46" />
          </linearGradient>
          {/* Wooden bar gradient */}
          <linearGradient id="woodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3f271a" />
            <stop offset="50%" stopColor="#25160d" />
            <stop offset="100%" stopColor="#170c06" />
          </linearGradient>
        </defs>

        {/* Top curved metal hook hanging onto the rail */}
        <path
          d="M80 24 V15 C80 9 86 5 91 8 C96 11 96 17 93 19"
          stroke="url(#hookGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Small metal pivot ring */}
        <circle cx="80" cy="24" r="3" fill="#71717a" stroke="#27272a" strokeWidth="1" />

        {/* Ergonomic contoured wooden hanger body */}
        <path
          d="M80 24 C98 28 140 37 154 44 C157 45.5 156 48 152 48 H8 C4 48 3 45.5 6 44 C20 37 62 28 80 24 Z"
          fill="url(#woodGrad)"
          stroke="#523422"
          strokeWidth="1"
        />

        {/* Lower crossbar for trousers/support */}
        <line x1="16" y1="46" x2="144" y2="46" stroke="#523422" strokeWidth="2" strokeLinecap="round" />

        {/* RARE brand notch */}
        <rect
          x="75"
          y="28"
          width="10"
          height="4"
          rx="1"
          fill={isActive ? accent : "#a16207"}
          opacity={isActive ? 0.9 : 0.6}
        />
      </svg>
    </div>
  );
}

// Individual shirt card on the rack
function ShirtCard({
  shirt,
  index,
  isActive,
  onClick,
}: {
  shirt: VintageShirt;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const meta = RACK_META[shirt.id] ?? { accent: "#e06820", label: shirt.series, year: "01" };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative shrink-0 focus:outline-none flex flex-col items-center cursor-pointer text-left transition-all duration-500 ease-out select-none ${
        isActive ? "z-20" : "z-10 hover:z-15"
      }`}
      style={{
        width: isActive ? "clamp(260px, 72vw, 360px)" : "clamp(180px, 48vw, 240px)",
      }}
      aria-label={`View fabric sample: ${shirt.name}`}
    >
      {/* Crafted Hanger with gentle sway */}
      <div
        className={`w-full transition-transform duration-500 ${
          isActive ? "hanger-sway" : "group-hover:scale-105"
        }`}
        style={{
          transform: isActive ? "translateY(0)" : "translateY(8px)",
          opacity: isActive ? 1 : 0.75,
        }}
      >
        <HangerSVG accent={meta.accent} isActive={isActive} />
      </div>

      {/* Garment silhouette & fabric tile */}
      <div
        className="relative overflow-hidden rounded-t-sm rounded-b-md border w-full transition-all duration-500 transform-gpu"
        style={{
          borderColor: isActive ? meta.accent : "#27272a",
          aspectRatio: "3/4.2",
          boxShadow: isActive
            ? `0 0 0 1px ${meta.accent}60, 0 32px 70px -10px rgba(0,0,0,0.9), 0 0 45px -5px ${meta.accent}25`
            : "0 14px 30px -5px rgba(0,0,0,0.7)",
          transform: isActive
            ? "translateY(-14px) scale(1.02)"
            : "translateY(0) scale(0.97)",
          filter: isActive
            ? "none"
            : "brightness(0.8) contrast(0.95)",
        }}
      >
        {/* Fabric image */}
        <Image
          src={shirt.image}
          alt={shirt.name}
          fill
          priority={isActive}
          className="object-cover object-center transition-transform duration-700 ease-out"
          style={{
            transform: isActive ? "scale(1.05)" : "scale(1)",
          }}
          sizes="(max-width: 640px) 85vw, 360px"
        />

        {/* Vintage fabric drape lighting & realistic shadow gradations */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10" />
        {/* Subtle fabric fold / sheen reflection */}
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />

        {/* Top left badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          <span
            className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-[0.16em] uppercase shadow-md rounded-[2px]"
            style={{ backgroundColor: meta.accent, color: "#000" }}
          >
            {shirt.badge || "ARCHIVE"}
          </span>
          <span className="text-[9px] font-mono text-white/90 bg-black/75 px-1.5 py-0.5 rounded-[2px] backdrop-blur-xs border border-white/10 hidden sm:inline-block">
            {meta.year}
          </span>
        </div>

        {/* Active Shirt Tag on Top Right */}
        {isActive && (
          <div className="absolute top-3 right-3 z-10">
            <span className="flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono font-semibold tracking-wider uppercase bg-black/90 text-zinc-300 border border-zinc-700 rounded-[2px] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e06820] animate-pulse" />
              <span>ON RACK</span>
            </span>
          </div>
        )}

        {/* Bottom shirt & fabric details */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10">
          <span
            className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold block mb-1"
            style={{ color: meta.accent }}
          >
            {shirt.fabricName}
          </span>
          <p className="text-sm sm:text-base font-extrabold uppercase tracking-tight text-white line-clamp-1 leading-tight">
            {shirt.name}
          </p>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-xs sm:text-sm font-mono font-bold text-white">
              {formatPrice(shirt.price)}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono uppercase">
              / Tailored to size
            </span>
          </div>

          {isActive && (
            <p className="text-[11px] text-zinc-300 line-clamp-2 mt-2 leading-relaxed font-sans border-t border-zinc-800/80 pt-2">
              {shirt.fabricDescription}
            </p>
          )}
        </div>

        {/* Inactive Hover Indicator */}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-[1px]">
            <span className="px-3 py-1.5 bg-black/90 text-white text-[10px] font-mono uppercase tracking-[0.2em] border border-zinc-600 rounded-sm shadow-xl">
              Inspect Fabric
            </span>
          </div>
        )}

        {/* Active: Fine inner edge rim lighting */}
        {isActive && (
          <div
            className="absolute inset-0 pointer-events-none rounded-t-sm rounded-b-md"
            style={{
              boxShadow: `inset 0 0 35px ${meta.accent}20`,
            }}
          />
        )}
      </div>

      {/* Rack hanger distance number indicator */}
      <span className="mt-3 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors">
        0{index + 1}
      </span>
    </button>
  );
}

// Product Detail Modal / Drawer
function ProductDrawer({
  shirt,
  onClose,
  onFlip,
  isFlipped,
}: {
  shirt: VintageShirt;
  onClose: () => void;
  onFlip: () => void;
  isFlipped: boolean;
}) {
  const meta = RACK_META[shirt.id] ?? { accent: "#e06820", label: shirt.series, year: "01" };
  const currentImage = isFlipped && shirt.backImage ? shirt.backImage : shirt.image;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md p-0 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full sm:max-w-3xl bg-[#101012] border border-[#27272a] rounded-t-xl sm:rounded-sm shadow-2xl overflow-hidden max-h-[92vh] flex flex-col sm:flex-row transform-gpu"
        style={{ borderTop: `3px solid ${meta.accent}` }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/80 text-zinc-400 hover:text-white border border-zinc-700/80 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image with front/back toggle */}
        <div className="relative w-full sm:w-5/12 aspect-[3/4] sm:aspect-auto min-h-[280px] sm:min-h-0 shrink-0 bg-zinc-950 overflow-hidden">
          <Image
            src={currentImage}
            alt={`${shirt.name} tailored sample`}
            fill
            className="object-cover object-center transition-all duration-300"
            sizes="(max-width: 640px) 100vw, 42vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent sm:bg-none" />

          {/* Flip view button */}
          <button
            type="button"
            onClick={onFlip}
            title="Inspect front/back of garment"
            className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-black/90 border border-zinc-700 text-zinc-200 hover:text-[#e06820] hover:border-[#e06820] text-[10px] font-mono uppercase tracking-[0.16em] rounded-sm transition-colors cursor-pointer shadow-lg"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isFlipped ? "VIEW DETAIL" : "VIEW GARMENT"}</span>
          </button>
        </div>

        {/* Detail content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-4 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-[0.16em] rounded-[2px]"
              style={{ backgroundColor: meta.accent, color: "#000" }}
            >
              {shirt.badge ?? "RARE ORIGINAL"}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              FABRIC DESIGN #{shirt.id.replace("rare-shirt-", "")}
            </span>
          </div>

          <div>
            <span className="text-xs font-mono uppercase font-bold block" style={{ color: meta.accent }}>
              {shirt.fabricName}
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-1 leading-tight">
              {shirt.name}
            </h3>
            <p className="text-xs font-mono text-zinc-400 mt-1 uppercase">{shirt.tagline}</p>
          </div>

          <div className="flex items-baseline gap-2 pb-2 border-b border-zinc-800/80">
            <span
              className="text-2xl font-mono font-bold"
              style={{ color: meta.accent }}
            >
              {formatPrice(shirt.price)}
            </span>
            <span className="text-xs font-mono text-zinc-400 uppercase">
              (Includes Fabric & Artisan Tailoring)
            </span>
          </div>

          <div className="space-y-2 border-l-2 border-[#e06820] pl-3.5 bg-zinc-900/40 p-3 rounded-sm">
            <p className="text-xs text-zinc-200 leading-relaxed font-sans">{shirt.description}</p>
            <p className="text-[11px] font-mono text-zinc-400 mt-1">{shirt.fabricDescription}</p>
          </div>

          {/* Available Sizes */}
          <div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.18em] block mb-2">
              Available Custom Sizes
            </span>
            <div className="flex flex-wrap gap-2">
              {shirt.sizes.map((sz) => (
                <span
                  key={sz}
                  className="px-3 py-1.5 text-xs font-mono font-semibold border bg-zinc-900 text-white rounded-sm border-zinc-700/80 hover:border-[#e06820] transition-colors"
                >
                  {sz}
                </span>
              ))}
            </div>
          </div>

          {/* Garment Specifications */}
          <div className="text-[11px] font-mono text-zinc-400 space-y-1.5 border-t border-zinc-800/80 pt-3">
            {[
              ["Collar Style", shirt.collar],
              ["Material", shirt.fabric],
              ["Tailoring Cut", shirt.cut],
              ["Production", "Hand-Tailored in Lagos, Nigeria"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-1 border-b border-zinc-900">
                <span className="text-zinc-500">{k}</span>
                <span className="text-zinc-200 text-right max-w-[60%] font-medium">{v}</span>
              </div>
            ))}
          </div>

          {/* Key Details */}
          <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
            {shirt.details.map((d, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: meta.accent }} />
                <span>{d}</span>
              </li>
            ))}
          </ul>

          {/* WhatsApp Direct Ordering CTA */}
          <a
            href={getWhatsAppLink(shirt)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-full py-3.5 px-4 font-mono font-bold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 rounded-sm transition-opacity hover:opacity-95 cursor-pointer shadow-lg"
            style={{ backgroundColor: meta.accent, color: "#000" }}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Order Custom Shirt with This Fabric</span>
          </a>

          <p className="text-[10px] font-mono text-center text-zinc-500 uppercase tracking-wider">
            Different fabrics · Same signature RARE vintage shirt silhouette · Lagos dispatch
          </p>
        </div>
      </div>
    </div>
  );
}

// Main Shirt Rack Section
export function ShirtRack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [drawerShirt, setDrawerShirt] = useState<VintageShirt | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // Centre-scroll active card with smooth deceleration
  const scrollToActive = useCallback((idx: number) => {
    if (!trackRef.current) return;
    const cards = Array.from(trackRef.current.children) as HTMLElement[];
    const card = cards[idx];
    if (!card) return;

    // Calculate exact scrollLeft needed to center the card within the track's visible container
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const trackWidth = trackRef.current.clientWidth;
    const targetScrollLeft = cardLeft - (trackWidth / 2 - cardWidth / 2);

    trackRef.current.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: "smooth" });
  }, []);

  const prev = useCallback(() => {
    const n = Math.max(0, activeIndex - 1);
    setActiveIndex(n);
  }, [activeIndex]);

  const next = useCallback(() => {
    const n = Math.min(VINTAGE_SHIRTS.length - 1, activeIndex + 1);
    setActiveIndex(n);
  }, [activeIndex]);

  // Touch swipe handling for mobile
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const isSwipingRef = useRef<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    isSwipingRef.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isSwipingRef.current) return;
    isSwipingRef.current = false;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartXRef.current - touchEndX;
    const deltaY = touchStartYRef.current - touchEndY;

    // Only swipe if horizontal motion exceeds vertical and exceeds threshold
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        next();
      } else {
        prev();
      }
    }
  };

  useEffect(() => {
    // Timeout allows DOM layout and CSS transition (e.g., card width change) to settle before centering
    const timer = setTimeout(() => {
      scrollToActive(activeIndex);
    }, 50);

    const handleResize = () => scrollToActive(activeIndex);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex, scrollToActive]);

  const activeShirt = VINTAGE_SHIRTS[activeIndex];
  const activeMeta = RACK_META[activeShirt.id] ?? { accent: "#e06820", label: "", year: "01" };

  return (
    <section
      id="shirt-rack"
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-[#070709] border-b border-[#27272a] overflow-hidden"
    >
      {/* Ambient Radial Spotlight Behind Active Garment */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-700"
        aria-hidden
      >
        <div
          className="w-[800px] h-[800px] rounded-full opacity-[0.09] filter blur-3xl"
          style={{
            background: `radial-gradient(circle, ${activeMeta.accent} 0%, transparent 65%)`,
            transition: "background 0.8s ease",
          }}
        />
      </div>

      {/* Subtle Studio Dot Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Perspective Narrative */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/60 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#e06820] tracking-[0.2em] mb-4">
              <span className="w-6 h-0.5 bg-[#e06820]" />
              <span>Interactive Tailoring Rack</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-[-0.04em] text-white leading-[0.95]">
              {["THE", "SHIRT", "RACK"].map((w) => (
                <span key={w} className="inline-block mr-3 sm:mr-5">
                  {w}
                </span>
              ))}
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm font-mono text-zinc-300 uppercase tracking-wider leading-relaxed">
              Six distinct archival vintage fabrics — all cut in RARE’s signature camp-collar silhouette.
            </p>
            <p className="text-xs text-zinc-500 mt-2 font-mono leading-relaxed">
              Slide along the chrome rail to lift and inspect each fabric weave. Tap any garment to inspect the tailoring or order directly via WhatsApp.
            </p>
          </div>
        </div>

        {/* ── 3D CHROME STUDIO RAIL BAR ───────────────────────── */}
        <div className="relative mx-auto mb-4">
          {/* Top rail support brackets */}
          <div className="flex justify-between items-center px-8 sm:px-16 mb-[-6px] relative z-0 opacity-40">
            <div className="w-3 h-5 bg-zinc-600 rounded-t-sm" />
            <div className="w-3 h-5 bg-zinc-600 rounded-t-sm" />
            <div className="w-3 h-5 bg-zinc-600 rounded-t-sm" />
          </div>

          {/* Polished brushed stainless chrome rail */}
          <div
            ref={railRef}
            className="relative w-full h-3 rounded-full overflow-hidden shadow-2xl z-10"
            style={{
              background:
                "linear-gradient(180deg, #f4f4f5 0%, #a1a1aa 25%, #3f3f46 60%, #18181b 100%)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.8)",
            }}
          >
            {/* Top metallic highlight glint */}
            <div className="absolute inset-x-0 top-0 h-1 bg-white/70" />
            {/* Ambient shadow underneath rail */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-black/60" />
          </div>

          {/* Scrollable shirt track with 6 distinct fabric shirts */}
          <div
            ref={trackRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex gap-4 sm:gap-10 overflow-x-auto pt-3 pb-8 px-[calc(50vw-130px)] sm:px-12 hide-scrollbar relative z-20 items-end"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {VINTAGE_SHIRTS.map((shirt, i) => (
              <div key={shirt.id} className="shirt-card-wrap flex-shrink-0">
                <ShirtCard
                  shirt={shirt}
                  index={i}
                  isActive={i === activeIndex}
                  onClick={() => {
                    if (i === activeIndex) {
                      setIsFlipped(false);
                      setDrawerShirt(shirt);
                    } else {
                      setActiveIndex(i);
                      scrollToActive(i);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── CONTROLS + ACTIVE SHIRT BANNER ───────────────────── */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 bg-[#0f0f12] p-4 sm:p-5 border border-zinc-800/90 rounded-sm shadow-xl">
          {/* Arrow navigation */}
          <div className="flex items-center justify-between sm:justify-start gap-3 border-b sm:border-b-0 border-zinc-800/60 pb-3 sm:pb-0">
            <button
              type="button"
              onClick={prev}
              disabled={activeIndex === 0}
              className="w-10 h-10 flex items-center justify-center border border-zinc-700 text-zinc-300 hover:border-[#e06820] hover:text-[#e06820] disabled:opacity-25 disabled:cursor-not-allowed transition-colors rounded-sm cursor-pointer"
              aria-label="Previous shirt"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400 uppercase tracking-[0.16em] sm:tracking-[0.18em]">
              FABRIC {activeIndex + 1} OF {VINTAGE_SHIRTS.length}
            </span>
            <button
              type="button"
              onClick={next}
              disabled={activeIndex === VINTAGE_SHIRTS.length - 1}
              className="w-10 h-10 flex items-center justify-center border border-zinc-700 text-zinc-300 hover:border-[#e06820] hover:text-[#e06820] disabled:opacity-25 disabled:cursor-not-allowed transition-colors rounded-sm cursor-pointer"
              aria-label="Next shirt"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Active shirt detail banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:justify-end gap-3 sm:gap-6 font-mono text-xs">
            <div className="flex items-baseline sm:flex-col justify-between sm:justify-start gap-2">
              <div>
                <span
                  className="text-[10px] block uppercase font-bold tracking-widest"
                  style={{ color: activeMeta.accent }}
                >
                  {activeShirt.fabricName}
                </span>
                <span className="text-zinc-200 font-extrabold uppercase tracking-wide truncate max-w-[200px] sm:max-w-xs block">
                  {activeShirt.name}
                </span>
              </div>
              <div className="font-bold text-sm sm:text-base whitespace-nowrap" style={{ color: activeMeta.accent }}>
                {formatPrice(activeShirt.price)}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsFlipped(false);
                setDrawerShirt(activeShirt);
              }}
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 font-bold uppercase tracking-[0.16em] hover:opacity-90 active:scale-[0.98] transition-all rounded-sm text-xs cursor-pointer shadow-md w-full sm:w-auto"
              style={{ backgroundColor: activeMeta.accent, color: "#000" }}
            >
              <span>Inspect & Order</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2.5 justify-center mt-6">
          {VINTAGE_SHIRTS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setActiveIndex(i);
                scrollToActive(i);
              }}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === activeIndex ? 28 : 8,
                height: 8,
                backgroundColor:
                  i === activeIndex ? activeMeta.accent : "#3f3f46",
              }}
              aria-label={`Go to shirt ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Drawer / Inspection Dialog */}
      {drawerShirt && (
        <ProductDrawer
          shirt={drawerShirt}
          onClose={() => setDrawerShirt(null)}
          onFlip={() => setIsFlipped((f) => !f)}
          isFlipped={isFlipped}
        />
      )}
    </section>
  );
}
