"use client";

import { MouseEvent } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Mail, MessageSquare, Monitor, Bell, PhoneCall, Sparkles, PlayCircle, LucideIcon } from "lucide-react";
import InteractiveDashboard from "@/components/InteractiveDashboard";
import ScrollReveal from "@/components/ScrollReveal";

const areas = [
  {
    title: "E-mail marketing",
    description: "Kampanie mailingowe o wysokim współczynniku dostarczalności, targetowane wysyłki oraz automatyzacja marketing automation dostarczające stały strumień konwersji.",
    icon: Mail,
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    title: "SMS marketing",
    description: "Szybki i bezpośredni kontakt z klientem. Kampanie masowe oraz spersonalizowane powiadomienia o najwyższym wskaźniku Open Rate na rynku.",
    icon: MessageSquare,
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    title: "Display",
    description: "Efektywne kampanie banerowe, programmatic oraz remarketing dynamiczny, precyzyjnie trafiające do użytkowników zainteresowanych Twoją ofertą.",
    icon: Monitor,
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    title: "Push",
    description: "Komunikacja za pomocą notyfikacji web push bezpośrednio na ekrany komputerów i smartfonów, idealnie sprawdzająca się w bieżącym zaangażowaniu użytkowników.",
    icon: Bell,
    color: "text-purple-500 bg-purple-500/10",
  },
  {
    title: "Call Center",
    description: "Synergia działań online i offline. Telefoniczne domykanie leadów, umawianie spotkań handlowych oraz wsparcie posprzedażowe podnoszące ROI.",
    icon: PhoneCall,
    color: "text-rose-500 bg-rose-500/10",
  },
  {
    title: "Rich media",
    description: "Kreatywne i angażujące formaty reklamowe przyciągające uwagę odbiorcy. Interaktywne kreacje oparte o HTML5 zwiększające czas interakcji z marką.",
    icon: Sparkles,
    color: "text-indigo-500 bg-indigo-500/10",
  },
  {
    title: "Play",
    description: "Zintegrowane działania w ekosystemie operatora telekomunikacyjnego, pozwalające docierać do wyselekcjonowanych i zaangażowanych grup odbiorców.",
    icon: PlayCircle,
    color: "text-sky-500 bg-sky-500/10",
  },
];

// Subkomponent karty z efektem Spotlight (śledzeniem myszki)
function AreaCard({
  title,
  description,
  icon: Icon,
  color,
  index,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  index: number;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
    >
      <div
        onMouseMove={handleMouseMove}
        className="p-6 rounded-2xl bg-background border border-card-border hover:border-accent hover:-translate-y-1 hover:shadow-md hover:shadow-accent/5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group min-h-full cursor-pointer"
      >
        {/* Spotlight Glow Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                160px circle at ${mouseX}px ${mouseY}px,
                var(--accent-glow),
                transparent 80%
              )
            `,
          }}
        />
        
        <div className="relative z-10">
          <div className={`p-3 rounded-xl ${color} inline-flex mb-4`}>
            <Icon size={22} />
          </div>
          <h4 className="text-lg font-bold text-foreground mb-2 font-heading">{title}</h4>
          <p className="text-sm text-text-muted leading-relaxed font-sans">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutAndAreas() {
  return (
    <section id="about" className="py-24 md:py-32 bg-card-bg/30 relative overflow-hidden border-t border-b border-card-border">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-full -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-glow blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: About Us (O Nas) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
            <div className="space-y-4">
              <ScrollReveal variant="blur" delay={0.05} duration={0.6}>
                <div className="text-xs font-bold tracking-wider text-accent uppercase">
                  O nas
                </div>
              </ScrollReveal>
              <ScrollReveal variant="blur" delay={0.1} duration={0.8}>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-heading">
                  Dostarczamy efekt.
                </h2>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="blur" delay={0.15} duration={0.8}>
              <p className="text-base md:text-lg text-text-muted leading-relaxed font-sans font-normal">
                Jesteśmy agencją performance, która wspiera marki w planowaniu, realizacji i skalowaniu kampanii nastawionych na wynik. Działamy w oparciu o dane. <strong className="text-foreground font-semibold">Dostarczamy efekty — pozyskane leady możesz zwiększyć zdecydowanie do pięciu cyfr, z 8 z przodu.</strong>
              </p>
            </ScrollReveal>

            {/* Interaktywny Live Dashboard ROI */}
            <ScrollReveal variant="scale" delay={0.25} duration={0.8}>
              <InteractiveDashboard />
            </ScrollReveal>
          </div>

          {/* Right Column: Areas of Action (Obszary Działań) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <ScrollReveal variant="blur" delay={0.05} duration={0.6}>
                <div className="text-xs font-bold tracking-wider text-accent uppercase">
                  Obszary działań
                </div>
              </ScrollReveal>
              <ScrollReveal variant="blur" delay={0.1} duration={0.8}>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground font-heading">
                  Skuteczne kanały dotarcia
                </h3>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {areas.map((area, index) => (
                <AreaCard key={index} index={index} {...area} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
