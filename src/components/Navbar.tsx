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
  const [supportTab, setSupportTab] = useState<"upi" | "paypal">("upi");
  const [copiedText, setCopiedText] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

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
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 w-[calc(100%-48px)] max-w-5xl rounded-full transition-all duration-300 ${scrolled
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
                className="text-sm font-medium text-text-secondary hover:text-secondary transition-colors cursor-pointer"
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
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-lg flex flex-col justify-center items-center gap-8 transition-transform duration-500 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {["Features", "How It Works", "Timeline", "Integrations"].map((item) => {
          const target = `#${item.toLowerCase().replace(/\s+/g, "-")}`;
          return (
            <button
              key={item}
              onClick={() => handleScrollTo(target)}
              className="text-xl font-medium text-text-secondary hover:text-secondary transition-colors"
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
                <h3 className="text-lg font-bold text-foreground">Deepak.S</h3>
                <p className="text-xs text-secondary font-medium">Student & Indie Developer</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 text-sm text-text-secondary leading-relaxed mb-8">
              <p>
                Hey there! I'm <strong className="text-foreground">Deepak.S</strong>. I'm a student and a passionate developer who loves crafting minimalist, utility-first software.
              </p>
              <p>
                Juggling classes, coursework, and programming is a fun challenge. I enjoy dedicating my free time to building tools that solve real productivity problems and simplify developers' daily tasks.
              </p>
              <p>
                If my projects have saved you time or made your work week smoother, consider sponsoring my work. Any contribution directly supports my education and future software development!
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
                💖 Sponsor My Work
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

      {/* Support / Payment Modal */}
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

            <h3 className="text-lg font-bold text-foreground mb-4">Support My Work</h3>

            {/* Tab Selector */}
            <div className="flex bg-black/40 border border-white/5 p-1 rounded-xl mb-6">
              <button
                onClick={() => setSupportTab("upi")}
                className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all duration-300 cursor-pointer ${supportTab === "upi" ? "bg-primary text-foreground shadow-sm" : "text-text-secondary hover:text-foreground"
                  }`}
              >
                UPI (India)
              </button>
              <button
                onClick={() => setSupportTab("paypal")}
                className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all duration-300 cursor-pointer ${supportTab === "paypal" ? "bg-[#003087] text-white shadow-sm" : "text-text-secondary hover:text-foreground"
                  }`}
              >
                PayPal (Intl)
              </button>
            </div>

            {/* Tab 1: UPI India */}
            {supportTab === "upi" && (
              <div className="animate-fade-in flex flex-col items-center">
                <p className="text-xs text-text-secondary mb-6">Scan with GPay, PhonePe, or Paytm to support me</p>

                {/* Real UPI QR Code Image */}
                <div className="w-52 h-[260px] bg-white rounded-2xl p-2 flex flex-col items-center justify-between shadow-lg mb-6 relative group overflow-hidden">
                  <img
                    src="/upi_qr.jpg"
                    alt="UPI QR Code"
                    className="w-full h-full object-contain rounded-xl select-none"
                  />
                </div>

                <p className="w-full text-xs text-foreground font-mono bg-black/40 border border-white/5 rounded-xl py-2.5 px-4 break-all select-all">
                  deepaks898@slc
                </p>
              </div>
            )}

            {/* Tab 2: PayPal Intl */}
            {supportTab === "paypal" && (
              <div className="animate-fade-in flex flex-col items-center">
                <p className="text-xs text-text-secondary mb-6">Scan to support me internationally via PayPal</p>

                {/* Real PayPal QR Code Image */}
                <div className="w-52 h-[260px] bg-white rounded-2xl p-2 flex flex-col items-center justify-between shadow-lg mb-6 relative group overflow-hidden">
                  <img
                    src="/paypal_qr.jpg"
                    alt="PayPal QR Code"
                    className="w-full h-full object-contain rounded-xl select-none"
                  />
                </div>

                <p className="w-full text-xs text-foreground font-mono bg-black/40 border border-white/5 rounded-xl py-2.5 px-4 break-all select-all">
                  paypal.me/DEEPAKS898
                </p>
              </div>
            )}

            {/* Bottom buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleCopy(supportTab === "upi" ? "deepaks898@slc" : "https://paypal.me/DEEPAKS898")}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 text-foreground text-xs font-semibold py-3.5 rounded-2xl transition-colors cursor-pointer text-center"
              >
                {copiedText ? "Copied! ✓" : supportTab === "upi" ? "Copy UPI ID" : "Copy Link"}
              </button>

              {supportTab === "paypal" ? (
                <a
                  href="https://paypal.me/DEEPAKS898"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#003087] hover:bg-[#00246b] text-white text-xs font-bold py-3.5 rounded-2xl transition-colors text-center flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,48,135,0.25)]"
                >
                  Open PayPal
                </a>
              ) : (
                <button
                  onClick={() => {
                    setQrModalOpen(false);
                    setAboutModalOpen(true);
                  }}
                  className="flex-1 bg-primary hover:bg-secondary text-foreground text-xs font-bold py-3.5 rounded-2xl transition-colors cursor-pointer"
                >
                  Back
                </button>
              )}
            </div>

            {supportTab === "paypal" && (
              <button
                onClick={() => {
                  setQrModalOpen(false);
                  setAboutModalOpen(true);
                }}
                className="text-xs text-text-secondary hover:text-foreground transition-colors mt-4 block mx-auto underline cursor-pointer"
              >
                Back to Bio
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
