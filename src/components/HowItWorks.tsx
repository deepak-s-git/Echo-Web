"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, RotateCw } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate Header
    gsap.from(".reveal-how-it-works-header", {
      opacity: 0,
      y: 30,
      letterSpacing: "-0.04em",
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#how-it-works",
        start: "top 85%",
      }
    });

    // Create scroll triggers for step highlight and visualizer swap
    const items = gsap.utils.toArray(".stepper-item-scroll");
    
    const triggers = items.map((item: any, index: number) => {
      return ScrollTrigger.create({
        trigger: item,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => setActiveStep(index),
        onEnterBack: () => setActiveStep(index)
      });
    });

    // Flowing down card parallax animation
    const stickyCard = containerRef.current?.querySelector(".sticky");
    let cardFlow: gsap.core.Tween | null = null;
    if (stickyCard) {
      cardFlow = gsap.fromTo(stickyCard,
        { y: -30 },
        {
          y: 50,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#how-it-works",
            start: "top center",
            end: "bottom center",
            scrub: 1.5, // lag-scrub for smooth organic delay
          }
        }
      );
    }

    return () => {
      triggers.forEach(t => t.kill());
      if (cardFlow) {
        cardFlow.scrollTrigger?.kill();
        cardFlow.kill();
      }
    };
  }, []);

  // Step 1 Typing Animation
  const [typedText, setTypedText] = useState("");
  useEffect(() => {
    if (activeStep !== 0) {
      setTypedText("");
      return;
    }
    const fullText = "Design System Redesign";
    let index = 0;
    let timer: NodeJS.Timeout;

    const type = () => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
        timer = setTimeout(type, 130);
      } else {
        timer = setTimeout(() => {
          setTypedText("");
          index = 0;
          type();
        }, 2500);
      }
    };

    type();

    return () => {
      clearTimeout(timer);
    };
  }, [activeStep]);

  return (
    <section id="how-it-works" className="py-32 px-6 max-w-5xl mx-auto relative z-10" ref={containerRef}>
      {/* Header */}
      <div className="text-center mb-16 select-none">
        <span className="text-xs uppercase tracking-widest text-secondary font-bold mb-3 inline-block">
          How It Works
        </span>
        <h2 className="reveal-how-it-works-header text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Three steps to never losing <span className="text-primary">context again</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative">
        {/* Left: Scrollable steps */}
        <div className="flex flex-col gap-40 py-20">
          <div className="stepper-item-scroll flex flex-col gap-4 text-left" data-step="0">
            <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold text-lg mb-2 transition-all duration-300 ${
              activeStep === 0 ? "border-primary text-secondary bg-primary/10 shadow-[0_0_15px_rgba(217,107,45,0.3)]" : "border-border-custom text-text-secondary"
            }`}>
              1
            </div>
            <h3 className={`text-2xl font-bold transition-colors duration-300 ${activeStep === 0 ? "text-secondary" : "text-foreground"}`}>
              Name your workflow
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed max-w-md">
              Open Echo and name your current workflow session (e.g., &quot;Design System Redesign&quot;). Hit record to start tracking.
            </p>
          </div>

          <div className="stepper-item-scroll flex flex-col gap-4 text-left" data-step="1">
            <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold text-lg mb-2 transition-all duration-300 ${
              activeStep === 1 ? "border-primary text-secondary bg-primary/10 shadow-[0_0_15px_rgba(217,107,45,0.3)]" : "border-border-custom text-text-secondary"
            }`}>
              2
            </div>
            <h3 className={`text-2xl font-bold transition-colors duration-300 ${activeStep === 1 ? "text-secondary" : "text-foreground"}`}>
              Work normally
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed max-w-md">
              Echo silently monitors your active applications, terminal directories, and browser tabs, running unobtrusively in the background without affecting performance.
            </p>
          </div>

          <div className="stepper-item-scroll flex flex-col gap-4 text-left" data-step="2">
            <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold text-lg mb-2 transition-all duration-300 ${
              activeStep === 2 ? "border-primary text-secondary bg-primary/10 shadow-[0_0_15px_rgba(217,107,45,0.3)]" : "border-border-custom text-text-secondary"
            }`}>
              3
            </div>
            <h3 className={`text-2xl font-bold transition-colors duration-300 ${activeStep === 2 ? "text-secondary" : "text-foreground"}`}>
              Restore anytime
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed max-w-md">
              Switch tasks or close apps as needed. When you return, click Echo in the menu bar, select your workflow, and restore every window exactly as it was.
            </p>
          </div>
        </div>

        {/* Right: Sticky visualizer panel */}
        <div className="hidden md:block h-full">
          <div className="sticky top-40 w-full h-[400px] skew-elem bg-surface/90 border border-border-custom rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center">
            {/* Step 1 Visual */}
            <div className={`visualizer-step absolute inset-0 flex items-center justify-center p-8 transition-all duration-500 ${
              activeStep === 0 ? "active opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
            }`}>
              <div className="bg-black/30 border border-border-custom rounded-xl p-6 w-full max-w-xs shadow-xl text-left">
                <span className="text-[10px] uppercase tracking-wider text-tertiary font-bold">New Session</span>
                <div className="bg-black/40 border border-border-custom rounded-lg p-3 my-4 font-mono text-sm text-primary h-11 flex items-center">
                  <span>{typedText}</span>
                  <span className="w-1.5 h-4 bg-primary animate-pulse ml-0.5" />
                </div>
                <div className="flex justify-end gap-2">
                  <span className="text-[11px] text-text-secondary border border-border-custom px-3 py-1.5 rounded-md">Cancel</span>
                  <span className="text-[11px] text-foreground bg-primary px-3 py-1.5 rounded-md font-semibold">Start Tracking</span>
                </div>
              </div>
            </div>

            {/* Step 2 Visual */}
            <div className={`visualizer-step absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500 ${
              activeStep === 1 ? "active opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
            }`}>
              <div className="relative w-24 h-24 flex items-center justify-center mb-8">
                <div className="absolute inset-0 border border-primary/30 rounded-full animate-ping opacity-25" style={{ animationDuration: '3s' }} />
                <div className="absolute -inset-4 border border-secondary/20 rounded-full animate-ping opacity-25" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-foreground shadow-[0_0_20px_rgba(217,107,45,0.4)] animate-pulse">
                  <RotateCw className="w-6 h-6 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
              </div>
              <span className="text-xs text-text-secondary select-none">Silently capturing app context...</span>
            </div>

            {/* Step 3 Visual */}
            <div className={`visualizer-step absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500 ${
              activeStep === 2 ? "active opacity-100 translate-y-0 scale-100 animate-in fade-in zoom-in duration-500" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
            }`}>
              <div className="text-center">
                <CheckCircle2 className="w-16 h-16 text-primary drop-shadow-[0_0_15px_rgba(217,107,45,0.5)] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground">Workspace Restored</h3>
                <p className="text-xs text-secondary mt-1.5 font-medium">Design System Redesign</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
