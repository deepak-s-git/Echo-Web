"use client";

import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (targetId: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(targetId);
    if (!element) return;

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: targetId, offsetY: 90 },
      ease: "power3.inOut",
    });
  };

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 w-[calc(100%-48px)] max-w-5xl rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border border-border-custom shadow-2xl"
            : "bg-surface/30 backdrop-blur-sm border border-transparent"
        }`}
      >
        {/* Logo */}
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleScrollTo("body")}>
          <div className="relative w-7 h-7 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-primary/15 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img src="/echo_butterfly_icon.png" alt="Echo Logo" className="relative z-10 w-full h-full object-contain rounded-md" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
            Echo
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How It Works", "Timeline", "Integrations"].map((item) => {
            const target = `#${item.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <button
                key={item}
                onClick={() => handleScrollTo(target)}
                className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors cursor-pointer"
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors cursor-pointer">
            Log In
          </button>
          <button
            onClick={() => handleScrollTo("#cta")}
            className="bg-primary text-foreground hover:bg-secondary transition-colors text-xs font-semibold px-5 py-2.5 rounded-full cursor-pointer shadow-[0_4px_12px_rgba(217,107,45,0.25)]"
          >
            Get Echo
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-foreground flex flex-col justify-center items-center gap-1 w-6 h-6 z-50 focus:outline-none cursor-pointer"
        >
          <span className={`h-0.5 w-5 bg-foreground rounded transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`h-0.5 w-5 bg-foreground rounded transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 bg-foreground rounded transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-lg flex flex-col justify-center items-center gap-8 transition-transform duration-500 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {["Features", "How It Works", "Timeline", "Integrations"].map((item) => {
          const target = `#${item.toLowerCase().replace(/\s+/g, "-")}`;
          return (
            <button
              key={item}
              onClick={() => handleScrollTo(target)}
              className="text-xl font-medium text-text-secondary hover:text-foreground transition-colors"
            >
              {item}
            </button>
          );
        })}
        <button
          onClick={() => handleScrollTo("#cta")}
          className="bg-primary text-foreground font-semibold px-8 py-3 rounded-full mt-4"
        >
          Get Echo
        </button>
      </div>

      <style jsx global>{`
        .logo-ripple .ripple-circle {
          width: 6px;
          height: 6px;
          opacity: 0;
          animation: ripple-anim 2.4s infinite ease-out;
        }
        .logo-ripple .delay-800 {
          animation-delay: 0.8s;
        }
        .logo-ripple .delay-1600 {
          animation-delay: 1.6s;
        }
        @keyframes ripple-anim {
          0% {
            width: 6px;
            height: 6px;
            opacity: 1;
          }
          100% {
            width: 24px;
            height: 24px;
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
