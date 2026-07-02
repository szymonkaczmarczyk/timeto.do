"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Monitor, Bell, Award, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const channels = [
  {
    id: "email",
    name: "E-mail",
    icon: Mail,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    glow: "shadow-blue-500/20",
    desc: "Wysoko spersonalizowane bazy i marketing automation.",
    pathD: "M 130,60 Q 220,60 300,160",
    particleColor: "#3b82f6",
    duration: "2.5s",
    cy: 60,
  },
  {
    id: "sms",
    name: "SMS",
    icon: MessageSquare,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    glow: "shadow-amber-500/20",
    desc: "Natychmiastowe dotarcie i wysoki wskaźnik otwarć (OR 98%).",
    pathD: "M 130,120 Q 200,120 300,170",
    particleColor: "#f59e0b",
    duration: "2s",
    cy: 120,
  },
  {
    id: "display",
    name: "Display",
    icon: Monitor,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    glow: "shadow-emerald-500/20",
    desc: "Precyzyjny target i remarketing oparty o zachowania.",
    pathD: "M 130,240 Q 200,240 300,190",
    particleColor: "#10b981",
    duration: "3s",
    cy: 240,
  },
  {
    id: "push",
    name: "Web Push",
    icon: Bell,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    glow: "shadow-purple-500/20",
    desc: "Bezpośrednie komunikaty na ekrany bez SPAM-u.",
    pathD: "M 130,300 Q 220,300 300,200",
    particleColor: "#a855f7",
    duration: "2.2s",
    cy: 300,
  },
];

export default function TrafficPipeline() {
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null);

  return (
    <section id="traffic-pipeline" className="py-24 md:py-32 bg-card-bg/20 relative overflow-hidden border-b border-card-border">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-glow/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <ScrollReveal variant="blur" delay={0.05} duration={0.6}>
              <div className="text-xs font-bold tracking-wider text-accent uppercase">
                Jak płynie Twój ruch
              </div>
            </ScrollReveal>
            <ScrollReveal variant="blur" delay={0.1} duration={0.8}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-heading leading-tight">
                Rurociąg konwersji Timeto
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-6">
            <ScrollReveal variant="blur" delay={0.15} duration={0.8}>
              <p className="text-text-muted text-base md:text-lg font-sans">
                Zobacz, jak ruch z kanałów reklamowych jest przetwarzany w czasie rzeczywistym przez nasze systemy optymalizacyjne, dając w efekcie gotowe, zakwalifikowane leady i sprzedaż.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Pipeline Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Side: Channel Cards List */}
          <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">
              Kanały Wejściowe (Ruch)
            </div>
            {channels.map((ch) => {
              const Icon = ch.icon;
              const isHovered = hoveredChannel === ch.id;
              const isAnyHovered = hoveredChannel !== null;

              return (
                <div
                  key={ch.id}
                  onMouseEnter={() => setHoveredChannel(ch.id)}
                  onMouseLeave={() => setHoveredChannel(null)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 items-start ${isHovered
                    ? "bg-background border-accent shadow-lg shadow-accent/5 translate-x-2"
                    : isAnyHovered
                      ? "bg-transparent border-card-border/40 opacity-50"
                      : "bg-background/80 border-card-border"
                    }`}
                >
                  <div className={`p-3 rounded-xl ${ch.bg} ${ch.color} flex-shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-foreground font-heading flex items-center gap-1.5">
                      {ch.name} Marketing
                      {isHovered && <ArrowRight size={14} className="text-accent animate-pulse" />}
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed font-sans">{ch.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Interactive Animated SVG Canvas */}
          <div className="lg:col-span-8 order-1 lg:order-2 bg-background border border-card-border/60 rounded-3xl p-4 md:p-8 flex items-center justify-center min-h-[380px] md:min-h-[420px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(128,128,255,0.02),transparent)] pointer-events-none" />

            <svg viewBox="0 0 600 360" className="w-full h-full overflow-visible z-10 select-none pointer-events-none">

              {/* Connecting Paths */}
              {channels.map((ch) => {
                const isHovered = hoveredChannel === ch.id;
                return (
                  <g key={ch.id}>
                    {/* Glowing background path */}
                    <path
                      d={ch.pathD}
                      fill="none"
                      stroke={ch.particleColor}
                      strokeWidth={isHovered ? "4" : "1.5"}
                      opacity={isHovered ? "0.3" : "0.08"}
                      className="transition-all duration-300"
                    />

                    {/* Animated flow particle 1 */}
                    <circle r={isHovered ? "5" : "3.5"} fill={ch.particleColor} className="filter drop-shadow-[0_0_6px_var(--accent)]">
                      <animateMotion
                        dur={isHovered ? "1.2s" : ch.duration}
                        repeatCount="indefinite"
                        path={ch.pathD}
                      />
                    </circle>

                    {/* Animated flow particle 2 (offset) */}
                    <circle r={isHovered ? "4" : "2.5"} fill={ch.particleColor} opacity="0.6" className="filter drop-shadow-[0_0_4px_var(--accent)]">
                      <animateMotion
                        dur={isHovered ? "1.2s" : ch.duration}
                        begin="0.8s"
                        repeatCount="indefinite"
                        path={ch.pathD}
                      />
                    </circle>
                  </g>
                );
              })}

              {/* Main Core to Outlet Pipeline */}
              <path
                d="M 300,180 L 540,180"
                fill="none"
                stroke="var(--accent)"
                strokeWidth={hoveredChannel ? "5" : "3.5"}
                opacity={hoveredChannel ? "0.5" : "0.2"}
                className="transition-all duration-300"
              />

              {/* Dynamic Core-to-Outlet Particles */}
              <circle r="5" fill="var(--accent)" className="filter drop-shadow-[0_0_8px_var(--accent)]">
                <animateMotion
                  dur={hoveredChannel ? "0.8s" : "1.8s"}
                  repeatCount="indefinite"
                  path="M 300,180 L 540,180"
                />
              </circle>
              <circle r="3.5" fill="var(--accent)" opacity="0.7">
                <animateMotion
                  dur={hoveredChannel ? "0.8s" : "1.8s"}
                  begin="0.6s"
                  repeatCount="indefinite"
                  path="M 300,180 L 540,180"
                />
              </circle>
              <circle r="3" fill="var(--accent)" opacity="0.4">
                <animateMotion
                  dur={hoveredChannel ? "0.8s" : "1.8s"}
                  begin="1.2s"
                  repeatCount="indefinite"
                  path="M 300,180 L 540,180"
                />
              </circle>

              {/* Node graphics: Left Inputs (Circles with centered icons and non-overlapping labels) */}
              {channels.map((ch) => {
                const Icon = ch.icon;
                return (
                  <g key={ch.id}>
                    <circle
                      cx="130"
                      cy={ch.cy}
                      r="16"
                      fill="var(--card-bg)"
                      stroke="var(--card-border)"
                      strokeWidth="1.5"
                    />

                    <foreignObject x="118" y={ch.cy - 12} width="24" height="24">
                      <div className={`flex items-center justify-center w-full h-full ${ch.color}`}>
                        <Icon size={14} />
                      </div>
                    </foreignObject>

                    <text
                      x="100"
                      y={ch.cy + 4}
                      textAnchor="end"
                      fill="var(--foreground)"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="var(--font-heading)"
                    >
                      {ch.name}
                    </text>
                  </g>
                );
              })}

              {/* Central Optimizer Node: Restored Circle with centered text, no icon */}
              <g transform="translate(260, 140)">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="var(--card-bg)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  className={`filter drop-shadow-[0_0_12px_var(--accent-muted)] transition-all duration-500 ${hoveredChannel ? "animate-pulse-glow" : ""
                    }`}
                />
                <text
                  x="40"
                  y="43"
                  textAnchor="middle"
                  fill="var(--accent)"
                  fontSize="8"
                  fontWeight="black"
                  fontFamily="var(--font-heading)"
                >
                  TIMETO CORE
                </text>
              </g>

              {/* Right Output Node: Restored Circle with centered text, no icon */}
              <g transform="translate(500, 140)">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="var(--accent)"
                  className="filter drop-shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                />
                <text
                  x="40"
                  y="43"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="8"
                  fontWeight="black"
                  fontFamily="var(--font-heading)"
                >
                  KONWERSJE
                </text>
              </g>

            </svg>

            {/* Labels overlay */}
            <div className="absolute top-4 left-6 text-[10px] font-black tracking-widest text-text-muted uppercase font-heading">
              Wizualizacja Przepływu Ruchu
            </div>

            <div className="absolute bottom-4 right-6 text-[10px] font-bold text-accent flex items-center gap-1.5 bg-accent/10 px-2.5 py-1 rounded-full">
              <Award size={12} strokeWidth={2.5} />
              Dedykowana analityka
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
