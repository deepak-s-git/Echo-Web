"use client";

import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search, Filter, Database, CalendarRange, Workflow, Clock,
  Home, Sliders, ChevronDown, ChevronRight, MoreHorizontal,
  Globe, Code, Terminal, Layers, MessageSquare, Play, PlayCircle
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Session {
  name: string;
  time: string;
  appsCount: number;
  duration: string;
}

interface WorkflowData {
  id: string;
  title: string;
  badge?: string;
  lastActive: string;
  totalTime: string;
  sessionsCount: number;
  apps: { name: string; color: string; icon: React.ReactNode; letter: string }[];
  sessions?: Session[];
}

export default function TimelineShowcase() {
  const [expandedId, setExpandedId] = useState<string | null>("nextjs-landing");

  useEffect(() => {
    // Animate Header
    gsap.from(".reveal-timeline-header", {
      opacity: 0,
      y: 30,
      letterSpacing: "-0.04em",
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#timeline",
        start: "top 85%",
      }
    });

    // Animate Showcase Mockup
    gsap.from(".reveal-showcase", {
      opacity: 0,
      y: 60,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#timeline",
        start: "top 75%",
      }
    });

    // Animate individual workflow cards inside mockup on scroll reveal
    const workflowCards = gsap.utils.toArray(".reveal-showcase .skew-elem");
    workflowCards.forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  const workflows: WorkflowData[] = [
    {
      id: "design-system",
      title: "Design System Redesign",
      badge: "Active",
      lastActive: "Today at 11:20",
      totalTime: "2h 05m",
      sessionsCount: 2,
      apps: [
        { name: "Figma", color: "#F24E1E", icon: <Layers className="w-3 h-3 text-white" />, letter: "F" },
        { name: "VS Code", color: "#007ACC", icon: <Code className="w-3 h-3 text-white" />, letter: "C" },
        { name: "Slack", color: "#4A154B", icon: <MessageSquare className="w-3 h-3 text-white" />, letter: "S" },
        { name: "Safari", color: "#157EFB", icon: <Globe className="w-3 h-3 text-white" />, letter: "S" }
      ],
      sessions: [
        { name: "Color Palette Refinement", time: "Today • 10:00 - 11:20", appsCount: 3, duration: "1h 20m" },
        { name: "Typography Scale Setup", time: "Today • 08:30 - 09:15", appsCount: 2, duration: "45m" }
      ]
    },
    {
      id: "nextjs-landing",
      title: "Next.js Landing Page",
      badge: "Continued 2 times",
      lastActive: "Today at 09:15",
      totalTime: "27m",
      sessionsCount: 3,
      apps: [
        { name: "Chrome", color: "#EA4335", icon: <Globe className="w-3 h-3 text-white" />, letter: "C" },
        { name: "VS Code", color: "#007ACC", icon: <Code className="w-3 h-3 text-white" />, letter: "C" },
        { name: "Terminal", color: "#000000", icon: <Terminal className="w-3 h-3 text-white" />, letter: ">_" }
      ],
      sessions: [
        { name: "Hero Section Edit", time: "Jun 17 • 09:15 - 09:27", appsCount: 3, duration: "12m" },
        { name: "Feature Grid Setup", time: "Jun 17 • 09:35 - 09:45", appsCount: 2, duration: "10m" },
        { name: "Asset Compilation", time: "Jun 17 • 09:50 - 09:55", appsCount: 1, duration: "5m" }
      ]
    },
    {
      id: "rust-auth-api",
      title: "Rust Auth API",
      badge: "Continued 2 times",
      lastActive: "Yesterday at 18:30",
      totalTime: "47m",
      sessionsCount: 2,
      apps: [
        { name: "VS Code", color: "#007ACC", icon: <Code className="w-3 h-3 text-white" />, letter: "C" },
        { name: "Terminal", color: "#000000", icon: <Terminal className="w-3 h-3 text-white" />, letter: ">_" }
      ],
      sessions: [
        { name: "Database Migrations", time: "Jun 16 • 18:00 - 18:30", appsCount: 2, duration: "30m" },
        { name: "Token Refresh Handler", time: "Jun 16 • 17:15 - 17:32", appsCount: 2, duration: "17m" }
      ]
    }
  ];

  return (
    <section id="timeline" className="py-32 px-6 max-w-5xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center mb-16 select-none">
        <span className="text-xs uppercase tracking-widest text-secondary font-bold mb-3 inline-block">
          Interactive Timeline
        </span>
        <h2 className="reveal-timeline-header text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Your full history, <span className="text-primary">beautifully organized</span>
        </h2>
      </div>

      {/* Main App Layout Mockup */}
      <div className="reveal-showcase w-full bg-[#0d0d0e]/95 border border-white/8 shadow-[0_30px_80px_rgba(0,0,0,0.6)] rounded-2xl overflow-hidden flex flex-col md:grid md:grid-cols-[200px_1fr] min-h-[580px]">

        {/* macOS Left Sidebar (hidden on mobile, shown on md+) */}
        <div className="hidden md:flex flex-col p-4 bg-black/30 border-r border-border-custom">
          {/* Window Controls */}
          <div className="flex gap-1.5 items-center mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB2F]/20" />
          </div>

          {/* Sidebar App Title */}
          <div className="flex items-center gap-2 mb-6 px-1">
            <img src="/echo_butterfly_icon.png" alt="Echo Logo" className="w-4 h-4 object-contain" />
            <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Echo
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 px-3 py-2 text-xs text-text-secondary hover:text-foreground rounded-lg cursor-pointer transition-colors">
              <Home className="w-3.5 h-3.5" />
              Home
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-foreground bg-white/8 border border-white/5 rounded-lg cursor-pointer">
              <Sliders className="w-3.5 h-3.5 text-primary" />
              Timeline
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-xs text-text-secondary hover:text-foreground rounded-lg cursor-pointer transition-colors">
              <Search className="w-3.5 h-3.5" />
              Search
            </div>
          </div>

          {/* Sidebar Footer status */}
          <div className="mt-auto flex items-center gap-2 text-[10px] text-text-secondary font-medium px-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] animate-pulse" />
            Active session
          </div>
        </div>

        {/* Right Main Content Pane */}
        <div className="p-6 md:p-8 flex flex-col overflow-y-auto bg-black/10">

          {/* Timeline View Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-border-custom/50 pb-5 select-none">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-black text-foreground tracking-tight">Timeline</h3>

              {/* Status Badges */}
              <div className="flex gap-2 text-[10px] font-bold text-text-secondary">
                <span className="bg-white/4 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Workflow className="w-3 h-3 text-primary" /> 3 active
                </span>
                <span className="bg-white/4 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CalendarRange className="w-3 h-3 text-secondary" /> 7 sessions
                </span>
                <span className="bg-white/4 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3 text-tertiary" /> 31:57
                </span>
              </div>
            </div>

            {/* Filter and Search Actions */}
            <div className="flex gap-2 self-end sm:self-auto">
              <div className="w-8 h-8 rounded-lg bg-white/4 flex items-center justify-center text-text-secondary hover:text-foreground cursor-pointer transition-colors">
                <Filter className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/4 flex items-center justify-center text-text-secondary hover:text-foreground cursor-pointer transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Workflows Cards Stack */}
          <div className="flex flex-col gap-4">
            {workflows.map((wf) => {
              const isExpanded = expandedId === wf.id;
              return (
                <div
                  key={wf.id}
                  onClick={() => setExpandedId(isExpanded ? null : wf.id)}
                  className={`border transition-all duration-300 rounded-xl overflow-hidden cursor-pointer select-none skew-elem ${isExpanded
                    ? "bg-white/4 border-white/12 shadow-md"
                    : "bg-white/2 hover:bg-white/4 border-border-custom hover:border-white/8"
                    }`}
                >
                  {/* Card Main Info Row */}
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-secondary flex-shrink-0 mt-0.5">
                        {wf.apps[0]?.icon}
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-foreground">{wf.title}</h4>
                          {wf.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-secondary/15 text-secondary border border-secondary/20 rounded-md">
                              {wf.badge}
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] text-text-secondary mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span>Last Active: {wf.lastActive}</span>
                          <span className="text-white/20">•</span>
                          <span>Total Time: {wf.totalTime}</span>
                          <span className="text-white/20">•</span>
                          <span>{wf.sessionsCount} Sessions</span>
                        </div>
                      </div>
                    </div>

                    {/* App Badges & Expand State Indicator */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 border-t border-white/5 pt-2.5 sm:pt-0 sm:border-0">
                      {/* Overlapping App Icons */}
                      <div className="flex -space-x-1.5 overflow-hidden">
                        {wf.apps.map((app, idx) => (
                          <div
                            key={idx}
                            className="w-5.5 h-5.5 rounded-md flex items-center justify-center text-[9px] font-bold border border-[#141417] shadow-sm relative group/app"
                            style={{ backgroundColor: app.color }}
                            title={app.name}
                          >
                            {app.icon}
                          </div>
                        ))}
                      </div>

                      {/* Expand Chevron */}
                      <div className="text-text-secondary p-1">
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Session History timeline */}
                  {isExpanded && wf.sessions && (
                    <div className="px-5 pb-5 pt-1 border-t border-white/5 bg-black/15 select-none">
                      <div className="text-[10px] font-bold text-text-secondary tracking-wider uppercase mb-3.5 mt-2 flex items-center gap-1.5">
                        <Sliders className="w-3 h-3 text-secondary" />
                        Session History
                      </div>

                      <div className="flex flex-col relative pl-3.5">
                        {/* Vertical line connecting nodes */}
                        <div className="absolute left-1.5 top-2.5 bottom-2.5 w-0.5 bg-white/10" />

                        {wf.sessions.map((session, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-start justify-between gap-4 py-2.5 relative group/session"
                          >
                            {/* Bullet Node */}
                            <div className="absolute -left-[11px] top-[14px] w-2 h-2 rounded-full bg-[#1c1c1e] border-2 border-text-secondary group-hover/session:border-secondary transition-colors" />

                            {/* Session title & time info */}
                            <div>
                              <div className="text-xs font-semibold text-foreground group-hover/session:text-secondary transition-colors">
                                {session.name}
                              </div>
                              <div className="text-[10px] text-text-secondary mt-0.5">{session.time}</div>
                            </div>

                            {/* Session stats (app badge & duration) */}
                            <div className="flex items-center gap-3">
                              <span className="text-[9px] font-semibold text-text-secondary bg-white/4 px-1.5 py-0.5 rounded-md">
                                {session.appsCount} app{session.appsCount > 1 ? "s" : ""}
                              </span>
                              <span className="text-[10px] font-semibold text-text-secondary">
                                Duration: {session.duration}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
