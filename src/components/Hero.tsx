"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Monitor, Code, Clock, LayoutGrid, ShieldCheck, Home, Sliders, Search, Sparkles, FolderPlus, Globe, Sidebar } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Entrance timeline
    const heroTl = gsap.timeline();
    
    heroTl.to(".split-text", {
      y: "0%",
      duration: 1.2,
      stagger: 0.08,
      ease: "power4.out",
      delay: 0.2
    })
    .to(".hero-fade", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out"
    }, "-=0.6");

    // 2. ScrollTrigger 3D tilt
    if (mockupRef.current && containerRef.current) {
      gsap.to(mockupRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1.02,
        ease: "power1.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom center",
          scrub: true,
        }
      });

      // 3. Levitation animation loop
      gsap.to(mockupRef.current, {
        y: "-15px",
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5
      });
    }
  }, []);

  const handleScrollTo = (targetId: string) => {
    const element = document.querySelector(targetId);
    if (!element) return;
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: targetId, offsetY: 90 },
      ease: "power3.inOut",
    });
  };

  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center pt-36 pb-20 px-6 relative overflow-hidden"
    >


      {/* Background Glow Blobs */}
      <div className="ambient-glob glob-1"></div>
      <div className="ambient-glob glob-2"></div>

      {/* Social Proof Badge */}
      <div className="hero-fade opacity-0 translate-y-4 mb-6">
        <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary">
          <Monitor className="w-3.5 h-3.5" />
          Built for macOS 14+
        </div>
      </div>

      {/* Title */}
      <h1 className="text-center text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[1.05] mb-6 max-w-5xl">
        <span className="split-line">
          <span className="split-text">Your workflow,</span>
        </span>
        <br />
        <span className="split-line">
          <span className="split-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent relative">
            remembered.
          </span>
        </span>
      </h1>

      {/* Subtitle */}
      <p className="hero-fade opacity-0 translate-y-4 text-center text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-10">
        Echo silently captures every app, tab, and window you use — then lets you restore your entire context in one click.
      </p>

      {/* Action Buttons */}
      <div className="hero-fade opacity-0 translate-y-4 flex flex-col sm:flex-row gap-4 mb-12 z-10 w-full sm:w-auto items-center justify-center">
        <button
          onClick={() => handleScrollTo("#cta")}
          className="bg-primary hover:bg-secondary text-foreground text-base font-semibold px-8 py-4 rounded-full transition-all duration-300 w-full sm:w-auto text-center cursor-pointer shadow-[0_8px_24px_rgba(217,107,45,0.3)] hover:scale-102"
        >
          Download for macOS — Free
        </button>
        <button
          onClick={() => handleScrollTo("#how-it-works")}
          className="bg-surface/30 hover:bg-surface/60 border border-border-custom hover:border-foreground/20 text-foreground text-base font-semibold px-8 py-4 rounded-full transition-all duration-300 w-full sm:w-auto text-center cursor-pointer"
        >
          See how it works ↓
        </button>
      </div>

      {/* Social Proof Line */}
      <div className="hero-fade opacity-0 translate-y-4 text-center text-xs text-text-secondary/60 tracking-wide flex items-center justify-center gap-2 mb-16">
        <ShieldCheck className="w-4 h-4 text-secondary/60" />
        No subscription · Privacy-first · All data stays on-device
      </div>

      {/* macOS Window Mockup */}
      <div className="hero-fade opacity-0 translate-y-12 w-full max-w-4xl aspect-[16/10] hero-mockup-container">
        <div
          ref={mockupRef}
          className="hero-mockup w-full h-full bg-surface/85 border border-white/8 shadow-2xl rounded-2xl flex overflow-hidden"
          style={{ transform: "perspective(1200px) rotateX(12deg) rotateY(-8deg) scale(0.95)", transformStyle: "preserve-3d" }}
        >
          {/* Grid Layout */}
          <div className="flex-1 grid grid-cols-[180px_1fr] sm:grid-cols-[200px_1fr] bg-black/10 overflow-hidden text-left">
            {/* Sidebar */}
            <div className="border-r border-border-custom p-4 flex flex-col select-none bg-black/25">
              {/* Window Controls & Sidebar Toggle */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-1.5 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB2F]/20" />
                </div>
                <Sidebar className="w-3.5 h-3.5 text-text-secondary hover:text-foreground transition-colors cursor-pointer" />
              </div>

              {/* Logo / Brand */}
              <div className="flex items-center gap-2 mb-6">
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/15 rounded-full blur-sm" />
                  <img src="/echo_butterfly_icon.png" alt="Echo Logo" className="relative z-10 w-full h-full object-contain rounded-md" />
                </div>
                <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Echo
                </span>
              </div>

              {/* Nav Links */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-foreground bg-white/8 border border-white/5 rounded-lg cursor-pointer">
                  <Home className="w-3.5 h-3.5" />
                  Home
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-xs text-text-secondary hover:text-foreground rounded-lg cursor-pointer transition-colors">
                  <Sliders className="w-3.5 h-3.5" />
                  Timeline
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-xs text-text-secondary hover:text-foreground rounded-lg cursor-pointer transition-colors">
                  <Search className="w-3.5 h-3.5" />
                  Search
                </div>
              </div>

              {/* Sidebar Footer Status */}
              <div className="mt-auto flex items-center gap-2 text-[10px] text-text-secondary font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] animate-pulse" />
                Ready
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col overflow-y-auto bg-black/5 select-none">
              {/* Header */}
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-1.5 text-[9px] font-extrabold tracking-widest text-text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  WORKFLOW MEMORY
                </div>
              </div>

              {/* Header Title */}
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight mb-6 max-w-lg leading-tight">
                Recall and continue your working context instantly.
              </h2>

              {/* Record Activity Grid */}
              <div className="mb-6">
                <span className="text-[9px] font-bold tracking-wider text-text-secondary uppercase block mb-2.5">Record Activity</span>
                <div className="grid grid-cols-2 gap-4">
                  {/* Start New Workflow */}
                  <div className="bg-white/2 hover:bg-white/4 border border-border-custom hover:border-white/10 rounded-xl p-3.5 flex flex-col gap-2.5 cursor-pointer transition-all duration-300 group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF5F56]/20 to-[#FFBD2E]/20 border border-[#FF5F56]/20 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                      <Sparkles className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Start New Workflow</div>
                      <div className="text-[10px] text-text-secondary mt-0.5 leading-tight">Begin a fresh topic context from scratch</div>
                    </div>
                  </div>

                  {/* Record in Existing */}
                  <div className="bg-white/2 hover:bg-white/4 border border-border-custom hover:border-white/10 rounded-xl p-3.5 flex flex-col gap-2.5 cursor-pointer transition-all duration-300 group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#157EFB]/20 to-[#27C93F]/20 border border-[#157EFB]/20 flex items-center justify-center text-[#157EFB] group-hover:scale-105 transition-transform">
                      <FolderPlus className="w-4 h-4 text-[#157EFB]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Record in Existing</div>
                      <div className="text-[10px] text-text-secondary mt-0.5 leading-tight">Start a session under an active project</div>
                    </div>
                  </div>
                </div>
              </div>



              {/* Recent Workflows Section */}
              <div className="mb-6">
                <span className="text-[9px] font-bold tracking-wider text-text-secondary uppercase block mb-2.5">Recent Workflows</span>
                <div className="flex flex-col gap-2">
                  {/* Row 1 */}
                  <div className="bg-white/2 hover:bg-white/4 border border-border-custom rounded-xl px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#F0A624]/10 border border-[#F0A624]/20 flex items-center justify-center text-secondary">
                        <LayoutGrid className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">Design System Redesign</div>
                        <div className="text-[9px] text-text-secondary mt-0.5">Jun 17, 2026 at 11:20 • 2h 45m</div>
                      </div>
                    </div>
                    <div className="flex -space-x-1.5 overflow-hidden">
                      <div className="w-5 h-5 rounded-md bg-[#F24E1E] border border-[#141417] flex items-center justify-center text-[9px] text-white font-bold select-none shadow-sm">F</div>
                      <div className="w-5 h-5 rounded-md bg-[#157EFB] border border-[#141417] flex items-center justify-center text-[9px] text-white font-bold select-none shadow-sm">X</div>
                      <div className="w-5 h-5 rounded-md bg-[#4A154B] border border-[#141417] flex items-center justify-center text-[9px] text-white font-bold select-none shadow-sm">S</div>
                      <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[9px] text-white font-bold select-none shadow-sm">C</div>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="bg-white/2 hover:bg-white/4 border border-border-custom rounded-xl px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#10b981]/15 border border-[#10b981]/25 flex items-center justify-center text-[#10b981]">
                        <Globe className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">Next.js Landing Page</div>
                        <div className="text-[9px] text-text-secondary mt-0.5">Jun 17, 2026 at 09:15 • 1h 12m</div>
                      </div>
                    </div>
                    <div className="flex -space-x-1.5 overflow-hidden">
                      <div className="w-5 h-5 rounded-md bg-[#007ACC] border border-[#141417] flex items-center justify-center text-[9px] text-white font-bold select-none shadow-sm">C</div>
                      <div className="w-5 h-5 rounded-md bg-black border border-[#141417] flex items-center justify-center text-[9px] text-white font-bold select-none shadow-sm">&gt;_</div>
                      <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[9px] text-white font-bold select-none shadow-sm">C</div>
                      <div className="w-5 h-5 rounded-md bg-[#4A154B] border border-[#141417] flex items-center justify-center text-[9px] text-white font-bold select-none shadow-sm">S</div>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="bg-white/2 hover:bg-white/4 border border-border-custom rounded-xl px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#a78bfa]">
                        <Code className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">Rust Auth API</div>
                        <div className="text-[9px] text-text-secondary mt-0.5">Jun 16, 2026 at 18:30 • 45m</div>
                      </div>
                    </div>
                    <div className="flex -space-x-1.5 overflow-hidden">
                      <div className="w-5 h-5 rounded-md bg-[#007ACC] border border-[#141417] flex items-center justify-center text-[9px] text-white font-bold select-none shadow-sm">V</div>
                      <div className="w-5 h-5 rounded-md bg-black border border-[#141417] flex items-center justify-center text-[9px] text-white font-bold select-none shadow-sm">&gt;_</div>
                      <div className="w-5 h-5 rounded-md bg-[#FF6C37] border border-[#141417] flex items-center justify-center text-[9px] text-white font-bold select-none shadow-sm">P</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Area Footer */}
              <div className="mt-auto border-t border-border-custom/50 pt-3 flex justify-between items-center text-[10px] text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  12 active workflows
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-secondary" />
                  Total tracked: 124h 45m
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
