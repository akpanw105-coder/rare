"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scissors, Flame, MapPin, Shirt } from "lucide-react";
import { REFERENCE_IMAGES } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

export function BrandIntroduction() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".brand-heading", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-28 border-b border-[#27272a] bg-[#0c0c0e] relative overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">

          {/* Left Text Column */}
          <div className="brand-text-col lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="brand-heading space-y-3">
              <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase text-[#f97316] tracking-widest">
                <span className="w-6 h-0.5 bg-[#f97316]" />
                <span>Vintage Shirt Manifesto</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                Vintage Roots.<br />
                Lagos Needlework.<br />
                <span className="text-[#f97316]">Zero Conformity.</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
              RARE was built on a singular obsession — the vintage short-sleeve button-up shirt. Camp collars, retro archival prints, botanical motifs, mid-century geometry. Each piece is exclusively tailored in Lagos by independent local artisans who understand craft.
            </p>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We are not a general fashion boutique. RARE produces one thing: the finest locally made vintage shirt in Nigeria. Each print is unique, each run is limited, and no two customers are ever dressed the same. This is a shirt brand for individuals with a distinct point of view.
            </p>

            {/* Four Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
              {[
                {
                  icon: Shirt,
                  title: "Exclusively Shirts",
                  desc: "Camp-collar, Cuban-collar, retro-point. Only short-sleeve vintage button-ups.",
                },
                {
                  icon: Flame,
                  title: "Archival Print Work",
                  desc: "Botanical resorts, 70s geometry, abstract wave prints. No repeats.",
                },
                {
                  icon: Scissors,
                  title: "Local Tailoring",
                  desc: "Every shirt is handmade to order by skilled Lagos artisan tailors.",
                },
                {
                  icon: MapPin,
                  title: "Limited Editions",
                  desc: "Most drops are capped at 25–30 units. Own something irreplaceable.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="brand-pillar p-3.5 sm:p-4 border border-[#27272a] bg-[#121214] rounded-sm hover:border-[#f97316]/50 transition-colors duration-300"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#f97316] mb-2" />
                  <h4 className="text-[11px] sm:text-xs font-mono font-bold uppercase text-white tracking-wider">
                    {title}
                  </h4>
                  <p className="mt-1 text-[10px] sm:text-[11px] text-zinc-400 leading-normal">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual — Reference Image */}
          <div className="brand-visual-col lg:col-span-5">
            <div className="relative border border-[#27272a] overflow-hidden rounded-sm bg-[#121214]">
              {/* Actual reference shirt photo */}
              <div className="relative aspect-[4/5] w-full bg-zinc-950">
                <Image
                  src={REFERENCE_IMAGES.printed}
                  alt="RARE vintage camp-collar shirts on a rack"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                {/* Editorial overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e]/90 via-transparent to-[#0c0c0e]/20" />
                {/* Bottom caption */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400 block mb-1">
                    RARE Signature
                  </span>
                  <blockquote className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                    &ldquo;Not Made<br />To Blend In.&rdquo;
                  </blockquote>
                  <div className="mt-3 text-[10px] font-mono text-[#f97316] uppercase tracking-widest font-semibold">
                    Lagos · Nigeria
                  </div>
                </div>
              </div>

              {/* Orange corner accents */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#f97316]" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#f97316]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
