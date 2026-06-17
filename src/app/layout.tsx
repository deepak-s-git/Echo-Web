import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className="min-h-full bg-background text-foreground flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
