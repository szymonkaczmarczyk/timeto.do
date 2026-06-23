"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

export default function InteractiveDashboard() {
  const [leads, setLeads] = useState(84192);
  const [roi, setRoi] = useState(380);
  const [cpl, setCpl] = useState(14.80);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    // Animowanie wartości startowych przy wejściu w pole widzenia
    let startLeads = 81200;
    let startRoi = 100;
    let startCpl = 25.00;

    const leadsInterval = setInterval(() => {
      if (startLeads < 84192) {
        startLeads += Math.floor(Math.random() * 20) + 25;
        if (startLeads >= 84192) {
          startLeads = 84192;
          clearInterval(leadsInterval);
        }
        setLeads(startLeads);
      } else {
        clearInterval(leadsInterval);
      }
    }, 15);

    const roiInterval = setInterval(() => {
      if (startRoi < 420) {
        startRoi += 10;
        setRoi(startRoi);
      } else {
        clearInterval(roiInterval);
      }
    }, 25);

    const cplInterval = setInterval(() => {
      if (startCpl > 12.40) {
        startCpl -= 0.3;
        setCpl(Math.max(12.40, startCpl));
      } else {
        clearInterval(cplInterval);
      }
    }, 20);

    // Ciągły symulowany ruch "LIVE" po zakończeniu animacji wejściowej
    const liveInterval = setInterval(() => {
      setLeads((prev) => prev + Math.floor(Math.random() * 3) + 1);
      setRoi((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
      setCpl((prev) => {
        const diff = (Math.random() * 0.2 - 0.1);
        return parseFloat((prev + diff).toFixed(2));
      });
    }, 3500);

    return () => {
      clearInterval(leadsInterval);
      clearInterval(roiInterval);
      clearInterval(cplInterval);
      clearInterval(liveInterval);
    };
  }, [isInView]);

  return (
    <div ref={ref} className="p-6 rounded-[28px] bg-background border border-card-border shadow-sm space-y-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-accent/5 blur-xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-card-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="text-[10px] font-black tracking-widest text-text-muted uppercase font-heading">
            Live Campaign Monitor
          </span>
        </div>
        <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold flex items-center gap-1 font-sans">
          <Activity size={10} />
          Optymalizacja aktywna
        </div>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-3 gap-4">
        
        {/* Stat 1: ROI */}
        <div className="space-y-1">
          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block">
            Średni ROI
          </span>
          <div className="flex items-baseline gap-0.5">
            <span className="text-xl md:text-2xl font-black text-emerald-500 font-heading">
              +{roi}%
            </span>
            <TrendingUp size={14} className="text-emerald-500 hidden sm:inline" />
          </div>
        </div>

        {/* Stat 2: Leads */}
        <div className="space-y-1">
          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block">
            Pozyskane Leady
          </span>
          <div className="flex items-baseline gap-0.5">
            <span className="text-xl md:text-2xl font-black text-foreground font-heading tabular-nums">
              {leads.toLocaleString("pl-PL")}
            </span>
            <Users size={14} className="text-accent hidden sm:inline" />
          </div>
        </div>

        {/* Stat 3: CPL */}
        <div className="space-y-1">
          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block">
            Koszt Leada (CPL)
          </span>
          <div className="flex items-baseline gap-0.5">
            <span className="text-xl md:text-2xl font-black text-foreground font-heading tabular-nums">
              {cpl.toFixed(2)}
            </span>
            <span className="text-[10px] font-bold text-text-muted font-sans ml-0.5">PLN</span>
          </div>
        </div>

      </div>

      {/* Live Graph Section */}
      <div className="relative pt-2 h-36 w-full">
        {/* Draw path svg */}
        <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
          {/* Grid lines */}
          <line x1="0" y1="20" x2="300" y2="20" stroke="var(--card-border)" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="0" y1="50" x2="300" y2="50" stroke="var(--card-border)" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="0" y1="80" x2="300" y2="80" stroke="var(--card-border)" strokeWidth="0.5" strokeDasharray="3 3" />

          {/* Area under curve */}
          {isInView && (
            <motion.path
              initial={{ d: "M 0 100 L 0 100 L 50 100 L 100 100 L 150 100 L 200 100 L 250 100 L 300 100 Z" }}
              animate={{ d: "M 0 100 L 0 85 L 50 78 L 100 62 L 150 48 L 200 55 L 250 35 L 300 20 Z" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              fill="url(#grad)"
              opacity="0.15"
            />
          )}

          {/* Main Chart Line */}
          {isInView && (
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              d="M 0 85 L 50 78 L 100 62 L 150 48 L 200 55 L 250 35 L 300 20"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          )}

          {/* Glowing dot on tip */}
          {isInView && (
            <motion.circle
              initial={{ cx: 0, cy: 85, opacity: 0 }}
              animate={{ cx: 300, cy: 20, opacity: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              r="4.5"
              fill="var(--accent)"
              className="filter drop-shadow-[0_0_8px_var(--accent)]"
            />
          )}

          {/* Gradients */}
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dynamic Graph Indicator overlay */}
        <div className="absolute top-2 right-2 text-[9px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-md flex items-center gap-1">
          Trend wzrostowy +35%
        </div>
      </div>

      <div className="text-[11px] text-text-muted leading-relaxed font-sans border-t border-card-border/50 pt-4 flex items-center justify-between">
        <span>Łączenie kanałów: Email + SMS + Push</span>
        <span className="font-semibold text-foreground">Optymalizacja algorytmiczna</span>
      </div>
    </div>
  );
}
