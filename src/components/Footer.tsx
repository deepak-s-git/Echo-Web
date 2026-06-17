"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-border-custom bg-black/40 py-16 px-6 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12 text-center md:text-left select-none">
        
        {/* Brand details */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <img src="/echo_butterfly_icon.png" alt="Echo Logo" className="w-5 h-5 object-contain" />
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
              Echo
            </span>
          </div>
          <p className="text-xs text-text-secondary max-w-[280px] leading-relaxed">
            &quot;Echo remembers your workflow so you don&apos;t have to.&quot;
          </p>
        </div>

        {/* Links row */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-wider text-foreground font-bold">Product</span>
            <a href="#features" className="text-xs text-text-secondary hover:text-secondary transition-colors">Features</a>
            <a href="#how-it-works" className="text-xs text-text-secondary hover:text-secondary transition-colors">How it Works</a>
            <a href="#timeline" className="text-xs text-text-secondary hover:text-secondary transition-colors">Timeline</a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-wider text-foreground font-bold">Resources</span>
            <a href="#" className="text-xs text-text-secondary hover:text-secondary transition-colors">Privacy Policy</a>
            <a 
              href="https://github.com/deepak-s-git/Echo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-text-secondary hover:text-secondary transition-colors"
            >
              GitHub Repository
            </a>
            <a 
              href="https://github.com/deepak-s-git/Echo/issues" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-text-secondary hover:text-secondary transition-colors"
            >
              Report a Bug
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-5xl mx-auto border-t border-border-custom/50 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-secondary select-none opacity-50">
        <span>© 2026 Echo App. All rights reserved.</span>
        <span>Made with ❤️ for macOS</span>
      </div>
    </footer>
  );
}
