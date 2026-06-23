"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import clsx from "clsx";

const cards = [
  {
    title: "Aplikacje Webowe",
    description: "Szybkie, skalowalne i bezpieczne systemy oparte o React i Node.js.",
    emoji: "🚀",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Mobile",
    description: "Natywne doświadczenia dla iOS i Android.",
    emoji: "📱",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "UI/UX Design",
    description: "Piękne, funkcjonalne i dostępne interfejsy z dbałością o detale.",
    emoji: "✨",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Automatyzacja",
    description: "Optymalizuj procesy biznesowe dzięki sztucznej inteligencji.",
    emoji: "🤖",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    title: "E-Commerce",
    description: "Wysoko konwertujące sklepy internetowe nowej generacji.",
    emoji: "🛍️",
    className: "md:col-span-3 md:row-span-1",
  },
];

function BentoCard({
  title,
  description,
  emoji,
  className,
}: {
  title: string;
  description: string;
  emoji: string;
  className?: string;
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={clsx(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-studioGray/5 dark:bg-studioGray border border-black/5 dark:border-white/10 p-8",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 159, 10, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 12,
            delay: 0.2,
          }}
          className="text-5xl mb-6 inline-block"
        >
          {emoji}
        </motion.div>
        <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{title}</h3>
        <p className="font-sans text-foreground/70">{description}</p>
      </div>
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <section className="py-32 px-4 max-w-7xl mx-auto w-full relative z-10 bg-background">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
          Nasze <span className="text-vibrantAmber">Możliwości</span>
        </h2>
        <p className="text-xl text-foreground/60 max-w-2xl font-sans">
          Oferujemy kompleksowe rozwiązania cyfrowe, które napędzają Twój biznes.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-6">
        {cards.map((card, index) => (
          <BentoCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
}
