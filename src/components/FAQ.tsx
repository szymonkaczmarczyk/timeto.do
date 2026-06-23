"use client";

import { useState, MouseEvent } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const faqs = [
  {
    question: "W jakim modelu rozliczacie współpracę?",
    answer: "Każdą współpracę wyceniamy indywidualnie w oparciu o cele. Najczęściej pracujemy w modelu hybrydowym: stała opłata abonamentowa za konfigurację i bieżącą obsługę kampanii + prowizja od efektu (Success Fee / CPA / CPL) powiązana bezpośrednio z wygenerowaną sprzedażą lub leadami.",
  },
  {
    question: "Jak szybko startują pierwsze kampanie?",
    answer: "Wiemy, że w marketingu liczy się czas. Czas przygotowania kampanii zależy od skomplikowania projektu, lecz zazwyczaj pierwsze zintegrowane działania (np. mailingi, kampanie SMS czy display) uruchamiamy w ciągu 48-72 godzin od momentu zatwierdzenia strategii i kreacji.",
  },
  {
    question: "Czy mam dostęp do wyników i raportów na żywo?",
    answer: "Tak, pełna przejrzystość to nasz fundament. Dla każdego klienta wdrażamy dedykowany, interaktywny dashboard analityczny w czasie rzeczywistym. Widzisz tam każdą wydaną złotówkę, wskaźniki CPC/CTR oraz twarde konwersje i leady bez opóźnień.",
  },
  {
    question: "Z jakimi budżetami marketingowymi pracujecie?",
    answer: "Nie narzucamy sztywnych limitów budżetowych. Pracujemy zarówno przy precyzyjnych kampaniach testowych, jak i masowych, ogólnokrajowych kampaniach performance. Kluczem jest wykazanie zyskowności (ROI) w fazie testowej – gdy model działa, wspólnie skalujemy wydatki.",
  },
  {
    question: "Czy realizujecie wysyłki na bazach własnych czy powierzonych?",
    answer: "Pracujemy w obu modelach. Posiadamy dostęp do zewnętrznych, w pełni legalnych baz odbiorców (zgodnych z RODO) o wysokim stopniu zaangażowania, podzielonych według zainteresowań. Możemy również realizować zautomatyzowane kampanie na bazach powierzonych przez Ciebie.",
  },
];

function FAQItem({
  question,
  answer,
  index,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onClick: () => void;
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
        <div className="flex items-center space-x-4 pr-4">
          <HelpCircle size={20} className="text-accent flex-shrink-0" />
          <span className="text-base md:text-lg font-bold text-foreground font-heading group-hover/btn:text-accent transition-colors duration-300">
            {question}
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
            <div className="pb-8 px-6 md:pb-8 md:px-14 pt-6 border-t border-card-border/50 text-sm md:text-base text-text-muted leading-relaxed font-sans">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-card-bg/10 relative overflow-hidden border-b border-card-border">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-accent-glow/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16 space-y-4">
          <ScrollReveal variant="blur" delay={0.05} duration={0.6}>
            <div className="text-xs font-bold tracking-wider text-accent uppercase">
              Częste pytania
            </div>
          </ScrollReveal>
          <ScrollReveal variant="blur" delay={0.1} duration={0.8}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-heading">
              Masz pytania?
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="blur" delay={0.15} duration={0.8}>
            <p className="text-text-muted text-base md:text-lg max-w-xl mx-auto font-sans">
              Zebraliśmy odpowiedzi na kwestie, które najczęściej omawiamy przy startowaniu nowych projektów.
            </p>
          </ScrollReveal>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
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
