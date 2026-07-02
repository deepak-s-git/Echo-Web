"use client";

import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RotateCcw, Wifi, Sparkles, Search } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MenuBarSection() {
  const [popoverOpen, setPopoverOpen] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [workflowName, setWorkflowName] = useState("");
  const [justRestored, setJustRestored] = useState<number | null>(null);

  useEffect(() => {
    // Animate Header
    gsap.from(".reveal-menubar-header", {
      opacity: 0,
      y: 30,
      letterSpacing: "-0.04em",
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#menubar",
        start: "top 85%",
      }
    });

    // Animate Left Column (Text)
    gsap.from(".reveal-menubar-left", {
      opacity: 0,
      x: -50,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#menubar",
        start: "top 78%",
      }
    });

    // Animate Right Column (Mockup)
    gsap.from(".reveal-menubar-right", {
      opacity: 0,
      x: 50,
      scale: 0.96,
      duration: 1.3,
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#menubar",
        start: "top 78%",
      }
    });
  }, []);

  const tags = [
    { label: "Coding", value: "Coding Workspace Setup" },
    { label: "Research", value: "Research Workspace Setup" },
    { label: "Design", value: "Design System Redesign" },
    { label: "Writing", value: "Product Specs Drafting" }
  ];

  const initialMemories = [
    { id: 1, title: "Design System Redesign", time: "2h ago • 2h 45m" },
    { id: 2, title: "Next.js Landing Page", time: "5h ago • 12m" },
    { id: 3, title: "Rust Auth API", time: "1d ago • 47m" }
  ];

  const handleRestore = (id: number) => {
    setJustRestored(id);
    setTimeout(() => setJustRestored(null), 1200);
  };

  return (
    <section id="menubar" className="py-32 px-6 max-w-5xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left column: Text */}
        <div className="reveal-menubar-left text-left select-none">
          <span className="text-xs uppercase tracking-widest text-secondary font-bold mb-3 inline-block">
            Menu Bar Companion
          </span>
          <h2 className="reveal-menubar-header text-3xl sm:text-5xl font-black tracking-tight text-foreground mb-6">
            Always there, <span className="text-primary">never in the way</span>
          </h2>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
            Echo lives quietly in your macOS menu bar. Clicking the menu bar icon gives you instant, keyboard-friendly control to start or stop workflow recording, review recent memories, or restore your context in milliseconds.
          </p>
        </div>

        {/* Right column: Interactive macOS Menu Bar Mockup */}
        <div className="reveal-menubar-right w-full max-w-md mx-auto relative">
          <div className="w-full skew-elem bg-[#0d0d0e]/95 border border-border-custom shadow-2xl rounded-2xl overflow-hidden flex flex-col relative">

            {/* macOS Top Menu Bar with Wifi, Battery, Echo Icon, and Date/Time */}
            <div className="h-8 bg-white/4 border-b border-white/5 flex items-center justify-end px-4 gap-3.5 select-none text-foreground/70">
              {/* Echo Icon Trigger */}
              <div
                onClick={() => setPopoverOpen(!popoverOpen)}
                className={`flex items-center justify-center w-6 h-6 rounded cursor-pointer transition-colors ${popoverOpen ? "bg-white/10 text-primary" : "hover:bg-white/5 hover:text-foreground"
                  }`}
              >
                <img src="/echo_butterfly_icon.png" alt="Echo Logo" className="w-3.5 h-3.5 object-contain" />
              </div>

              <Wifi className="w-3.5 h-3.5 text-foreground/80" />

              {/* Apple-style Battery Charging Icon */}
              <svg width="22" height="13" viewBox="0 0 22 13" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[11px] text-foreground/80 flex-shrink-0">
                <rect x="0.5" y="1" width="17" height="11" rx="2.5" fill="none" />
                <path d="M19.5 4.5V8.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
                <path d="M9.5 2.5L6.5 7H9.5L8.5 10.5L12.5 5.5H9.5L9.5 2.5Z" fill="currentColor" stroke="none" />
              </svg>

              {/* Spotlight Search Icon */}
              <Search className="w-3.5 h-3.5 text-foreground/80 flex-shrink-0" />

              <span className="text-[11px] font-medium text-foreground/80 tracking-wide">Wed Jun 17 12:28 PM</span>
            </div>

            {/* Desktop Wallpaper Canvas (behind dropdown) */}
            <div className="h-[460px] bg-gradient-to-br from-[#1c1815]/30 to-[#0D0D0F] relative p-4 flex justify-end items-start overflow-hidden">
              {/* Subtext info */}
              <div className="absolute bottom-4 left-4 text-[10px] text-text-secondary select-none opacity-45">
                Click the Echo icon in the menu bar to test
              </div>
            </div>

            {/* Popover Dropdown Panel positioned absolutely relative to the mockup container */}
            <div
              className={`absolute z-30 w-[290px] bg-[#09090b]/98 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl flex flex-col gap-2.5 transition-all duration-300 transform origin-top-right ${popoverOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              style={{ top: "40px", left: "50%", marginLeft: "-145px" }} // Perfectly aligned beneath the Echo Icon trigger (left of the clock)
            >
              {/* Header row: Icon, Name, and Status Badge */}
              <div className="flex justify-between items-center select-none pb-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <img src="/echo_butterfly_icon.png" alt="Echo" className="w-3.5 h-3.5 object-contain" />
                  </div>
                  <span className="text-xs font-black text-foreground tracking-wider uppercase">Echo</span>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-black/30 border border-white/5 rounded-full text-[9px] font-bold text-text-secondary">
                  <span className={`w-1.5 h-1.5 rounded-full ${isRecording ? "bg-primary animate-pulse" : "bg-text-secondary"}`} />
                  {isRecording ? "RECORDING" : "IDLE"}
                </div>
              </div>

              {/* Card 1: Start Workflow Recording */}
              <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-2.5 flex flex-col gap-2">
                <span className="text-[10px] font-bold text-text-secondary tracking-wider uppercase block">
                  {isRecording ? "Current Session" : "Start Workflow Recording"}
                </span>

                {/* Input and Action Button Row */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={isRecording ? "Recording activity..." : "Enter workflow name..."}
                    value={workflowName}
                    disabled={isRecording}
                    onChange={(e) => setWorkflowName(e.target.value)}
                    className="flex-1 bg-black/40 border border-white/5 hover:border-white/10 focus:border-primary/40 rounded-lg px-2.5 py-1.5 text-xs text-foreground placeholder:text-text-secondary focus:outline-none transition-colors"
                  />

                  {/* Record / Stop Button */}
                  <button
                    onClick={() => {
                      if (!isRecording && !workflowName) {
                        setWorkflowName("Coding Workspace Setup");
                      }
                      setIsRecording(!isRecording);
                    }}
                    className="w-7.5 h-7.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all cursor-pointer animate-none"
                  >
                    {isRecording ? (
                      <div className="w-2.5 h-2.5 bg-primary rounded-sm" />
                    ) : (
                      <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                    )}
                  </button>
                </div>

                {/* Category Tags */}
                {!isRecording && (
                  <div className="grid grid-cols-2 gap-1.5">
                    {tags.map((tag, idx) => (
                      <button
                        key={idx}
                        onClick={() => setWorkflowName(tag.value)}
                        className="bg-white/3 hover:bg-white/6 border border-white/5 hover:border-white/10 rounded-md py-0.5 px-1.5 text-[9px] font-semibold text-foreground/80 hover:text-foreground text-center truncate cursor-pointer transition-colors"
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Card 2: Recent Memories */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-text-secondary tracking-wider uppercase block">
                  Recent Memories
                </span>

                <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl overflow-hidden divide-y divide-white/5">
                  {initialMemories.map((mem) => {
                    const restored = justRestored === mem.id;
                    return (
                      <div
                        key={mem.id}
                        className="py-2 px-2.5 flex items-center justify-between hover:bg-white/2 transition-colors duration-200"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-semibold text-foreground truncate">{mem.title}</div>
                          <div className="text-[9px] text-text-secondary mt-0.5">{mem.time}</div>
                        </div>

                        {/* Restore Arrow Button */}
                        <button
                          onClick={() => handleRestore(mem.id)}
                          className={`w-6 h-6 rounded-md border flex items-center justify-center cursor-pointer transition-all duration-300 ${restored
                            ? "bg-primary border-primary text-white scale-90"
                            : "bg-white/4 border-white/6 hover:border-white/12 text-text-secondary hover:text-foreground"
                            }`}
                        >
                          {restored ? (
                            <Sparkles className="w-3 h-3 animate-spin" />
                          ) : (
                            <RotateCcw className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer buttons */}
              <div className="flex justify-between items-center border-t border-white/5 pt-2 text-[10px] font-bold text-text-secondary select-none">
                <button className="hover:text-foreground cursor-pointer transition-colors">Open Echo</button>
                <button className="hover:text-foreground cursor-pointer transition-colors">Quit</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
