"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTA() {
  useEffect(() => {
    gsap.fromTo(".reveal-cta",
      { opacity: 0, scale: 0.95, y: 45 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "#cta",
          start: "top 85%",
        }
      }
    );
  }, []);

  return (
    <section id="cta" className="py-40 px-6 max-w-5xl mx-auto relative z-10">
      <div className="reveal-cta skew-elem bg-[#0d0d0e]/95 p-10 md:p-20 text-center flex flex-col items-center border border-primary/20 shadow-[0_24px_70px_rgba(217,107,45,0.05)] rounded-2xl relative overflow-hidden">
        {/* Glow inner layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-6 bg-gradient-to-r from-foreground via-tertiary to-foreground bg-clip-text text-transparent">
          Your workflows deserve to be <span className="text-secondary italic">remembered.</span>
        </h2>
        
        <p className="text-base md:text-lg text-text-secondary max-w-xl leading-relaxed mb-10 select-none">
          Echo is free to download. No accounts, no subscriptions, no cloud syncing. All your data stays offline inside your Mac.
        </p>

        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-download-modal"))}
          className="bg-primary hover:bg-secondary text-foreground text-base font-bold px-10 py-5 rounded-full transition-all duration-300 flex items-center gap-2.5 shadow-[0_8px_30px_rgba(217,107,45,0.4)] hover:scale-102 cursor-pointer z-10"
        >
          <Download className="w-5 h-5" />
          Download Echo for macOS
        </button>

        <span className="text-xs text-text-secondary mt-6 opacity-60 select-none">
          Requires macOS 14 Sonoma or later · Apple Silicon & Intel
        </span>
      </div>
    </section>
  );
}
