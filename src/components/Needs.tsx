"use client";

import { useState, MouseEvent, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { Target, Sliders, Layers, DollarSign, Network, ChevronDown, LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const needs = [
  {
    num: "01",
    title: "Skuteczne dotarcie do kluczowych segmentów rynku publicznego oraz komercyjnego",
    description: "Potrzebujecie partnera, który rozumie specyfikę sektora zarówno publicznego, jak i komercyjnego. Posiadamy doświadczenie w realizowaniu kampanii dla obu tych światów, dostosowując ton komunikacji i kanały do wymogów prawnych oraz zachowań odbiorców.",
    icon: Target,
    accent: "from-blue-500 to-indigo-600",
  },
  {
    num: "02",
    title: "Elastyczność i dopasowanie do zróżnicowanych celów kampanii",
    description: "Poszukujecie wsparwszej pomocy zarówno w budowaniu świadomości, jak i generowaniu leadów i sprzedaży, w zależności od specyfiki klienta. Nie oferujemy sztywnych pakietów. Zamiast tego elastycznie żonglujemy celami, optymalizując kampanię pod kątem tego, co w danym momencie jest kluczowe.",
    icon: Sliders,
    accent: "from-amber-500 to-orange-600",
  },
  {
    num: "03",
    title: "Pełna synergia i dostosowanie strategii do unikalnych potrzeb klientów",
    description: "Waszym priorytetem jest, aby każda kampania była precyzyjnie dostosowana do konkretnej marki z uwzględnieniem specyfiki branżowej. Tworzymy dedykowane strategie od podstaw, odrzucając schematy na rzecz unikalnego DNA Twojej marki.",
    icon: Layers,
    accent: "from-emerald-500 to-teal-600",
  },
  {
    num: "04",
    title: "Optymalizacja wyników i kontrola kosztów kampanii",
    description: "Poszukujecie rozwiązań, które zapewnią skuteczne wykorzystanie budżetu, przynosząc maksymalny zwrot z inwestycji. Każda wydana złotówka jest przez nas mierzona i optymalizowana w czasie rzeczywistym, by zminimalizować CPL i zmaksymalizować ROAS.",
    icon: DollarSign,
    accent: "from-rose-500 to-red-600",
  },
  {
    num: "05",
    title: "Realizacja kampanii wielokanałowych i cross-promocji",
    description: "Potrzebujecie partnera, który skutecznie wykorzysta kluczowe kanały online, takie jak e-mail, display oraz SMS, aby w pełni zmaksymalizować efektywność kampanii. Łączymy te kanały w jeden spójny lejek zakupowy, gdzie użytkownik płynnie przechodzi od świadomości do zakupu.",
    icon: Network,
    accent: "from-purple-500 to-pink-600",
  },
];

function NeedAccordionItem({
  need,
  index,
  isOpen,
  onClick,
}: {
  need: typeof needs[0];
  index: number;
  isOpen: boolean;
  onClick: () => void;
}) {
  const Icon = need.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
      className={`rounded-3xl border border-card-border transition-[border-color,background-color,box-shadow] duration-300 overflow-hidden relative group ${
        isOpen ? "bg-card-bg shadow-sm" : "bg-transparent hover:bg-card-bg/50"
      }`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block z-0"
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

      <button
        onClick={onClick}
        type="button"
        className="w-full py-6 px-6 md:px-8 flex items-center justify-between text-left cursor-pointer group/btn focus:outline-none relative z-10"
      >
        <div className="flex items-center space-x-6 pr-4">
          <span className="text-xl md:text-2xl font-bold text-accent font-heading">
            {need.num}
          </span>
          <span className="text-base md:text-xl font-bold text-foreground font-heading group-hover/btn:text-accent transition-colors duration-300">
            {need.title}
          </span>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 p-1.5 rounded-full bg-card-bg border border-card-border text-foreground"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <div className="pb-8 px-6 md:pb-8 md:px-8 pt-6 border-t border-card-border/50 flex flex-col md:flex-row gap-6 items-start">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${need.accent} text-white flex-shrink-0 hidden md:block`}>
                <Icon size={28} />
              </div>
              <div className="space-y-4">
                <p className="text-sm md:text-base text-text-muted leading-relaxed font-sans">
                  {need.description}
                </p>
                <div className="inline-flex items-center text-xs font-semibold text-accent gap-1">
                  Rozwiązanie TimeTo.do
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Needs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="needs" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-accent-glow/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16 space-y-4">
          <ScrollReveal variant="blur" delay={0.05} duration={0.6}>
            <div className="text-xs font-bold tracking-wider text-accent uppercase">
              Wasze Wyzwania
            </div>
          </ScrollReveal>
          <ScrollReveal variant="blur" delay={0.1} duration={0.8}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-heading">
              Jak rozumiemy Wasze potrzeby?
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="blur" delay={0.15} duration={0.8}>
            <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto font-sans">
              Zidentyfikowaliśmy kluczowe wyzwania, przed którymi stoi nowoczesny marketing efektywnościowy. Oto jak na nie odpowiadamy.
            </p>
          </ScrollReveal>
        </div>

        <div className="space-y-4">
          {needs.map((need, index) => (
            <NeedAccordionItem
              key={index}
              need={need}
              index={index}
              isOpen={activeIndex === index}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
