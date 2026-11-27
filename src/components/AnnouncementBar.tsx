import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <aside
      aria-label="Announcement"
      className="bg-[#0e0e11] border-b border-[#27272a]/80 text-[#a1a1aa] text-[11px] font-mono uppercase tracking-[0.18em] py-2.5 px-4 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-zinc-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e06820] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e06820]" />
          </span>
          <span className="font-bold text-white tracking-[0.2em]">VINTAGE SHIRT ARCHIVE</span>
          <span className="hidden sm:inline text-zinc-600">/</span>
          <span className="hidden sm:inline text-zinc-400 font-medium tracking-[0.16em]">
            EXCLUSIVELY HAND-TAILORED IN LAGOS, NIGERIA
          </span>
        </div>

        <div className="flex items-center gap-5 text-[10px] tracking-[0.2em]">
          <span className="hidden md:inline text-zinc-500">DROP 01 — ARCHIVAL PRINTS</span>
          <Link
            href="#shirts"
            className="group text-zinc-200 hover:text-[#e06820] transition-colors flex items-center gap-1 font-semibold"
          >
            <span>SHOP SHIRTS</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
