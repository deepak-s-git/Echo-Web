"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrainCircuit, RotateCcw, Compass, LineChart, Layers, Lock } from "lucide-react";
import GlowCard from "./GlowCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Features() {
  useEffect(() => {
    gsap.from(".reveal-feature", {
      opacity: 0,
      y: 40,
      scale: 0.98,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#features",
        start: "top 70%",
      }
    });
  }, []);

  return (
    <section id="features" className="py-32 px-6 max-w-5xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center mb-16 select-none">
        <span className="text-xs uppercase tracking-widest text-secondary font-bold mb-3 inline-block">
          Product Capabilities
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Everything your brain forgets, <span className="text-primary">Echo remembers</span>
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 - Session Memory */}
        <GlowCard className="reveal-feature p-8 min-h-[280px] md:col-span-2 flex flex-col justify-between">
          <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/20 flex items-center justify-center text-primary mb-6">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Session Memory</h3>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
              Echo groups your app activity into named workflow sessions. Switch context, come back hours later — everything is exactly where you left it.
            </p>
          </div>
        </GlowCard>

        {/* Card 2 - One-click Restore */}
        <GlowCard className="reveal-feature p-8 min-h-[280px] flex flex-col justify-between">
          <div className="w-12 h-12 rounded-xl bg-secondary/8 border border-secondary/20 flex items-center justify-center text-secondary mb-6">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">One-click Restore</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Restore an entire workflow — apps, browser tabs, terminal paths — with a single click. No more hunting through history.
            </p>
          </div>
        </GlowCard>

        {/* Card 3 - Browser-aware */}
        <GlowCard className="reveal-feature p-8 min-h-[280px] flex flex-col justify-between">
          <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/20 flex items-center justify-center text-primary mb-6">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Browser-aware</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Echo captures active browser tabs in Safari and Chrome, so your research context is never lost between sessions.
            </p>
          </div>
        </GlowCard>

        {/* Card 4 - Focus Score */}
        <GlowCard className="reveal-feature p-8 min-h-[280px] flex flex-col justify-between">
          <div className="w-12 h-12 rounded-xl bg-secondary/8 border border-secondary/20 flex items-center justify-center text-secondary mb-6">
            <LineChart className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Focus Score</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              A real-time focus indicator shows your workflow intensity, so you stay aware of where your attention is going.
            </p>
          </div>
        </GlowCard>

        {/* Card 5 - Timeline View */}
        <GlowCard className="reveal-feature p-8 min-h-[280px] flex flex-col justify-between">
          <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/20 flex items-center justify-center text-primary mb-6">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Timeline View</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Browse your complete workflow history. Every session, every app, in chronological order. Your second brain.
            </p>
          </div>
        </GlowCard>

        {/* Card 6 - Privacy First */}
        <GlowCard 
          className="reveal-feature p-8 min-h-[280px] lg:col-span-3"
          contentClassName="justify-center items-center text-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-foreground/5 border border-border-custom flex items-center justify-center text-foreground">
            <Lock className="w-6 h-6" />
          </div>
          <div className="max-w-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Privacy First</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Everything stays 100% on-device. No cloud. No analytics. No keylogger. Just you and your Mac.
            </p>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}
