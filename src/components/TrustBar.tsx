"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Compass, Laptop, Code, Terminal, FileText, Globe } from "lucide-react";

// Custom SVG components for brand logos
const ChromeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="8" x2="20.7" y2="8" />
    <line x1="8.5" y1="14" x2="12.8" y2="21.5" />
    <line x1="15.5" y1="14" x2="3.8" y2="14" />
  </svg>
);

const FigmaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
    <path d="M12 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
    <path d="M12 18.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
    <path d="M12 5.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z" />
    <path d="M12 12a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z" />
  </svg>
);

const SlackIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="8" width="6" height="3" rx="1" />
    <rect x="8" y="3" width="3" height="6" rx="1" />
    <rect x="15" y="13" width="6" height="3" rx="1" />
    <rect x="13" y="15" width="3" height="6" rx="1" />
  </svg>
);

const ArcIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3a9 9 0 0 0-9 9v9h18v-9a9 9 0 0 0-9-9z" />
    <path d="M12 9a3 3 0 0 0-3 3v9h6v-9a3 3 0 0 0-3-3z" />
  </svg>
);

const BraveIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2L3 7v6c0 5.25 3.75 10.1 9 11 5.25-.9 9-5.75 9-11V7l-9-5z" />
    <path d="M12 6l-3 4.5h6L12 6z" />
    <path d="M12 10.5v5.5" />
    <path d="M9 13.5h6" />
  </svg>
);

const PreviewIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    <circle cx="15" cy="10" r="3" />
    <line x1="17.2" y1="12.2" x2="20" y2="15" />
  </svg>
);

const FinderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M12 3v18" />
    <path d="M3 12c3 0 4.5-2 9-2s6 2 9 2" />
    <circle cx="7.5" cy="7.5" r="1" fill="currentColor" />
    <circle cx="16.5" cy="7.5" r="1" fill="currentColor" />
    <path d="M9 15a3 3 0 0 0 6 0" />
  </svg>
);

const SpotifyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 9c2.5-.6 5.5-.6 8 0" />
    <path d="M9 12c2-.4 4.5-.4 6.5 0" />
    <path d="M9.5 15c1.5-.3 3.5-.3 5 0" />
  </svg>
);

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6a6.9 6.9 0 0 0-3.5-1 15 15 0 0 0-.5 1.5 18.2 18.2 0 0 0-4 0 15 15 0 0 0-.5-1.5A6.9 6.9 0 0 0 6 6a17.6 17.6 0 0 0-3 11 10.9 10.9 0 0 0 4.5 2.5 13 13 0 0 0 1-1.5 7.5 7.5 0 0 1-3-1.5c.3-.2.6-.4.9-.6a11 11 0 0 0 11.2 0c.3.2.6.4.9.6a7.5 7.5 0 0 1-3 1.5 13 13 0 0 0 1 1.5 10.9 10.9 0 0 0 4.5-2.5A17.6 17.6 0 0 0 18 6z" />
    <circle cx="9" cy="12" r="1" fill="currentColor" />
    <circle cx="15" cy="12" r="1" fill="currentColor" />
  </svg>
);

export default function TrustBar() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    
    // GSAP tween for marquee scroll
    const tween = gsap.to(track, {
      xPercent: -25,
      ease: "none",
      duration: 35,
      repeat: -1
    });

    const handleMouseEnter = () => gsap.to(tween, { timeScale: 0.15, duration: 0.5 });
    const handleMouseLeave = () => gsap.to(tween, { timeScale: 1.0, duration: 0.5 });

    track.addEventListener("mouseenter", handleMouseEnter);
    track.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      track.removeEventListener("mouseenter", handleMouseEnter);
      track.removeEventListener("mouseleave", handleMouseLeave);
      tween.kill();
    };
  }, []);

  const apps = [
    { name: "Safari", icon: Compass },
    { name: "Chrome", icon: ChromeIcon },
    { name: "Arc", icon: ArcIcon },
    { name: "Brave", icon: BraveIcon },
    { name: "VS Code", icon: Code },
    { name: "Cursor", icon: Globe },
    { name: "Xcode", icon: Laptop },
    { name: "Terminal", icon: Terminal },
    { name: "Preview", icon: PreviewIcon },
    { name: "Figma", icon: FigmaIcon },
    { name: "Notion", icon: FileText },
    { name: "Slack", icon: SlackIcon },
    { name: "Finder", icon: FinderIcon },
    { name: "Spotify", icon: SpotifyIcon },
    { name: "Discord", icon: DiscordIcon }
  ];

  // Repeat the list to allow infinite marquee seamless loop
  const repeatedApps = [...apps, ...apps, ...apps, ...apps];

  return (
    <section id="integrations" className="py-12 border-y border-border-custom bg-black/20 backdrop-blur-sm relative z-10 overflow-hidden">
      <div className="container mx-auto mb-6 text-center select-none">
        <h3 className="text-xs uppercase tracking-widest text-text-secondary font-semibold">
          Echo integrates with the apps you already use
        </h3>
      </div>

      <div className="w-full overflow-hidden flex relative select-none">
        {/* Fade overlays on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div ref={trackRef} className="flex gap-16 whitespace-nowrap items-center py-2 cursor-pointer w-max flex-nowrap">
          {repeatedApps.map((app, index) => {
            const Icon = app.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2.5 text-text-secondary hover:text-foreground opacity-55 hover:opacity-100 transition-all duration-300 flex-shrink-0"
              >
                <Icon className="w-6 h-6 text-secondary" />
                <span className="text-sm font-semibold tracking-wide">{app.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
