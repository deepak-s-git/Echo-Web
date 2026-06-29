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
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

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
          <button
            onClick={() => setAboutModalOpen(true)}
            className="bg-primary text-foreground hover:bg-secondary transition-colors text-xs font-semibold px-5 py-2.5 rounded-full cursor-pointer shadow-[0_4px_12px_rgba(217,107,45,0.25)]"
          >
            About Me
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
          onClick={() => {
            setMobileMenuOpen(false);
            setAboutModalOpen(true);
          }}
          className="bg-primary text-foreground font-semibold px-8 py-3 rounded-full mt-4"
        >
          About Me
        </button>
      </div>

      {/* About Me Modal */}
      {aboutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setAboutModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-md bg-[#131316] border border-white/10 rounded-3xl p-8 shadow-2xl z-10 animate-scale-up text-left overflow-hidden">
            {/* Glow effect inside modal */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setAboutModalOpen(false)}
              className="absolute top-6 right-6 text-text-secondary hover:text-foreground transition-colors cursor-pointer text-sm font-semibold"
            >
              ✕
            </button>

            {/* Header: Avatar/Initial */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-black text-white shadow-[0_0_15px_rgba(217,107,45,0.4)] select-none">
                S
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">S</h3>
                <p className="text-xs text-secondary font-medium">Student & Indie Developer</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 text-sm text-text-secondary leading-relaxed mb-8">
              <p>
                Hey there! I'm <strong className="text-foreground">S</strong>. I'm a student and a passionate developer who loves crafting minimalist, utility-first software.
              </p>
              <p>
                Juggling classes, coursework, and programming is a fun challenge. I enjoy dedicating my free time to building tools that solve real productivity problems and simplify developers' daily tasks.
              </p>
              <p>
                If my projects have saved you time or made your work week smoother, consider supporting my journey as a student developer. Tips or coffee sponsorships go a long way!
              </p>
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setAboutModalOpen(false);
                  setQrModalOpen(true);
                }}
                className="w-full bg-primary hover:bg-secondary text-foreground text-sm font-bold py-3.5 rounded-2xl transition-colors cursor-pointer text-center flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(217,107,45,0.3)]"
              >
                ☕ Buy Me a Coffee
              </button>
              <button
                onClick={() => setAboutModalOpen(false)}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/5 text-text-secondary hover:text-foreground text-sm font-semibold py-3.5 rounded-2xl transition-colors cursor-pointer text-center"
              >
                Back to Echo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code / Payment Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setQrModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-sm bg-[#131316] border border-white/10 rounded-3xl p-8 shadow-2xl z-10 animate-scale-up text-center overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-6 right-6 text-text-secondary hover:text-foreground transition-colors cursor-pointer text-sm font-semibold"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold text-foreground mb-1">Support My Work</h3>
            <p className="text-xs text-text-secondary mb-6">Scan with your phone to buy me a coffee via PayPal</p>

            {/* Beautiful Custom SVG QR Code */}
            <div className="w-56 h-56 mx-auto bg-white rounded-2xl p-4 flex items-center justify-center shadow-lg relative group">
              <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="currentColor">
                {/* QR Code Grid Pattern */}
                <path d="M0 0h25v25H0zm5 5v15h15V5zm4 4h7v7H9z" />
                <path d="M75 0h25v25H75zm5 5v15h15V5zm4 4h7v7H9z" />
                <path d="M0 75h25v25H0zm5 5v15h15V80zm4 4h7v7H9z" />
                <path d="M35 5h5v5h-5zm10 0h10v5H45zm15 5h5v15h-5zm0-5h5v5h-5zm-20 10h5v10h-5zm10 5h5v5h-5zm-5 5h5v5h-5zm15 15h15v5H80zm5 5h10v5H85zm5 5h5v5h-5zm-45-15h5v5h-5zm10 0h10v5H50zm15 5h5v5h-5zm-25 10h10v5H40zm15 5h5v5h-5zm-20 10h5v10h-5zm10 5h5v5h-5zm-5 5h5v5h-5zm15 5h15v5H80zm5 5h10v5H85zm5 5h5v5h-5z" />
                <path d="M5 30h5v10H5zm15 5h5v5h-5zm10-5h5v5h-5zm15 0h5v5h-5zm10 0h10v5H55zm15 5h5v15h-5zm0-5h5v5h-5zm-20 10h5v10h-5zm10 5h5v5h-5zm-5 5h5v5h-5z" />
                <path d="M30 65h5v10h-5zm15 0h10v5H45zm15 5h5v15h-5zm0-5h5v5h-5zm-20 10h5v10h-5zm10 5h5v5h-5zm-5 5h5v5h-5zm15 15h15v5H80zm5 5h10v5H85zm5 5h5v5h-5z" />
                {/* Center logo cutout */}
                <rect x="36" y="36" width="28" height="28" rx="8" fill="white" />
                {/* Stylized P logo representation in PayPal blue */}
                <path d="M44 42h6a3.5 3.5 0 0 1 3.5 3.5c0 1.8-1 3.2-2.8 3.4l-1 .2H47v5h-3zm3 2.5v2h1.8c.8 0 1.2-.6 1.2-1s-.4-1-1.2-1z" fill="#003087" />
                <path d="M46 44h6a3.5 3.5 0 0 1 3.5 3.5c0 1.8-1 3.2-2.8 3.4l-1 .2h-3v5h-3zm3 2.5v2h1.8c.8 0 1.2-.6 1.2-1s-.4-1-1.2-1z" fill="#0079C1" className="translate-x-0.5 translate-y-0.5 mix-blend-multiply opacity-90" />
              </svg>
            </div>

            <p className="text-xs text-text-secondary mt-6 select-all font-mono bg-black/40 border border-white/5 rounded-xl py-2.5 px-4 break-all select-all">
              paypal.me/s_indie_dev
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  navigator.clipboard.writeText("paypal.me/s_indie_dev");
                  alert("PayPal link copied to clipboard!");
                }}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 text-foreground text-xs font-semibold py-3.5 rounded-2xl transition-colors cursor-pointer"
              >
                Copy Link
              </button>
              <button
                onClick={() => {
                  setQrModalOpen(false);
                  setAboutModalOpen(true);
                }}
                className="flex-1 bg-primary hover:bg-secondary text-foreground text-xs font-bold py-3.5 rounded-2xl transition-colors cursor-pointer"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
