"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import { useInView, motion, useMotionValue, useSpring, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { BarChart3, TrendingUp, Users, ShieldCheck, ShoppingBag, PhoneCall, Zap, CreditCard } from "lucide-react";

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

function Counter({ value, isDecimal = false }: { value: number; isDecimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const duration = 1.2;
      const totalMiliseconds = duration * 1000;
      const intervalTime = 25;
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
  }, [isInView, value]);

  const formattedCount = isDecimal 
    ? count.toFixed(1) 
    : Math.floor(count).toLocaleString("pl-PL").replace(/,/g, " ");

  return (
    <span ref={ref} className="tabular-nums">
      {formattedCount}
    </span>
  );
}

function CaseCard({ c, index }: { c: typeof cases[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = c.icon;
  const colors = gradientMap[c.gradient] || { from: "#4F46E5", to: "#818CF8", glow: "rgba(79, 70, 229, 0.25)" };

  const isEven = index % 2 === 0;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const stiffness = 160;
  const damping = 22;
  const rotateX = useSpring(tiltX, { stiffness, damping });
  const rotateY = useSpring(tiltY, { stiffness, damping });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    mouseX.set(localX);
    mouseY.set(localY);

    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    const percentX = (e.clientX - cardCenterX) / (rect.width / 2);
    const percentY = (e.clientY - cardCenterY) / (rect.height / 2);
    
    tiltX.set(-percentY * 3);
    tiltY.set(percentX * 3);
  }

  function handleMouseLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  const cardVariants = {
    hidden: {
      y: 80,
      opacity: 0,
      filter: "blur(6px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 18,
        duration: 0.8
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        "--glow-shadow": colors.glow
      } as any}
      className={`group relative w-full h-[60vh] min-h-[460px] md:h-[65vh] md:min-h-[520px] rounded-[32px] bg-card-bg border border-card-border p-6 md:p-8 flex flex-col gap-6 md:gap-12 items-center shadow-2xl hover:border-accent/40 transition-[border-color,background-color] duration-500 overflow-hidden ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${colors.glow},
              transparent 85%
            )
          `,
        }}
      />

      <div 
        className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 z-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`
        }}
      />

      <div className="w-full md:w-[45%] aspect-video md:aspect-square lg:aspect-[4/3] overflow-hidden rounded-[24px] relative border border-card-border/50 shrink-0 z-10">
        <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-background/85 backdrop-blur-md border border-card-border/50 text-[10px] font-bold tracking-wider text-accent font-heading z-10">
          {c.category}
        </div>
        <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-background/85 backdrop-blur-md border border-card-border/50 text-accent z-10 shadow-sm">
          <Icon size={16} />
        </div>
        <img 
          src={c.image} 
          alt={c.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card-bg/60 to-transparent pointer-events-none" />
      </div>

      <div className="w-full md:w-[55%] flex flex-col justify-between self-stretch z-10 text-left space-y-6 md:space-y-8 py-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-accent uppercase tracking-wider block">
              Obszar: {c.category}
            </span>
            <span className="text-[10px] font-bold text-text-muted font-mono">
              {String(index + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground font-heading tracking-tight leading-tight">
            {c.title}
          </h3>
          <p className="text-sm text-text-muted leading-relaxed font-sans font-normal">
            {c.desc}
          </p>
          
          <div className="flex flex-wrap gap-2 pt-2">
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

        <div className="border-t border-card-border/50 pt-6 flex flex-col">
          <span className="text-[10px] font-bold text-text-muted uppercase mb-1.5 tracking-wider">
            Główny wynik kampanii:
          </span>
          <div className="flex items-baseline">
            <span className={`text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r ${c.gradient} bg-clip-text text-transparent font-heading leading-none`}>
              <Counter value={c.statValue} isDecimal={c.isDecimal} />
            </span>
            <span className="text-sm font-bold text-text-muted font-sans ml-2">
              {c.statSuffix}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CaseCardWrapper({ c, index, total }: { c: typeof cases[0]; index: number; total: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.35, 1], [1, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.85, 1], [1, 1, 0, 0]);
  const blurValue = useTransform(scrollYProgress, [0, 0.35, 0.85], [0, 0, 4]);
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[130vh] last:h-[110vh]"
    >
      <motion.div
        style={{ 
          scale, 
          opacity, 
          filter,
          zIndex: (index + 1) * 10
        }}
        className="sticky top-[125px] md:top-[155px] w-full flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto w-full max-w-5xl px-4 md:px-8">
          <CaseCard c={c} index={index} />
        </div>
      </motion.div>
    </div>
  );
}

export default function CaseStudies() {
  return (
    <section id="cases" className="py-24 md:py-32 bg-background relative border-b border-card-border">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/3 blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24 px-4 space-y-4">
          <span className="text-xs font-bold tracking-wider text-accent uppercase">
            Nasze Sukcesy
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground font-heading tracking-tight leading-tight">
            Zobacz nasze <span className="bg-gradient-to-r from-accent to-indigo-500 bg-clip-text text-transparent">Case Studies</span>
          </h2>
          <p className="text-sm md:text-base text-text-muted font-sans leading-relaxed">
            Poznaj realne wyniki, które dostarczyliśmy dla naszych partnerów. Przewijaj dalej, aby zobaczyć kolejne projekty nakładające się na siebie w stos.
          </p>
        </div>

        <div className="relative">
          {cases.map((c, index) => (
            <CaseCardWrapper 
              key={c.id} 
              c={c} 
              index={index} 
              total={cases.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
