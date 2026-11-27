"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Eye, MessageCircle, X, Check, Filter, Scissors } from "lucide-react";
import { VintageShirt, VINTAGE_SHIRTS } from "@/data/products";

// Fabric shade categories organizing the distinct material designs:
const SHADE_FILTERS = [
  { id: "all", label: "ALL SHADES" },
  { id: "tanika", label: "TANIKA" },
  { id: "geometric", label: "GEOMETRIC" },
  { id: "abstract", label: "ABSTRACT" },
  { id: "stripe", label: "STRIPE" },
] as const;

export function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedShirt, setSelectedShirt] = useState<VintageShirt | null>(null);

  const filteredShirts =
    activeFilter === "all"
      ? VINTAGE_SHIRTS
      : VINTAGE_SHIRTS.filter(
          (s) =>
            s.category === activeFilter ||
            s.name.toLowerCase().includes(activeFilter.toLowerCase()) ||
            s.fabricName.toLowerCase().includes(activeFilter.toLowerCase()) ||
            s.series.toLowerCase().includes(activeFilter.toLowerCase())
        );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);

  const getWhatsAppLink = (shirt: VintageShirt) => {
    const text = encodeURIComponent(
      `Hello RARE, I want to select the "${shirt.fabricName}" fabric design to be tailored into a vintage shirt (${formatPrice(shirt.price)}).\nPlease confirm fabric availability and sizing options.`
    );
    return `https://wa.me/2348000000000?text=${text}`;
  };

  return (
    <section
      id="shirts"
      className="py-20 lg:py-28 border-b border-[#27272a] bg-[#09090b] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 border-b border-zinc-800/60 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#e06820] tracking-[0.2em] mb-2.5">
              <Scissors className="w-3.5 h-3.5 text-[#e06820]" />
              <span>Vintage Fabric Archive · Sourced Across Lagos</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em] text-white">
              Shade Collection
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-mono max-w-xl leading-relaxed">
              Each card represents a distinct vintage fabric pattern. Choose your preferred fabric below to have it custom-tailored into RARE’s signature camp-collar silhouette.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 max-w-full bg-[#101012] p-1.5 border border-zinc-800/90 rounded-sm font-mono text-xs uppercase tracking-wider shrink-0 shadow-inner hide-scrollbar">
            {SHADE_FILTERS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 transition-all rounded-sm cursor-pointer text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.16em] ${
                  activeFilter === tab.id
                    ? "bg-[#e06820] text-black font-bold shadow-md"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid: Curated fashion catalogue */}
        {filteredShirts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredShirts.map((shirt) => (
              <div
                key={shirt.id}
                className="group border border-[#27272a] bg-[#101012] flex flex-col hover:border-[#e06820]/70 transition-all duration-300 rounded-sm overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-950/10"
              >
                {/* Product Visual */}
                <div className="relative aspect-[3/3.8] w-full bg-zinc-950 overflow-hidden">
                  <Image
                    src={shirt.image}
                    alt={`${shirt.name} tailored from ${shirt.fabricName}`}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient bottom and top vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

                  {/* Fabric badge */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-[0.18em] uppercase bg-black/90 text-[#e06820] border border-[#e06820]/50 shadow backdrop-blur-sm rounded-[2px]">
                      {shirt.badge || "LIMITED RUN"}
                    </span>
                  </div>

                  {/* Category Pill Right */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-zinc-400 bg-black/80 rounded-[2px] border border-white/5">
                      {shirt.category}
                    </span>
                  </div>

                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-end justify-center pb-6">
                    <button
                      type="button"
                      onClick={() => setSelectedShirt(shirt)}
                      className="px-5 py-2.5 bg-black/90 text-white hover:text-black hover:bg-[#e06820] border border-zinc-600 hover:border-[#e06820] font-mono text-[11px] uppercase tracking-[0.18em] flex items-center gap-2 transition-all cursor-pointer shadow-xl rounded-sm font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Fabric & Tailoring</span>
                    </button>
                  </div>
                </div>

                {/* Info Block */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5">
                      <span className="text-[#e06820] font-bold">{shirt.fabricName}</span>
                      <span className="text-zinc-500">LAGOS ARCHIVE</span>
                    </div>
                    <h3 className="text-base font-extrabold uppercase tracking-tight text-white group-hover:text-[#e06820] transition-colors line-clamp-1 leading-snug">
                      {shirt.name}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400 font-mono line-clamp-1">{shirt.tagline}</p>

                    {/* Available Sizes */}
                    <div className="flex items-center gap-1.5 mt-3.5">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase mr-1">SIZES:</span>
                      {shirt.sizes.map((sz) => (
                        <span
                          key={sz}
                          className="px-2 py-0.5 text-[10px] font-mono font-semibold border border-zinc-800 bg-zinc-900/90 text-zinc-300 rounded-[2px]"
                        >
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Tailored Price</span>
                      <span className="text-base font-mono font-bold text-white tracking-tight">
                        {formatPrice(shirt.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedShirt(shirt)}
                        className="p-2.5 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-500 rounded-sm transition-colors cursor-pointer"
                        title="View Details"
                        aria-label={`View details for ${shirt.name}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <a
                        href={getWhatsAppLink(shirt)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn px-4 py-2 bg-zinc-800/90 hover:bg-[#e06820] text-white hover:text-black text-[11px] font-mono font-bold uppercase tracking-[0.16em] rounded-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <span>Choose</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Graceful Empty State */
          <div className="py-16 text-center border border-dashed border-zinc-800 bg-[#121214] rounded-sm p-8">
            <Filter className="w-8 h-8 text-[#e06820] mx-auto mb-3" />
            <h4 className="text-lg font-mono font-bold text-white uppercase">
              No fabric designs currently in this category
            </h4>
            <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto font-mono">
              RARE sources in small vintage runs. Browse all available shades below.
            </p>
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className="mt-5 px-5 py-2.5 bg-[#e06820] text-black font-mono text-xs font-bold uppercase tracking-widest rounded-sm cursor-pointer"
            >
              View All Shades
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedShirt && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && setSelectedShirt(null)}
        >
          <div className="relative w-full max-w-3xl bg-[#101012] border border-[#27272a] rounded-sm overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row">
            <button
              onClick={() => setSelectedShirt(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/80 text-zinc-400 hover:text-white rounded-full border border-zinc-700/80 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto min-h-[300px] bg-zinc-950 shrink-0">
              <Image
                src={selectedShirt.image}
                alt={selectedShirt.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Modal Info */}
            <div className="p-6 md:p-8 w-full flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase bg-[#e06820] text-black rounded-[2px]">
                    {selectedShirt.fabricName}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                    {selectedShirt.series}
                  </span>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-tight">
                  {selectedShirt.name}
                </h3>
                <p className="text-xs font-mono text-zinc-400 uppercase">{selectedShirt.tagline}</p>

                <div className="text-xl font-mono font-bold text-[#e06820]">
                  {formatPrice(selectedShirt.price)} <span className="text-xs text-zinc-400 font-normal">/ Custom Made to Order</span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-sans">{selectedShirt.description}</p>
                <p className="text-[11px] font-mono text-zinc-400 bg-zinc-900/60 p-2.5 border-l-2 border-[#e06820] rounded-sm">
                  {selectedShirt.fabricDescription}
                </p>

                {/* Sizes */}
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-2">
                    Available Custom Sizing:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedShirt.sizes.map((sz) => (
                      <span
                        key={sz}
                        className="px-3 py-1.5 text-xs font-mono font-semibold border border-zinc-700 bg-zinc-900 text-white rounded-sm"
                      >
                        {sz}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Shirt Specs */}
                <div className="pt-2 space-y-1.5 text-[11px] font-mono text-zinc-400 border-t border-zinc-800">
                  {[
                    ["COLLAR STYLE", selectedShirt.collar],
                    ["MATERIAL", selectedShirt.fabric],
                    ["TAILORING CUT", selectedShirt.cut],
                    ["PRODUCTION", "Hand-Tailored in Lagos, Nigeria"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1 border-b border-zinc-900">
                      <span className="text-zinc-500">{k}</span>
                      <span className="text-zinc-200 text-right max-w-[200px] font-medium">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Details */}
                <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
                  {selectedShirt.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#e06820] shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-[#27272a] space-y-3">
                <a
                  href={getWhatsAppLink(selectedShirt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-[#e06820] hover:bg-[#c95716] text-black font-mono font-bold text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2 rounded-sm transition-colors cursor-pointer shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Shirt with This Fabric on WhatsApp</span>
                </a>
                <p className="text-[10px] font-mono text-center text-zinc-500 uppercase">
                  Each shirt is made to order in Lagos using the selected fabric design.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
