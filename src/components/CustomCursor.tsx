"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Position state tracking for animation frame interpolation
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Detect touch-only devices to avoid intrusive desktop cursor behavior
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    let animId: number;

    // Smooth lerp function for trailing effect
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Position central dot immediately with transform
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest("a, button, input, [role='button'], .cursor-pointer");
        const imageElement = target.closest("img, [role='dialog'], .shirt-card-wrap");
        setIsHovered(!!interactive);
        setIsImageHovered(!!imageElement && !interactive);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      // Spawn ripple
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Mobile / touch tap ripple
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const newRipple = { id: Date.now(), x: touch.clientX, y: touch.clientY };
        setRipples((prev) => [...prev.slice(-2), newRipple]);
      }
    };

    // Animation loop for fluid trailing outer ring
    const render = () => {
      // Smooth interpolation: ring follows slightly behind with factor 0.18
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.18);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.18);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    // Attach listeners
    if (!hasTouch) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mousedown", handleMouseDown, { passive: true });
      window.addEventListener("mouseup", handleMouseUp, { passive: true });
      document.body.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      animId = requestAnimationFrame(render);
    } else {
      // Touch only tap ripple
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchStart);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  // Clean up ripples after animation duration
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  return (
    <>
      {/* ── DESKTOP CUSTOM ANIMATED CURSOR ───────────────────────── */}
      <div
        className={`fixed inset-0 pointer-events-none z-50 overflow-hidden transition-opacity duration-300 hidden md:block ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        {/* Outer Smooth Trailing Ring */}
        <div
          ref={ringRef}
          className="fixed top-0 left-0 pointer-events-none transform-gpu -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{
            marginLeft: "-18px",
            marginTop: "-18px",
            width: "36px",
            height: "36px",
          }}
        >
          <div
            className={`w-full h-full rounded-full transition-all duration-300 ease-out flex items-center justify-center ${
              isClicking
                ? "scale-75 border-[#f97316] bg-[#f97316]/10"
                : isHovered
                ? "scale-140 border-[#f4efe6] bg-[#f4efe6]/10 shadow-[0_0_15px_rgba(244,239,230,0.25)]"
                : isImageHovered
                ? "scale-125 border-[#d4a373] bg-[#d4a373]/5 shadow-[0_0_12px_rgba(212,163,115,0.2)]"
                : "scale-100 border-[#f4efe6]/50 shadow-[0_0_8px_rgba(244,239,230,0.15)]"
            }`}
            style={{
              borderWidth: "1px",
              boxShadow: isClicking
                ? "0 0 16px rgba(249, 115, 22, 0.4)"
                : undefined,
            }}
          >
            {/* Subtle inner champagne glow ring */}
            <div className="w-full h-full rounded-full animate-ping opacity-15 bg-[#f4efe6]" />
          </div>
        </div>

        {/* Central Precise Dot */}
        <div
          ref={dotRef}
          className="fixed top-0 left-0 pointer-events-none transform-gpu -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{
            marginLeft: "-3px",
            marginTop: "-3px",
            width: "6px",
            height: "6px",
          }}
        >
          <div
            className={`w-full h-full rounded-full transition-all duration-200 ${
              isClicking
                ? "bg-[#f97316] scale-150"
                : isHovered
                ? "bg-[#f97316] scale-125"
                : "bg-[#f4efe6] scale-100 shadow-[0_0_6px_rgba(244,239,230,0.6)]"
            }`}
          />
        </div>
      </div>

      {/* ── TOUCH & CLICK CIRCULAR EXPANDING RIPPLE ───────────────── */}
      <div
        className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
        aria-hidden="true"
      >
        {ripples.map((r) => (
          <div
            key={r.id}
            className="fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f4efe6]/40 bg-[#f4efe6]/5 animate-ping"
            style={{
              left: `${r.x}px`,
              top: `${r.y}px`,
              width: "48px",
              height: "48px",
              animationDuration: "500ms",
              animationIterationCount: 1,
            }}
          />
        ))}
      </div>
    </>
  );
}
