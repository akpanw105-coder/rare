"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowDownRight, MessageCircle } from "lucide-react";

// ─── Hero headline animation — performance-optimised ────────────────────────
//
// Design goals:
//   • One master GSAP timeline — no competing tweens on the same element.
//   • Initial states set synchronously via gsap.set() before the timeline
//     runs, eliminating first-frame flashes and layout shifts.
//   • GPU layer promotion (will-change + translateZ) applied before motion
//     and cleaned up on completion so the compositor isn't left dirty.
//   • No x-axis drift on large display type — subpixel anti-aliasing on
//     massive glyphs moving horizontally causes visible roughness; instead
//     each line gets its own easing curve to preserve character without noise.
//   • Single fromTo per animated element — no overlapping tweens contesting
//     the same CSS property mid-flight (the main cause of GSAP stutter).
//   • prefers-reduced-motion: opacity-only, no transform at all.
//
// Sequence:
//   0.00s  Image settles (scale + opacity, GPU layer)
//   0.15s  "NOT"       rises and fades in   (power4.out, 0.72s)
//   0.32s  "MADE"      rises and fades in   (power4.out, 0.76s)
//   0.48s  "TO BLEND"  rises and fades in   (power3.out, 0.80s)  ← softer
//   0.65s  "IN."       rises and fades in   (expo.out,   0.84s)  ← punchy
//   1.10s  Subline fades up
//   1.28s  CTA buttons fade up
// ─────────────────────────────────────────────────────────────────────────────

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const sublineRef   = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const words = Array.from(
        headlineRef.current?.querySelectorAll<HTMLElement>(".hero-word") ?? []
      );

      // ── 1. Set all initial states synchronously (no first-frame flash) ────
      //    Use gsap.set so the browser never paints a visible intermediate.
      gsap.set(imageWrapRef.current, {
        scale: 1.06,
        opacity: 0.5,
        // Force GPU layer before the scale animation begins
        force3D: true,
      });

      gsap.set(words, { y: 0, opacity: 0, force3D: true });
      gsap.set([sublineRef.current, ctaRef.current], { opacity: 0, y: 14, force3D: true });

      // ── 2. Reduced-motion path — opacity only, no transforms ─────────────
      if (reduced) {
        const tl = gsap.timeline({ delay: 0.05 });
        tl.to(imageWrapRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" })
          .to(words, { opacity: 1, duration: 0.4, stagger: 0.07, ease: "power2.inOut" }, 0.1)
          .to([sublineRef.current, ctaRef.current], { opacity: 1, y: 0, duration: 0.35, stagger: 0.1, ease: "power2.inOut" }, 0.5);
        return;
      }

      // ── 3. Full-motion path ───────────────────────────────────────────────
      //
      // One `fromTo` per element. The "from" values are already applied by
      // gsap.set above (opacity: 0, y: 0), so we only need a `to` here —
      // but we use fromTo with explicit y-from so the clip-wipe is reliable
      // even if React re-renders before the first tick.

      // Per-line tuning. No x-drift. Each line has a distinct easing
      // personality that gives character without subpixel roughness.
      const lineConfig = [
        // "NOT"       — sharp, assertive
        { yFrom: 68, duration: 0.72, ease: "power4.out",  delay: 0.15 },
        // "MADE"      — heavier, slightly longer
        { yFrom: 74, duration: 0.76, ease: "power4.out",  delay: 0.32 },
        // "TO BLEND"  — wide, slightly softer so the outline breathes
        { yFrom: 70, duration: 0.80, ease: "power3.out",  delay: 0.48 },
        // "IN."       — deepest travel, expo settle — lands with intent
        { yFrom: 82, duration: 0.84, ease: "expo.out",    delay: 0.65 },
      ] as const;

      // Promote all word elements to GPU layers before any motion
      gsap.set(words, { willChange: "transform, opacity" });

      const masterTl = gsap.timeline({
        onComplete() {
          // Clean up compositor hints once animation is done
          gsap.set(words, { willChange: "auto", clearProps: "willChange" });
          gsap.set([sublineRef.current, ctaRef.current], { willChange: "auto", clearProps: "willChange" });
        },
      });

      // Image reveal — runs in parallel with the first word
      masterTl.to(
        imageWrapRef.current,
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out", force3D: true },
        0
      );

      // Each word: two tweens in sequence on the master timeline, but they
      // target DIFFERENT properties so GSAP never contests itself:
      //   tween A — y only, full duration, the motion easing
      //   tween B — opacity only, 45% of duration, starts at same position
      // This is cleaner than keyframes and avoids any internal prop conflict.
      words.forEach((word, i) => {
        const cfg = lineConfig[i];
        if (!cfg) return;

        const fadeEnd = cfg.duration * 0.46; // opacity finishes well before motion ends

        // Motion tween — transform only
        masterTl.fromTo(
          word,
          { y: cfg.yFrom },
          { y: 0, duration: cfg.duration, ease: cfg.ease, force3D: true },
          cfg.delay
        );

        // Opacity tween — starts at same time, finishes earlier
        // Because it only touches opacity (not y), there is zero GSAP conflict.
        masterTl.fromTo(
          word,
          { opacity: 0 },
          { opacity: 1, duration: fadeEnd, ease: "power2.inOut", force3D: false },
          cfg.delay
        );
      });

      // Supporting copy
      gsap.set(sublineRef.current, { willChange: "transform, opacity" });
      masterTl.to(
        sublineRef.current,
        { y: 0, opacity: 1, duration: 0.60, ease: "power3.out", force3D: true },
        1.10
      );

      // CTA buttons
      gsap.set(ctaRef.current, { willChange: "transform, opacity" });
      masterTl.to(
        ctaRef.current,
        { y: 0, opacity: 1, duration: 0.52, ease: "power3.out", force3D: true },
        1.28
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[92vh] sm:min-h-[95vh] flex flex-col justify-end overflow-hidden bg-[#09090b]"
    >
      {/* ── EDITORIAL CAMPAIGN PHOTOGRAPHY ─────────────────────── */}
      <div
        ref={imageWrapRef}
        className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none"
      >
        <Image
          src="/images/hero-editorial.jpg"
          alt="RARE vintage short-sleeve button-up camp-collar shirt"
          fill
          priority
          className="object-cover object-[center_18%] xs:object-[center_20%] sm:object-[center_22%] md:object-[62%_20%] lg:object-[68%_18%] filter brightness-[0.88] contrast-[1.04]"
          sizes="100vw"
        />

        {/* Cinematic editorial tone gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/55 sm:via-[#09090b]/40 to-transparent opacity-95 sm:opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 sm:via-[#09090b]/75 to-transparent w-full md:w-3/5 lg:w-1/2 opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/70 sm:from-[#09090b]/60 via-transparent to-transparent h-28 sm:h-32" />
        {/* Subtle warm amber/burgundy studio glow in shadows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#3a1518]/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ── FILM GRAIN TEXTURE ─────────────────────────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.025] mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "160px 160px",
        }}
      />

      {/* ── EDITORIAL CONTENT ──────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-14 pb-12 sm:pb-20 lg:pb-24 pt-20 sm:pt-32">
        <div className="max-w-2xl lg:max-w-3xl">

          {/* Confident Headline — NOT MADE TO BLEND IN. */}
          <h1
            ref={headlineRef}
            aria-label="NOT MADE TO BLEND IN."
            className="font-black uppercase tracking-[-0.04em] leading-[0.88] text-[#f4efe6] overflow-hidden select-none break-words"
            style={{ fontSize: "clamp(2.75rem, 8.5vw, 7.8rem)" }}
          >
            {/* Each outer span is overflow-hidden — acts as the clip mask for the
                upward wipe. hero-line is the selector used by the animation;
                hero-word is the element that actually moves. */}
            <span className="hero-line block overflow-hidden py-0.5">
              <span className="hero-word inline-block">NOT</span>
            </span>
            <span className="hero-line block overflow-hidden py-0.5">
              <span className="hero-word inline-block">MADE</span>
            </span>
            <span className="hero-line block overflow-hidden py-0.5">
              <span className="hero-word inline-block">
                TO&nbsp;
                <span
                  className="text-transparent"
                  style={{
                    WebkitTextStroke: "1.5px #f4efe6",
                    letterSpacing: "0.01em",
                  }}
                >
                  BLEND
                </span>
              </span>
            </span>
            <span className="hero-line block overflow-hidden py-0.5">
              <span className="hero-word inline-block text-[#f97316]">
                IN.
              </span>
            </span>
          </h1>

          {/* Minimal, impactful supporting copy */}
          <p
            ref={sublineRef}
            className="mt-5 sm:mt-8 max-w-lg text-xs sm:text-base text-zinc-300 font-light leading-relaxed tracking-wide"
          >
            Locally tailored vintage short-sleeve button-up shirts, crafted in limited Lagos runs for an uncompromising perspective.
          </p>

          {/* Two Clear CTAs: Primary & Secondary */}
          <div
            ref={ctaRef}
            className="mt-8 sm:mt-11 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
          >
            {/* Primary Action */}
            <Link
              href="#shirt-rack"
              className="group inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-9 py-3.5 sm:py-4 bg-[#f97316] text-black font-mono font-bold text-xs uppercase tracking-[0.16em] sm:tracking-[0.18em] hover:bg-[#ea580c] active:scale-[0.98] transition-all rounded-sm shadow-xl shadow-orange-500/20 cursor-pointer text-center"
            >
              <span>EXPLORE THE COLLECTION</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform shrink-0" />
            </Link>

            {/* Secondary Action */}
            <a
              href="https://wa.me/2348000000000?text=Hello%20RARE%2C%20I%20would%20like%20to%20inquire%20about%20ordering%20a%20vintage%20shirt."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-black/40 hover:bg-zinc-900/80 border border-zinc-700/80 hover:border-zinc-500 text-zinc-200 hover:text-white font-mono text-xs uppercase tracking-[0.16em] sm:tracking-[0.18em] active:scale-[0.98] transition-all rounded-sm backdrop-blur-sm cursor-pointer text-center"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-105 transition-transform shrink-0" />
              <span>ORDER VIA WHATSAPP</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
