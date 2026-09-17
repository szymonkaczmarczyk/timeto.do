"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BarChart3, TrendingUp, Users, ShieldCheck, ShoppingBag, PhoneCall, Zap, CreditCard } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const cases = [
  {
    id: 1,
    title: "Handel detaliczny RTV, AGD, IT",
    desc: "Optymalizacja koszyka zakupowego i dostarczanie wysoce konwertującego ruchu w segmencie elektroniki użytkowej. Zwiększyliśmy sprzedaż poprzez precyzyjne dotarcie do konsumentów o wysokiej intencji zakupowej.",
    statValue: 300,
    statSuffix: " transakcji / mc",
    category: "E-Commerce",
    icon: ShoppingBag,
    image: "/case_ecommerce.png",
    gradient: "from-blue-500 to-indigo-500",
    tags: ["Google Ads", "E-commerce", "ROAS", "Performance"],
  },
  {
    id: 2,
    title: "Branża zakładów sportowych",
    desc: "Wysokozasięgowe kampanie display, push i SMS realizowane pod presją czasu w trakcie Mistrzostw Europy w piłce nożnej. Skutecznie zaangażowaliśmy fanów sportu w czasie rzeczywistym.",
    statValue: 78141,
    statSuffix: " kliknięć",
    category: "Sport & Betting",
    icon: TrendingUp,
    image: "/case_other.png",
    gradient: "from-amber-500 to-orange-500",
    tags: ["SMS Marketing", "Push Notifications", "Display Ads", "Betting"],
  },
  {
    id: 3,
    title: "Branża deweloperska",
    desc: "Generowanie kalorycznych leadów dla inwestycji mieszkaniowych i komercyjnych w oparciu o lejki docelowe. Skróciliśmy czas konwersji od pierwszego kontaktu do zakupu.",
    statValue: 1000,
    statSuffix: "+ kontaktów / mc",
    category: "Real Estate",
    icon: Users,
    image: "/case_leadgen.png",
    gradient: "from-emerald-500 to-teal-500",
    tags: ["Lead Generation", "Lejki B2C", "Social Media", "Real Estate"],
  },
  {
    id: 4,
    title: "Sektor Bankowy",
    desc: "Skuteczne pozyskiwanie nowych klientów otwierających konta osobiste i firmowe za pomocą precyzyjnie targetowanych wysyłek mailowych i kampanii display w kanałach partnerskich.",
    statValue: 100,
    statSuffix: "% realizacji celu",
    category: "Finanse",
    icon: ShieldCheck,
    image: "/case_finance.png",
    gradient: "from-rose-500 to-red-500",
    tags: ["Email Campaigns", "Display Banner", "Finanse B2B", "Programmatic"],
  },
  {
    id: 5,
    title: "Segment FMCG",
    desc: "Dedykowana kampania performance dla znanej sieci dyskontowej specjalizującej się w sprzedaży marek premium. Optymalizacja stawek przełożyła się na rekordowy zwrot z nakładów na reklamę.",
    statValue: 8.5,
    statSuffix: "x ROAS",
    category: "Retail / FMCG",
    icon: BarChart3,
    image: "/case_ecommerce.png",
    isDecimal: true,
    gradient: "from-purple-500 to-pink-500",
    tags: ["Meta Ads", "FMCG", "Optymalizacja Stawek", "Retail"],
  },
  {
    id: 6,
    title: "Branża motoryzacyjna",
    desc: "Dostarczanie stargetowanego ruchu na landing page jazd próbnych oraz konfiguratorów nowych modeli SUV-ów. Pozyskaliśmy potencjalnych klientów o najwyższym stopniu dopasowania do kryteriów salonów.",
    statValue: 120,
    statSuffix: "% wzrostu ruchu",
    category: "Automotive",
    icon: Zap,
    image: "/case_other.png",
    gradient: "from-sky-500 to-indigo-500",
    tags: ["Google Search", "Lead Nurturing", "Automotive", "Conversion Rate"],
  },
  {
    id: 7,
    title: "Usługi telekomunikacyjne",
    desc: "Zwiększenie sprzedaży abonamentów domowych poprzez dotarcie do użytkowników w kluczowych momentach decyzyjnych za pomocą spersonalizowanych komunikatów o ograniczonej czasowo promocji.",
    statValue: 2.4,
    statSuffix: "x wyższa konwersja",
    category: "Telecom",
    icon: PhoneCall,
    image: "/case_leadgen.png",
    isDecimal: true,
    gradient: "from-yellow-500 to-amber-500",
    tags: ["SMS marketing", "A/B Testing", "Telecom", "CRO"],
  },
  {
    id: 8,
    title: "Marka odzieżowa premium",
    desc: "Budowanie zaangażowania i stymulowanie sprzedaży w e-sklepie luksusowej marki fashion za pomocą kreacji display i email. Osiągnęliśmy to poprzez głęboką segmentację bazy subskrybentów.",
    statValue: 25000,
    statSuffix: "+ kliknięć / mc",
    category: "Fashion",
    icon: ShoppingBag,
    image: "/case_ecommerce.png",
    gradient: "from-violet-500 to-purple-500",
    tags: ["Email Marketing", "Segmentation B2C", "Premium Fashion", "E-shop"],
  },
  {
    id: 9,
    title: "Operator rozwiązań płatniczych",
    desc: "Wieloletnia współpraca performance przekładająca się na stabilne, masowe pozyskiwanie partnerów B2B oraz dystrybucję terminali płatniczych dla małych i średnich przedsiębiorstw.",
    statValue: 17100,
    statSuffix: "+ transakcji sprzedaży",
    category: "Fintech / B2B",
    icon: CreditCard,
    image: "/case_finance.png",
    gradient: "from-fuchsia-500 to-rose-500",
    tags: ["Fintech B2B", "Email cold outreach", "Terminal Sales", "Sales Lejki"],
  },
];

const gradientMap: Record<string, { from: string; to: string; glow: string }> = {
  "from-blue-500 to-indigo-500": { from: "#3B82F6", to: "#6366F1", glow: "rgba(99, 102, 241, 0.25)" },
  "from-amber-500 to-orange-500": { from: "#F59E0B", to: "#F97316", glow: "rgba(249, 115, 22, 0.25)" },
  "from-emerald-500 to-teal-500": { from: "#10B981", to: "#14B8A6", glow: "rgba(20, 184, 166, 0.25)" },
  "from-rose-500 to-red-500": { from: "#F43F5E", to: "#EF4444", glow: "rgba(239, 68, 68, 0.25)" },
  "from-purple-500 to-pink-500": { from: "#A855F7", to: "#EC4899", glow: "rgba(236, 72, 153, 0.25)" },
  "from-sky-500 to-indigo-500": { from: "#0EA5E9", to: "#6366F1", glow: "rgba(99, 102, 241, 0.25)" },
  "from-yellow-500 to-amber-500": { from: "#EAB308", to: "#F59E0B", glow: "rgba(245, 158, 11, 0.25)" },
  "from-violet-500 to-purple-500": { from: "#8B5CF6", to: "#A855F7", glow: "rgba(168, 85, 247, 0.25)" },
  "from-fuchsia-500 to-rose-500": { from: "#D946EF", to: "#F43F5E", glow: "rgba(244, 63, 94, 0.25)" },
};

function Counter({ value, isDecimal = false, trigger }: { value: number; isDecimal?: boolean; trigger: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (trigger) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const duration = 0.8;
      const totalMiliseconds = duration * 1000;
      const intervalTime = 20;
      const steps = totalMiliseconds / intervalTime;
      const increment = (end - start) / steps;

      let current = start;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(current);
        }
      }, intervalTime);

      return () => clearInterval(timer);
    }
  }, [trigger, value]);

  const formattedCount = isDecimal
    ? count.toFixed(1)
    : Math.floor(count).toLocaleString("pl-PL").replace(/,/g, " ");

  return <span className="tabular-nums">{formattedCount}</span>;
}

function ParallaxSlide({
  c,
  index,
  scrollYProgress,
  total,
}: {
  c: typeof cases[0];
  index: number;
  scrollYProgress: any;
  total: number;
}) {
  const Icon = c.icon;

  const centerPoint = index / (total - 1);
  const step = 1 / (total - 1);
  const range = [
    Math.max(0, centerPoint - step),
    centerPoint,
    Math.min(1, centerPoint + step),
  ];

  const xOffset = useTransform(scrollYProgress, range, [40, 0, -40]);
  const imageX = useTransform(scrollYProgress, range, [-15, 0, 15]);
  const textX = useTransform(scrollYProgress, range, [15, 0, -15]);

  const [shouldAnimate, setShouldAnimate] = useState(false);
  const activeTransform = useTransform(scrollYProgress, range, [0, 1, 0]);

  useEffect(() => {
    return activeTransform.onChange((val) => {
      if (val > 0.75 && !shouldAnimate) {
        setShouldAnimate(true);
      }
    });
  }, [activeTransform, shouldAnimate]);

  return (
    <div className="w-screen h-full flex-shrink-0 flex items-center justify-center relative overflow-hidden px-4 md:px-12">
      <motion.div
        style={{ x: xOffset }}
        className="w-full max-w-5xl bg-card-bg border border-card-border/60 rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center shadow-lg relative z-10 overflow-hidden max-h-[85%]"
      >
        <div className="w-full md:w-[45%] aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden relative border border-card-border/50 shrink-0 z-10">
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/85 backdrop-blur-md border border-card-border/50 text-[10px] font-bold tracking-wider text-accent font-heading z-20">
            {c.category}
          </div>
          <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-background/85 backdrop-blur-md border border-card-border/50 text-accent z-20 shadow-sm">
            <Icon size={16} />
          </div>

          <motion.img
            style={{ x: imageX, scale: 1.02 }}
            src={c.image}
            alt={c.title}
            className="w-full h-full object-cover transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card-bg/60 to-transparent pointer-events-none z-10" />
        </div>

        <motion.div
          style={{ x: textX }}
          className="w-full md:w-[55%] flex flex-col justify-between self-stretch text-left space-y-4 md:space-y-6"
        >
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                Case Study {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-bold text-text-muted font-mono">
                {index + 1} / {total}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground font-heading tracking-tight leading-tight">
              {c.title}
            </h3>

            <p className="text-xs md:text-sm text-text-muted leading-relaxed font-sans font-normal">
              {c.desc}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {c.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded bg-card-border/50 text-[10px] font-bold text-text-muted uppercase tracking-wider font-sans"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-card-border/50 pt-4 md:pt-6 flex flex-col">
            <span className="text-[10px] font-bold text-text-muted uppercase mb-1 tracking-wider">
              Główny wynik kampanii:
            </span>
            <div className="flex items-baseline">
              <span className={`text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r ${c.gradient} bg-clip-text text-transparent font-heading leading-none`}>
                <Counter value={c.statValue} isDecimal={c.isDecimal} trigger={shouldAnimate} />
              </span>
              <span className="text-xs md:text-sm font-bold text-text-muted font-sans ml-2">
                {c.statSuffix}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(cases.length - 1) * 100}vw`]);

  const glowColor = useTransform(
    scrollYProgress,
    cases.map((_, i) => i / (cases.length - 1)),
    cases.map((c) => gradientMap[c.gradient]?.from || "#4F46E5")
  );

  return (
    <section
      ref={containerRef}
      id="cases"
      className="relative h-[800vh] bg-background"
    >
      <div className="sticky top-[80px] h-[calc(100vh-80px)] w-full overflow-hidden flex flex-col justify-center bg-background border-b border-card-border">
        <motion.div
          style={{ backgroundColor: glowColor }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full blur-[140px] opacity-[0.06] dark:opacity-[0.09] pointer-events-none z-0 transition-colors duration-500"
        />

        <div className="absolute top-6 left-0 right-0 max-w-4xl mx-auto text-center px-4 z-20 pointer-events-none">
          <ScrollReveal variant="blur" delay={0.05} duration={0.6}>
            <span className="text-[10px] font-bold tracking-wider text-accent uppercase bg-card-bg/60 border border-card-border px-3 py-1 rounded-full">
              Nasze Sukcesy
            </span>
          </ScrollReveal>
          <ScrollReveal variant="blur" delay={0.1} duration={0.8}>
            <h2 className="text-lg md:text-2xl font-black text-foreground font-heading tracking-tight mt-2.5">
              Nasze <span className="bg-gradient-to-r from-accent to-indigo-500 bg-clip-text text-transparent">Case Studies</span> (Przewiń w dół)
            </h2>
          </ScrollReveal>
        </div>

        <motion.div
          style={{ x }}
          className="flex w-[900vw] h-full items-center z-10"
        >
          {cases.map((c, index) => (
            <ParallaxSlide
              key={c.id}
              c={c}
              index={index}
              scrollYProgress={scrollYProgress}
              total={cases.length}
            />
          ))}
        </motion.div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 h-1 bg-card-border rounded-full z-20 overflow-hidden">
          <motion.div
            style={{
              scaleX: scrollYProgress,
              transformOrigin: "left",
            }}
            className="w-full h-full bg-accent"
          />
        </div>

      </div>
    </section>
  );
}
