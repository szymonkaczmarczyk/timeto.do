"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Percent, TrendingUp, Users, Target, HelpCircle, Layers, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const industries = [
  { id: "b2b", name: "B2B / Usługi", baseCpl: 55, convRate: 0.05, avgDeal: 3500 },
  { id: "ecommerce", name: "E-commerce", baseCpl: 12, convRate: 0.08, avgDeal: 280 },
  { id: "finance", name: "Finanse / Ubezpieczenia", baseCpl: 75, convRate: 0.04, avgDeal: 2200 },
  { id: "realestate", name: "Nieruchomości", baseCpl: 90, convRate: 0.03, avgDeal: 8000 },
];

const channelsList = [
  { id: "email", name: "E-mail Marketing", factor: 0.92, color: "text-blue-500", border: "border-blue-500/20" },
  { id: "sms", name: "SMS Marketing", factor: 0.90, color: "text-amber-500", border: "border-amber-500/20" },
  { id: "display", name: "Display Ads", factor: 0.95, color: "text-emerald-500", border: "border-emerald-500/20" },
  { id: "push", name: "Web Push", factor: 0.96, color: "text-purple-500", border: "border-purple-500/20" },
  { id: "callcenter", name: "Call Center", factor: 0.82, color: "text-rose-500", border: "border-rose-500/20" },
];

export default function RoiCalculator() {
  const [budget, setBudget] = useState(15000);
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["email", "sms", "display"]);

  const [displayLeads, setDisplayLeads] = useState(0);
  const [displayRoi, setDisplayRoi] = useState(0);
  const [displayRevenue, setDisplayRevenue] = useState(0);
  const [displayCpl, setDisplayCpl] = useState(0);

  const toggleChannel = (id: string) => {
    setSelectedChannels((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((c) => c !== id)
          : prev
        : [...prev, id]
    );
  };

  const calculatorResults = useMemo(() => {
    const activeChannelsData = channelsList.filter((c) => selectedChannels.includes(c.id));
    const channelMultiplier = activeChannelsData.reduce((acc, c) => acc * c.factor, 1);
    
    let synergyDiscount = 1;
    if (selectedChannels.length === 2) synergyDiscount = 0.90;
    else if (selectedChannels.length === 3) synergyDiscount = 0.80;
    else if (selectedChannels.length === 4) synergyDiscount = 0.72;
    else if (selectedChannels.length >= 5) synergyDiscount = 0.65;

    const finalCpl = Math.round(selectedIndustry.baseCpl * channelMultiplier * synergyDiscount * 10) / 10;
    const leads = Math.round(budget / finalCpl);
    const conversions = Math.round(leads * selectedIndustry.convRate);
    const revenue = conversions * selectedIndustry.avgDeal;
    const netProfit = revenue - budget;
    const roi = budget > 0 ? Math.round((netProfit / budget) * 100) : 0;

    return {
      cpl: finalCpl,
      leads,
      conversions,
      revenue,
      roi,
    };
  }, [budget, selectedIndustry, selectedChannels]);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 600;

    const startLeads = displayLeads;
    const startRoi = displayRoi;
    const startRevenue = displayRevenue;
    const startCpl = displayCpl;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = progress * (2 - progress);

      setDisplayLeads(Math.round(startLeads + (calculatorResults.leads - startLeads) * ease));
      setDisplayRoi(Math.round(startRoi + (calculatorResults.roi - startRoi) * ease));
      setDisplayRevenue(Math.round(startRevenue + (calculatorResults.revenue - startRevenue) * ease));
      setDisplayCpl(Number((startCpl + (calculatorResults.cpl - startCpl) * ease).toFixed(1)));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [calculatorResults]);

  const pathD = useMemo(() => {
    const points = [];
    const width = 500;
    const height = 150;
    const margin = 20;

    for (let i = 0; i < 6; i++) {
      const x = margin + (i * (width - margin * 2)) / 5;
      const baseValue = budget * (1 + (calculatorResults.roi / 100) * (i / 5));
      const maxValue = budget * (1 + (calculatorResults.roi / 100));
      const percentage = maxValue > 0 ? baseValue / maxValue : 0;
      const y = height - margin - percentage * (height - margin * 2);
      points.push(`${x},${y}`);
    }

    return `M ${points.join(" L ")}`;
  }, [budget, calculatorResults.roi]);

  const fillPathD = useMemo(() => {
    return `${pathD} L 480,130 L 20,130 Z`;
  }, [pathD]);

  return (
    <section id="roi-calculator" className="py-24 md:py-32 bg-background relative overflow-hidden border-b border-card-border">
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full bg-accent-glow/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16 space-y-4">
          <ScrollReveal variant="blur" delay={0.05} duration={0.6}>
            <div className="text-xs font-bold tracking-wider text-accent uppercase">
              Interaktywny Symulator
            </div>
          </ScrollReveal>
          <ScrollReveal variant="blur" delay={0.1} duration={0.8}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-heading">
              Oblicz swój zwrot z inwestycji (ROI)
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="blur" delay={0.15} duration={0.8}>
            <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto font-sans">
              Przetestuj nasz symulator wydajnościowy. Dopasuj budżet, wybierz kanały i branżę, aby zobaczyć estymację wyników kampanii w czasie rzeczywistym.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-7 bg-card-bg border border-card-border rounded-3xl p-6 md:p-8 space-y-8 flex flex-col justify-between">
            
            <div className="space-y-4">
              <label className="text-sm font-bold text-foreground font-heading block">
                1. Wybierz swoją branżę:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {industries.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => setSelectedIndustry(ind)}
                    className={`px-4 py-3.5 rounded-2xl border text-sm font-bold text-center transition-all duration-300 cursor-pointer ${
                      selectedIndustry.id === ind.id
                        ? "bg-accent border-accent text-white shadow-md shadow-accent/15"
                        : "bg-background border-card-border hover:border-accent/40 text-text-muted hover:text-foreground"
                    }`}
                  >
                    {ind.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-foreground font-heading">
                  2. Budżet mediowy (miesięcznie):
                </label>
                <span className="text-xl font-black text-accent font-heading">
                  {budget.toLocaleString("pl-PL")} PLN
                </span>
              </div>
              <div className="relative pt-2">
                <input
                  type="range"
                  min="5000"
                  max="150000"
                  step="5000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="custom-range bg-card-border w-full"
                />
                <div className="flex justify-between text-[10px] font-bold text-text-muted mt-2">
                  <span>5 000 PLN</span>
                  <span>50 000 PLN</span>
                  <span>100 000 PLN</span>
                  <span>150 000 PLN</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-foreground font-heading">
                  3. Wybierz kanały (Aktywuj synergię):
                </label>
                {selectedChannels.length > 1 && (
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                    Bonus synergii: -{Math.round((1 - (selectedChannels.length === 2 ? 0.9 : selectedChannels.length === 3 ? 0.8 : selectedChannels.length === 4 ? 0.72 : 0.65)) * 100)}% CPL
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {channelsList.map((ch) => {
                  const isActive = selectedChannels.includes(ch.id);
                  return (
                    <button
                      key={ch.id}
                      onClick={() => toggleChannel(ch.id)}
                      className={`px-4 py-2.5 rounded-full border text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                        isActive
                          ? "bg-foreground border-foreground text-background shadow-sm"
                          : "bg-background border-card-border hover:bg-card-bg text-text-muted hover:text-foreground"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isActive ? "bg-accent" : "bg-card-border"}`} />
                      {ch.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-card-border/50 pt-6 text-xs text-text-muted font-sans flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Estymacje bazują na rzeczywistych średnich wynikach kampanii prowadzonych przez TimeTo. Rzeczywiste wyniki zależą od specyfiki oferty i strony docelowej.</span>
            </div>

          </div>

          <div className="lg:col-span-5 bg-card-bg border border-card-border rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6">
              <h4 className="text-xs font-black tracking-widest text-text-muted uppercase font-heading flex items-center gap-2">
                <Target size={14} className="text-accent" />
                Szacowane wyniki kampanii
              </h4>

              <div className="grid grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl bg-background border border-card-border/60">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                    Pozyskane Leady
                  </span>
                  <span className="text-2xl md:text-3xl font-black text-foreground font-heading block mt-1 tabular-nums">
                    {displayLeads.toLocaleString("pl-PL")}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-background border border-card-border/60">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                    Koszt Leada (CPL)
                  </span>
                  <span className="text-2xl md:text-3xl font-black text-foreground font-heading block mt-1 tabular-nums">
                    {displayCpl} <span className="text-xs font-bold text-text-muted">PLN</span>
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-background border border-card-border/60">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                    Estymowany Zwrot
                  </span>
                  <span className="text-2xl md:text-3xl font-black text-emerald-500 font-heading block mt-1 tabular-nums">
                    +{displayRoi}%
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-background border border-card-border/60">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                    Wartość Konwersji
                  </span>
                  <span className="text-2xl md:text-3xl font-black text-foreground font-heading block mt-1 tabular-nums">
                    {displayRevenue.toLocaleString("pl-PL")} <span className="text-xs font-bold text-text-muted">PLN</span>
                  </span>
                </div>

              </div>
            </div>

            <div className="mt-8 space-y-2">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                6-Miesięczna Projekcja Przychodów
              </span>
              <div className="w-full h-36 bg-background rounded-2xl border border-card-border/60 p-2 relative overflow-hidden">
                <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
                  
                  <line x1="20" y1="20" x2="480" y2="20" stroke="var(--card-border)" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="20" y1="75" x2="480" y2="75" stroke="var(--card-border)" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="20" y1="130" x2="480" y2="130" stroke="var(--card-border)" strokeWidth="0.5" strokeDasharray="3 3" />

                  <defs>
                    <linearGradient id="roiChartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  <motion.path
                    d={fillPathD}
                    fill="url(#roiChartGrad)"
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />

                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />

                  <motion.circle
                    cx={480}
                    cy={150 - 20 - (budget * (1 + (calculatorResults.roi / 100)) / (budget * (1 + (calculatorResults.roi / 100)))) * (150 - 40)}
                    r="5"
                    fill="var(--accent)"
                    className="filter drop-shadow-[0_0_6px_var(--accent)]"
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />

                </svg>

                <div className="absolute bottom-2 left-4 text-[8px] font-bold text-text-muted">Start (Miesiąc 1)</div>
                <div className="absolute bottom-2 right-4 text-[8px] font-bold text-accent font-heading">Skalowanie (Miesiąc 6)</div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-text-muted font-semibold">
                <span>Efektywność lejka:</span>
                <span className="text-emerald-500 font-bold">Wysoka (A+)</span>
              </div>
              <button 
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-4 py-2 rounded-full bg-accent text-white text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-accent/90 transition-colors"
              >
                Zapytaj o wycenę
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
