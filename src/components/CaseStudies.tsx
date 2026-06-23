"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import { useInView, motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { BarChart3, TrendingUp, Users, ShieldCheck, ShoppingBag, PhoneCall, Zap, CreditCard } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

// Definicja Case Studies z dedykowanymi ilustracjami
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
    shadow: "shadow-blue-500/10",
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
    shadow: "shadow-amber-500/10",
  },
  {
    id: 3,
    title: "Branża deweloperska",
    desc: "Generowanie kalorycznych leadów dla inwestycji mieszkaniowych i komercyjnych w oparciu o wielokanałowe lejki docelowe. Skróciliśmy czas konwersji od pierwszego kontaktu do zakupu.",
    statValue: 1000,
    statSuffix: "+ kontaktów / mc",
    category: "Real Estate",
    icon: Users,
    image: "/case_leadgen.png",
    gradient: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/10",
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
    shadow: "shadow-rose-500/10",
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
    shadow: "shadow-purple-500/10",
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
    shadow: "shadow-sky-500/10",
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
    shadow: "shadow-yellow-500/10",
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
    shadow: "shadow-violet-500/10",
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
    shadow: "shadow-fuchsia-500/10",
  },
];

// Komponent animowanego licznika
function Counter({ value, suffix, isDecimal = false }: { value: number; suffix: string; isDecimal?: boolean }) {
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
    <span ref={ref} className="font-black tracking-tight tabular-nums text-foreground">
      {formattedCount}
      <span className="text-sm md:text-base font-bold text-text-muted font-sans ml-1">
        {suffix}
      </span>
    </span>
  );
}

// Pojedyncza karta w układzie pionowym naprzemiennym (split screen)
function CaseRow({ c, index }: { c: typeof cases[0]; index: number }) {
  const Icon = c.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const stiffness = 160;
  const damping = 22;
  const rotateX = useSpring(x, { stiffness, damping });
  const rotateY = useSpring(y, { stiffness, damping });

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
    
    x.set(-percentY * 4); // Minimalny, ekskluzywny przechył
    y.set(percentX * 4);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const isEven = index % 2 === 0;

  return (
    <ScrollReveal variant="blur" delay={0.05} duration={0.5}>
      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`w-full p-6 md:p-8 rounded-[32px] bg-card-bg border border-card-border flex flex-col ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        } gap-8 md:gap-12 items-center shadow-sm hover:${c.shadow} transition-[border-color,background-color,box-shadow] duration-300 relative overflow-hidden group`}
      >
        {/* Spotlight hover effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                var(--accent-glow),
                transparent 85%
              )
            `,
          }}
        />

        {/* 1. Image container */}
        <div className="w-full md:w-[45%] h-52 md:h-72 overflow-hidden rounded-[24px] relative group/img border border-card-border/50 shrink-0 z-10">
          {/* Badge over image */}
          <div className="absolute top-3 left-3 px-3.5 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-card-border/50 text-[10px] font-bold tracking-wider text-accent font-heading z-10">
            {c.category}
          </div>
          {/* Icon float over image */}
          <div className="absolute top-3 right-3 p-2.5 rounded-xl bg-background/80 backdrop-blur-md border border-card-border/50 text-accent z-10 shadow-sm">
            <Icon size={16} />
          </div>
          
          <img 
            src={c.image} 
            alt={c.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card-bg/60 to-transparent pointer-events-none" />
        </div>

        {/* 2. Text Details container */}
        <div className="w-full md:w-[55%] flex flex-col justify-between space-y-4 md:space-y-6 z-10">
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">
              Obszar: {c.category}
            </span>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground font-heading tracking-tight leading-tight">
              {c.title}
            </h3>
            <p className="text-xs md:text-sm text-text-muted leading-relaxed font-sans font-normal">
              {c.desc}
            </p>
          </div>

          {/* Metric block */}
          <div className="border-t border-card-border/50 pt-4 md:pt-5 flex flex-col">
            <span className="text-[10px] font-bold text-text-muted uppercase mb-1 tracking-wider">
              Główny wynik kampanii:
            </span>
            <span className="text-2xl md:text-3xl lg:text-4xl text-accent font-heading">
              <Counter value={c.statValue} suffix={c.statSuffix} isDecimal={c.isDecimal} />
            </span>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function CaseStudies() {
  return (
    <section id="cases" className="py-24 md:py-32 bg-background border-b border-card-border relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header section */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
          <span className="text-xs font-bold tracking-wider text-accent uppercase">
            Nasze Sukcesy
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground font-heading tracking-tight leading-tight">
            Zobacz nasze <span className="bg-gradient-to-r from-accent to-indigo-500 bg-clip-text text-transparent">Case Studies</span>
          </h2>
          <p className="text-sm md:text-base text-text-muted font-sans leading-relaxed">
            Poznaj realne wyniki, które dostarczyliśmy dla partnerów. Przewijaj dalej, aby zobaczyć twarde dane biznesowe krok po kroku.
          </p>
        </div>

        {/* Vertical Stack of alternating rows */}
        <div className="space-y-8 md:space-y-12">
          {cases.map((c, index) => (
            <CaseRow key={c.id} c={c} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
