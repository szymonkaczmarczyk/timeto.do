"use client";

import { motion } from "framer-motion";
import { Flag, Shuffle, LineChart, Maximize2, Zap } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    title: "Jasno ustalony punkt wyjścia",
    desc: "Każdą współpracę zaczynamy od ustalenia celu, kluczowych wskaźników i sposobu pomiaru efektów. Wiemy dokładnie dokąd zmierzamy.",
    icon: Flag,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Wielokanałowe podejście",
    desc: "Łączymy kanały dotarcia w spójny proces dopasowany do ścieżki odbiorcy. E-mail, SMS, Display i Push współpracują ze sobą.",
    icon: Shuffle,
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    title: "Optymalizacja oparta na danych",
    desc: "Decyzje wynikają z testów i wyników, a nie z intuicji. Mierzymy każdą interakcję i dostosowujemy budżety w czasie rzeczywistym.",
    icon: LineChart,
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    title: "Skalowanie tego, co działa",
    desc: "Rozwijamy działania tam, gdzie kampania ma potwierdzone wyniki i realny potencjał. Inwestujemy w sprawdzone ścieżki.",
    icon: Maximize2,
    color: "text-purple-500 bg-purple-500/10",
  },
  {
    title: "Tempo działania",
    desc: "Wiemy, że w marketingu liczy się czas. Dlatego stawiamy na szybki start działań i bieżącą reakcję wtedy, gdy ma to największe znaczenie.",
    icon: Zap,
    color: "text-rose-500 bg-rose-500/10",
  },
];

export default function HowWeWork() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-card-bg/20 relative overflow-hidden border-b border-card-border">
      <div className="absolute bottom-1/3 left-full -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-accent-glow/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-4">
            <ScrollReveal variant="blur" delay={0.05} duration={0.6}>
              <div className="text-xs font-bold tracking-wider text-accent uppercase">
                Fundamenty Współpracy
              </div>
            </ScrollReveal>
            <ScrollReveal variant="blur" delay={0.1} duration={0.8}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-heading">
                Jak działamy?
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="blur" delay={0.15} duration={0.8}>
              <p className="text-text-muted text-base md:text-lg font-sans leading-relaxed">
                Nasza metodologia opiera się na pięciu filarach, które gwarantują dostarczenie wyników biznesowych.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-8 relative space-y-12">
            <div className="absolute left-[20px] md:left-[24px] top-4 bottom-4 w-0.5 bg-card-border" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative flex items-start gap-4 md:gap-6 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background border border-card-border flex items-center justify-center z-10 group-hover:border-accent transition-colors duration-300 shadow-sm flex-shrink-0 mt-2">
                    <span className="text-xs md:text-sm font-bold text-accent">
                      0{index + 1}
                    </span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15px" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.03 }}
                    className="flex-1 p-6 md:p-8 rounded-3xl bg-background border border-card-border shadow-sm hover:border-accent/40 hover:shadow-md transition-[border-color,box-shadow] duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-2.5 rounded-xl ${step.color} inline-flex flex-shrink-0`}>
                        <Icon size={20} />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-foreground font-heading leading-tight">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-text-muted leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
