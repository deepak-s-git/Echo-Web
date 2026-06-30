"use client";

import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

const decodeB64 = (str: string) => {
  if (typeof window === "undefined") return "";
  return atob(str);
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState<"bio" | "sponsor">("bio");
  const [supportTab, setSupportTab] = useState<"upi" | "paypal">("upi");
  const [copiedText, setCopiedText] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [downloadName, setDownloadName] = useState("");
  const [downloadEmail, setDownloadEmail] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [emailError, setEmailError] = useState("");

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

  useEffect(() => {
    const handleOpen = () => {
      setDownloadModalOpen(true);
      setIsDownloading(false);
      setEmailError("");
    };
    window.addEventListener("open-download-modal", handleOpen);
    return () => window.removeEventListener("open-download-modal", handleOpen);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Prevent common keyboard shortcuts for inspection
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 key
      if (e.key === "F12") {
        e.preventDefault();
      }
      // Ctrl+Shift+I / Cmd+Option+I (Inspect element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
      }
      // Ctrl+Shift+J / Cmd+Option+J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "j") {
        e.preventDefault();
      }
      // Ctrl+Shift+C / Cmd+Option+C (Inspect elements selector)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
      }
      // Ctrl+U / Cmd+Option+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "u") {
        e.preventDefault();
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
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
            onClick={() => {
              setIsModalOpen(true);
              setModalView("bio");
            }}
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
            setIsModalOpen(true);
            setModalView("bio");
          }}
          className="bg-primary text-foreground font-semibold px-8 py-3 rounded-full mt-4"
        >
          About Me
        </button>
      </div>

      {/* Combined Profile/Support Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop (Stays solid, no flashing) */}
          <div
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in"
          />

          {modalView === "bio" ? (
            /* Bio View Container */
            <div key="bio" className="relative w-full max-w-md bg-[#131316] border border-white/10 rounded-3xl p-8 shadow-2xl z-10 animate-scale-up text-left overflow-hidden">
              {/* Glow effect inside modal */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
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
                  onClick={() => setModalView("sponsor")}
                  className="w-full bg-primary hover:bg-secondary text-foreground text-sm font-bold py-3.5 rounded-2xl transition-colors cursor-pointer text-center flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(217,107,45,0.3)]"
                >
                  💖 Sponsor My Work
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/5 text-text-secondary hover:text-foreground text-sm font-semibold py-3.5 rounded-2xl transition-colors cursor-pointer text-center"
                >
                  Back to Echo
                </button>
              </div>
            </div>
          ) : (
            /* Support / Payment View Container */
            <div key="sponsor" className="relative w-full max-w-sm bg-[#131316] border border-white/10 rounded-3xl p-8 shadow-2xl z-10 animate-scale-up text-center overflow-hidden">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
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
                      src={decodeB64("L3VwaV9xci5qcGc=")}
                      alt="UPI QR Code"
                      className="w-full h-full object-contain rounded-xl select-none"
                    />
                  </div>

                  <p className="w-full text-xs text-foreground font-mono bg-black/40 border border-white/5 rounded-xl py-2.5 px-4 break-all select-all">
                    {decodeB64("ZGVlcGFrczg5OEBzbGM=")}
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
                      src={decodeB64("L3BheXBhbF9xci5qcGc=")}
                      alt="PayPal QR Code"
                      className="w-full h-full object-contain rounded-xl select-none"
                    />
                  </div>

                  <p className="w-full text-xs text-foreground font-mono bg-black/40 border border-white/5 rounded-xl py-2.5 px-4 break-all select-all">
                    {decodeB64("cGF5cGFsLm1lL0RFRVBBS1M4OTg=")}
                  </p>
                </div>
              )}

              {/* Bottom buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleCopy(supportTab === "upi" ? decodeB64("ZGVlcGFrczg5OEBzbGM=") : decodeB64("aHR0cHM6Ly9wYXlwYWwubWUvREVFUEFLUzg5OA=="))}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 text-foreground text-xs font-semibold py-3.5 rounded-2xl transition-colors cursor-pointer text-center"
                >
                  {copiedText ? "Copied! ✓" : supportTab === "upi" ? "Copy UPI ID" : "Copy Link"}
                </button>

                {supportTab === "paypal" ? (
                  <a
                    href={decodeB64("aHR0cHM6Ly9wYXlwYWwubWUvREVFUEFLUzg5OA==")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#003087] hover:bg-[#00246b] text-white text-xs font-bold py-3.5 rounded-2xl transition-colors text-center flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,48,135,0.25)]"
                  >
                    Open PayPal
                  </a>
                ) : (
                  <button
                    onClick={() => setModalView("bio")}
                    className="flex-1 bg-primary hover:bg-secondary text-foreground text-xs font-bold py-3.5 rounded-2xl transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                )}
              </div>

              {supportTab === "paypal" && (
                <button
                  onClick={() => setModalView("bio")}
                  className="text-xs text-text-secondary hover:text-foreground transition-colors mt-4 block mx-auto underline cursor-pointer"
                >
                  Back to Bio
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {/* Download Form Modal */}
      {downloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setDownloadModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-sm bg-[#131316] border border-white/10 rounded-3xl p-8 shadow-2xl z-10 animate-scale-up text-left overflow-hidden">
            {/* Glow effect inside modal */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setDownloadModalOpen(false)}
              className="absolute top-6 right-6 text-text-secondary hover:text-foreground transition-colors cursor-pointer text-sm font-semibold"
            >
              ✕
            </button>

            <h3 className="text-xl font-black text-foreground mb-2 flex items-center gap-2">
              Get Echo for macOS
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed mb-6">
              Enter your details to receive updates about new software releases and feature updates. Your download will start instantly.
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                
                // Robust email regex validation (must contain @, and a domain dot extension)
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(downloadEmail)) {
                  setEmailError("Please enter a valid email address (e.g., name@domain.com).");
                  return;
                }

                setEmailError("");
                setIsDownloading(true);
                
                // 1. Submit lead data to secure backend route
                try {
                  await fetch("/api/download", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name: downloadName,
                      email: downloadEmail,
                    }),
                  });
                } catch (err) {
                  // Fail gracefully on the frontend so the download still proceeds even if the server connection drops
                  console.error("Lead submission error:", err);
                }
                
                // 2. Trigger download
                const link = document.createElement("a");
                link.href = decodeB64("aHR0cHM6Ly9naXRodWIuY29tL2RlZXBhay1zLWdpdC9FY2hvL3JlbGVhc2VzL2xhdGVzdC9kb3dubG9hZC9FY2hvLmRtZw==");
                link.setAttribute("download", "Echo.dmg");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Success visual state delay, then close modal
                setTimeout(() => {
                  setDownloadModalOpen(false);
                  setDownloadName("");
                  setDownloadEmail("");
                  setIsDownloading(false);
                }, 1800);
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={downloadName}
                  onChange={(e) => setDownloadName(e.target.value)}
                  className="bg-black/30 border border-white/10 focus:border-primary/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-secondary/30 focus:outline-none w-full transition-all duration-300"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={downloadEmail}
                  onChange={(e) => {
                    setDownloadEmail(e.target.value);
                    if (emailError) setEmailError(""); // Clear error as user types
                  }}
                  className={`bg-black/30 border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-secondary/30 focus:outline-none w-full transition-all duration-300 ${
                    emailError ? "border-rose-500/50 focus:border-rose-500" : "border-white/10 focus:border-primary/50"
                  }`}
                />
                {emailError && (
                  <span className="text-rose-500 text-[10px] font-semibold mt-1 block">
                    {emailError}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isDownloading}
                className="w-full bg-primary hover:bg-secondary disabled:bg-primary/50 text-foreground text-sm font-bold py-3.5 rounded-2xl transition-colors cursor-pointer text-center flex items-center justify-center gap-2 mt-2 shadow-[0_4px_12px_rgba(217,107,45,0.3)]"
              >
                {isDownloading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Starting Download...
                  </>
                ) : (
                  "Submit & Download"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
