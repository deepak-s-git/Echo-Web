"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Disable smooth scroll and skew triggers on mobile devices (including desktop mode on touch devices)
    const isMobile = typeof window !== "undefined" && (
      window.innerWidth < 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 0 && /Macintosh/i.test(navigator.userAgent))
    );
    if (isMobile) return;

    // 1. Initialize Lenis with custom smooth/slow scroll params
    const lenis = new Lenis({
      duration: 1.8,         // Slower, more cinematic scroll transition duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,  // Deliberate and smooth speed multiplier
      touchMultiplier: 1.5,
    });

    // 2. Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // 3. Connect GSAP's ticker to Lenis requestAnimationFrame (raf)
    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updatePhysics);
    gsap.ticker.lagSmoothing(0);

    // 4. Hydration-safe deferred animations
    let skewTrigger: ScrollTrigger | null = null;
    const animationTimeout = setTimeout(() => {
      // Global Scroll-Skew Animation (Lively cinematic card flex)
      let proxy = { skew: 0 };
      const skewSetter = gsap.quickSetter(".skew-elem", "skewY", "deg");
      const clamp = gsap.utils.clamp(-3, 3); // Max 3 degrees to remain readable

      skewTrigger = ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / -400); // Tweak divisor to adjust sensitivity
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.7,
              ease: "power3.out",
              overwrite: "auto",
              onUpdate: () => skewSetter(proxy.skew)
            });
          }
        }
      });
    }, 100);

    return () => {
      gsap.ticker.remove(updatePhysics);
      clearTimeout(animationTimeout);
      if (skewTrigger) {
        skewTrigger.kill();
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
