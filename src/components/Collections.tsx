import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Shirt } from "lucide-react";
import { SHIRT_COLLECTIONS } from "@/data/products";

export function Collections() {
  return (
    <section id="collections" className="py-20 lg:py-28 border-b border-[#27272a] bg-[#0c0c0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#f97316] tracking-widest mb-2">
              <Shirt className="w-3.5 h-3.5 text-[#f97316]" />
              <span>VINTAGE PRINT DIRECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              SHIRT EDITIONS
            </h2>
          </div>
          <p className="text-sm font-mono text-zinc-400 max-w-md uppercase tracking-wider">
            Explore dedicated vintage shirt drops categorised by archival motifs: botanical resort prints, 70s geometric patterns, and high-contrast retro abstracts.
          </p>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SHIRT_COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              href="#shirts"
              className="group relative block overflow-hidden border border-[#27272a] bg-[#121214] transition-all hover:border-[#f97316]"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-950">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover object-center filter grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:filter-none"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />

                {/* Badge Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-2.5 py-1 text-[10px] font-mono font-bold tracking-widest uppercase bg-black/80 text-[#f97316] border border-[#f97316]/40 backdrop-blur-sm">
                    {col.tag}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/80 border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:bg-[#f97316] group-hover:text-black group-hover:border-[#f97316] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                    {col.subtitle}
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#f97316] transition-colors">
                    {col.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-300 font-sans line-clamp-2 leading-relaxed">
                    {col.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono uppercase text-zinc-400">
                    <span>{col.patternType}</span>
                    <span className="text-white group-hover:translate-x-1 transition-transform">
                      VIEW SHIRTS →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
