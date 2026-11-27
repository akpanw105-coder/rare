"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, ArrowUpRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function WhatsAppCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".wacta-content", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="order"
      ref={sectionRef}
      className="relative py-24 lg:py-36 overflow-hidden border-b border-[#27272a]"
      style={{
        background:
          "linear-gradient(145deg, #0f0f12 0%, #09090b 55%, #180d04 100%)",
      }}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
        <div
          className="w-[800px] h-[800px] rounded-full opacity-[0.09] filter blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #e06820 0%, transparent 65%)",
          }}
        />
      </div>

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(#27272a 1px, transparent 1px), linear-gradient(to right, #27272a 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <div className="wacta-content relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-[#e06820] tracking-[0.2em] mb-6 px-3 py-1 bg-[#e06820]/10 border border-[#e06820]/25 rounded-sm backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#e06820]" />
          <span>Direct Concierge</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em] text-white leading-tight mb-6">
          Ready to Own
          <br />
          <span className="text-[#e06820]">Your Shirt?</span>
        </h2>

        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-10 max-w-xl mx-auto font-light">
          Every RARE shirt is hand-cut and tailored to order by Lagos artisan tailors. Message us directly on WhatsApp to select your fabric, confirm sizing, and arrange delivery across Nigeria.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/2348000000000?text=Hello%20RARE%2C%20I%20want%20to%20order%20a%20vintage%20shirt."
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#e06820] text-black font-mono font-bold text-xs uppercase tracking-[0.18em] hover:bg-[#c95716] active:scale-[0.98] transition-all rounded-sm shadow-xl shadow-orange-950/25 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-black text-black" />
            <span>Order on WhatsApp</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#shirts"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-zinc-700/80 text-zinc-200 font-mono text-xs uppercase tracking-[0.18em] hover:bg-zinc-900/80 hover:border-zinc-500 active:scale-[0.98] transition-all rounded-sm cursor-pointer"
          >
            Browse All Shades
          </a>
        </div>

        <p className="mt-9 text-[11px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
          Custom sizing available · Nationwide delivery · 25–30 units per drop
        </p>
      </div>
    </section>
  );
}
