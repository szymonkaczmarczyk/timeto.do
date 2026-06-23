"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, TrendingUp, Compass, Zap, Users, ShieldCheck } from "lucide-react";
import Magnetic from "@/components/Magnetic";

const benefits = [
  { text: "Szybki start działań", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
  { text: "Sprawna realizacja", icon: Compass, color: "text-blue-500", bg: "bg-blue-500/10" },
  { text: "Mierzalne efekty", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { text: "Bieżąca optymalizacja", icon: CheckCircle2, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { text: "Responsywny zespół", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
  { text: "Kontrola jakości", icon: ShieldCheck, color: "text-rose-500", bg: "bg-rose-500/10" },
];

export default function Hero() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = id === "contact" ? 100 : 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="hero" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-background">
      {/* Premium Aurora/Plasma shifting background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[10%] w-[350px] md:w-[650px] h-[350px] md:h-[650px] rounded-full bg-accent/15 dark:bg-accent/20 blur-[120px] animate-aurora-1" />
        <div className="absolute bottom-[10%] right-[5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-[110px] animate-aurora-2" />
        <div className="absolute top-[40%] right-[15%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full bg-fuchsia-500/10 dark:bg-fuchsia-500/15 blur-[100px] animate-aurora-3" />
        <div className="absolute bottom-[20%] left-[15%] w-[280px] md:w-[550px] h-[280px] md:h-[550px] rounded-full bg-amber-500/5 dark:bg-amber-500/10 blur-[90px] animate-aurora-4" />
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,119,198,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,119,198,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card-bg border border-card-border text-xs font-semibold text-accent mb-8 shadow-sm"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
          </span>
          Agencja Performance Marketingu Nowej Generacji
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-foreground font-heading leading-[1.1]"
        >
          Liczą się <span className="bg-gradient-to-r from-accent to-indigo-500 bg-clip-text text-transparent">efekty</span>,
          <br className="hidden md:inline" /> nie deklaracje.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="text-base md:text-xl text-text-muted max-w-2xl mb-12 font-sans font-normal leading-relaxed"
        >
          Wspieramy marki w planowaniu, realizacji i skalowaniu kampanii nastawionych na wynik. 
          Działamy w oparciu o twarde dane i nowoczesną analitykę.
        </motion.p>

        {/* CTA Buttons z przyciąganiem magnetycznym */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-6 mb-16"
        >
          <Magnetic range={50}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleScroll("contact")}
              className="w-full sm:w-auto px-8 py-4 bg-foreground text-background font-bold rounded-full text-lg shadow-xl hover:shadow-[0_20px_40px_rgba(79,70,229,0.15)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              Rozpocznij współpracę
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </Magnetic>

          <Magnetic range={50}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleScroll("cases")}
              className="w-full sm:w-auto px-8 py-4 bg-card-bg text-foreground font-semibold rounded-full text-lg border border-card-border hover:bg-foreground/5 flex items-center justify-center gap-2 cursor-pointer"
            >
              Zobacz Case Studies
            </motion.button>
          </Magnetic>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-5xl mt-8"
        >
          <h2 className="text-xs font-bold tracking-wider text-text-muted uppercase mb-8">
            Co zyskujesz we współpracy:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl bg-card-bg border border-card-border transition-all duration-300"
                >
                  <div className={`p-2.5 rounded-full ${benefit.bg} ${benefit.color} mb-3`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-center leading-tight">
                    {benefit.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
