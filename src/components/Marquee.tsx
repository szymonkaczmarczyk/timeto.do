"use client";

import { Mail, MessageSquare, Monitor, Bell, PhoneCall, Sparkles, PlayCircle } from "lucide-react";

const integrations = [
  { name: "E-mail marketing", icon: Mail, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { name: "SMS marketing", icon: MessageSquare, color: "text-amber-500", bgColor: "bg-amber-500/10" },
  { name: "Display", icon: Monitor, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { name: "Push", icon: Bell, color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { name: "Call Center", icon: PhoneCall, color: "text-rose-500", bgColor: "bg-rose-500/10" },
  { name: "Rich media", icon: Sparkles, color: "text-indigo-500", bgColor: "bg-indigo-500/10" },
  { name: "Play", icon: PlayCircle, color: "text-sky-500", bgColor: "bg-sky-500/10" },
];

export default function Marquee() {
  const quadrupleIntegrations = [...integrations, ...integrations, ...integrations, ...integrations];

  return (
    <section className="py-10 bg-background border-b border-card-border relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6 text-center">
        <span className="text-[10px] font-black tracking-widest text-text-muted uppercase font-heading">
          Obszary działań — Kanały dotarcia
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex items-center py-2">
        <div className="animate-marquee gap-6 flex-nowrap">
          {quadrupleIntegrations.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-card-bg border border-card-border hover:border-accent/40 transition-colors duration-300 select-none flex-shrink-0"
              >
                <div className={`${item.color} ${item.bgColor} p-2 rounded-lg flex items-center justify-center`}>
                  <Icon size={18} />
                </div>
                <span className="text-sm font-bold text-foreground font-heading">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

