import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Lightfall from "@/components/Lightfall";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Echo — Your macOS workflow, remembered.",
  description: "Echo silently captures every app, browser tab, and terminal window you use on macOS, letting you restore your entire workspace context in one click.",
  openGraph: {
    title: "Echo — macOS Workflow Memory App",
    description: "Echo silently captures your active app sessions and workspace states so you can restore them instantly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Echo — Your macOS workflow, remembered.",
    description: "Echo silently captures every app, browser tab, and terminal window you use on macOS.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full bg-background text-foreground flex flex-col font-sans relative overflow-x-hidden">
        <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
          <Lightfall
            colors={["#d96b2d", "#ff9d66", "#b24f18"]}
            backgroundColor="#000000ff"
            speed={0.22}
            streakCount={2}
            streakWidth={1.0}
            streakLength={1.0}
            glow={4}
            density={0.4}
            twinkle={0.8}
            zoom={3}
            backgroundGlow={0.3}
            opacity={0.55}
            mouseInteraction={false}
          />
        </div>

        <SmoothScroll>
          <div className="relative z-10 w-full">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
