"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Send, MapPin, CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const goalsList = [
  {
    id: "sales",
    label: "Więcej sprzedaży online (E-commerce)",
    desc: "Skuteczne kampanie dla e-sklepów, optymalizacja konwersji i ROAS",
    activeClass: "bg-gradient-to-r from-blue-500 to-indigo-600 border-transparent text-white shadow-md shadow-blue-500/20"
  },
  {
    id: "leads",
    label: "Pozyskiwanie leadów (B2B / Usługi)",
    desc: "Generowanie wartościowych zapytań ofertowych i kontaktów biznesowych",
    activeClass: "bg-gradient-to-r from-amber-500 to-orange-600 border-transparent text-white shadow-md shadow-orange-500/20"
  },
  {
    id: "awareness",
    label: "Budowanie świadomości marki",
    desc: "Zwiększanie widoczności firmy w sieci i kreowanie wizerunku eksperta",
    activeClass: "bg-gradient-to-r from-emerald-500 to-teal-600 border-transparent text-white shadow-md shadow-emerald-500/20"
  },
  {
    id: "traffic",
    label: "Zwiększenie jakościowego ruchu",
    desc: "Pozyskiwanie wartościowych użytkowników zainteresowanych ofertą",
    activeClass: "bg-gradient-to-r from-rose-500 to-red-600 border-transparent text-white shadow-md shadow-rose-500/20"
  },
];

const channelsList = [
  { id: "email", label: "E-mail marketing" },
  { id: "sms", label: "SMS marketing" },
  { id: "display", label: "Display (Programmatic)" },
  { id: "push", label: "Push notifications" },
  { id: "callcenter", label: "Call Center" },
  { id: "richmedia", label: "Rich media" },
  { id: "play", label: "Play (Kampanie operatorskie)" },
];

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<number>(25000);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (emailVal: string) => {
    if (!emailVal) {
      return "Adres e-mail jest wymagany";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      return "Wprowadź poprawny adres e-mail (np. nazwa@domena.pl)";
    }
    return "";
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (emailError) {
      setEmailError(validateEmail(val));
    }
  };

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email));
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const toggleChannel = (id: string) => {
    setSelectedChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setStep(1);
      setName("");
      setEmail("");
      setEmailError("");
      setMessage("");
      setSelectedGoals([]);
      setSelectedChannels([]);
      setSelectedBudget(25000);
      setTimeout(() => setIsSent(false), 6000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-glow/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16 space-y-4">
          <ScrollReveal variant="blur" delay={0.05} duration={0.6}>
            <div className="text-xs font-bold tracking-wider text-accent uppercase">
              Skonfiguruj kampanię
            </div>
          </ScrollReveal>
          <ScrollReveal variant="blur" delay={0.1} duration={0.8}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-heading">
              Rozpocznijmy współpracę
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="blur" delay={0.15} duration={0.8}>
            <p className="text-text-muted text-base md:text-lg max-w-xl mx-auto font-sans">
              Wypełnij krótki kreator briefu – pomoże nam to szybciej przygotować dedykowaną strategię marketingową.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 p-6 md:p-10 rounded-[32px] bg-card-bg border border-card-border shadow-sm min-h-[540px] lg:h-full flex flex-col justify-between relative"
          >
            <div className="w-full mb-6">
              <div className="flex justify-between items-center text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                <span>Krok {step} z 3</span>
                <span>{step === 1 ? "Cele" : step === 2 ? "Kanały" : "Budżet i dane"}</span>
              </div>
              <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent"
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-center py-2 w-full">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-foreground font-heading">
                      Jakie są Twoje główne cele biznesowe?
                    </h3>
                    <p className="text-xs text-text-muted font-sans mb-4">
                      Zaznacz te obszary, w których potrzebujesz największego wsparcia.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {goalsList.map((goal) => {
                        const isSelected = selectedGoals.includes(goal.id);
                        return (
                          <button
                            key={goal.id}
                            type="button"
                            onClick={() => toggleGoal(goal.id)}
                            className={`p-5 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[110px] w-full ${
                              isSelected
                                ? goal.activeClass
                                : "bg-background border-card-border text-foreground hover:bg-foreground/5"
                            }`}
                          >
                            <div className="flex items-start justify-between w-full">
                              <span className="font-bold text-sm leading-tight">{goal.label}</span>
                              {isSelected && (
                                <span className="text-xs ml-2 flex-shrink-0 bg-white/20 dark:bg-black/20 w-5 h-5 rounded-full flex items-center justify-center">
                                  ✓
                                </span>
                              )}
                            </div>
                            <p
                              className={`text-[11px] mt-2 font-normal leading-snug ${
                                isSelected ? "text-white/80 dark:text-black/85" : "text-text-muted"
                              }`}
                            >
                              {goal.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-foreground font-heading">
                      Które kanały dotarcia Cię interesują?
                    </h3>
                    <p className="text-xs text-text-muted font-sans mb-4">
                      Wybierz kanały, które chcesz przetestować lub wdrożyć.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {channelsList.map((ch) => {
                        const isSelected = selectedChannels.includes(ch.id);
                        return (
                          <button
                            key={ch.id}
                            type="button"
                            onClick={() => toggleChannel(ch.id)}
                            className={`p-3 rounded-xl text-left border font-semibold text-xs transition-all duration-300 flex items-center justify-between cursor-pointer min-h-[52px] w-full ${
                              isSelected
                                ? "bg-accent border-accent text-white dark:text-black shadow-md shadow-accent/15"
                                : "bg-background border-card-border text-foreground hover:bg-foreground/5"
                            }`}
                          >
                            <span>{ch.label}</span>
                            {isSelected && <span className="text-xs ml-2 flex-shrink-0">✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 md:space-y-5 flex-grow flex flex-col h-full w-full justify-between"
                  >
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm md:text-base font-bold text-foreground font-heading">
                          Jaki budżet miesięczny przewidujesz?
                        </h3>
                        <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full flex-shrink-0">
                          {selectedBudget === 100000
                            ? "ponad 100 000 PLN / mc"
                            : `${selectedBudget.toLocaleString("pl-PL")} PLN / mc`}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="5000"
                        max="100000"
                        step="5000"
                        value={selectedBudget}
                        onChange={(e) => setSelectedBudget(Number(e.target.value))}
                        className="w-full h-1.5 rounded-lg appearance-none cursor-pointer outline-none focus:ring-1 focus:ring-accent transition-all duration-150 custom-range"
                        style={{
                          background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${((selectedBudget - 5000) / (100000 - 5000)) * 100}%, var(--card-border) ${((selectedBudget - 5000) / (100000 - 5000)) * 100}%, var(--card-border) 100%)`
                        }}
                      />
                      <div className="flex justify-between text-[9px] md:text-[10px] font-bold text-text-muted px-1 mt-1 font-sans">
                        <span>5 000 PLN</span>
                        <span>25 000</span>
                        <span>50 000</span>
                        <span>75 000</span>
                        <span>100 000+</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                          Imię
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Twoje imię"
                          className="w-full px-3 py-2 rounded-xl bg-background border border-card-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-xs font-sans"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                          E-mail
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          onBlur={handleEmailBlur}
                          placeholder="Twój adres e-mail"
                          className={`w-full px-3 py-2 rounded-xl bg-background border focus:ring-1 outline-none transition-colors text-xs font-sans ${
                            emailError
                              ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                              : "border-card-border focus:border-accent focus:ring-accent"
                          }`}
                        />
                        {emailError && (
                          <span className="text-[10px] font-semibold text-rose-500 block mt-1 font-sans">
                            {emailError}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5 flex-grow flex flex-col">
                      <label htmlFor="message" className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                        Opis Twoich oczekiwań / profilu firmy
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Opisz krótko profil Twojej firmy oraz Twoje oczekiwania wobec kampanii marketingowych..."
                        className="w-full flex-grow min-h-[140px] md:min-h-[180px] px-3 py-2 rounded-xl bg-background border border-card-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-xs font-sans resize-none"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="flex items-center justify-between pt-6 border-t border-card-border/50 mt-4 w-full">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 rounded-full border border-card-border text-foreground hover:bg-foreground/5 transition-colors text-sm font-bold flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft size={16} /> Wstecz
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-5 py-2.5 rounded-full bg-foreground text-background font-bold hover:opacity-90 transition-opacity text-sm flex items-center gap-1 cursor-pointer ml-auto"
                >
                  Dalej <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !name || !email || !!emailError}
                  className="px-6 py-2.5 rounded-full bg-accent text-white dark:text-black font-bold hover:shadow-lg hover:shadow-accent/15 transition-all text-sm flex items-center gap-1.5 cursor-pointer ml-auto disabled:opacity-50"
                >
                  {isSubmitting ? "Wysyłanie..." : "Wyślij Brief"}
                  <Send size={14} />
                </button>
              )}
            </div>

            <AnimatePresence>
              {isSent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-card-bg rounded-[32px] z-20 flex flex-col items-center justify-center p-8 text-center space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="p-4 rounded-full bg-emerald-500/10 text-emerald-500"
                  >
                    <CheckCircle size={48} />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-foreground font-heading">
                    Brief został wysłany!
                  </h4>
                  <p className="text-sm text-text-muted max-w-sm font-sans">
                    Dziękujemy za przesłanie konfiguracji kampanii. Nasz zespół przeanalizuje wybrane kanały i skontaktuje się z Tobą w ciągu 24 godzin z gotową propozycją działań.
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="px-5 py-2 rounded-full border border-card-border text-xs font-bold text-foreground hover:bg-foreground/5 cursor-pointer"
                  >
                    Zamknij
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>

          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal variant="blur" delay={0.05} duration={0.6}>
              <h3 className="text-xl md:text-2xl font-bold text-foreground font-heading mb-2">
                Nasz Zespół
              </h3>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                <div className="p-6 rounded-[24px] bg-card-bg border border-card-border hover:border-accent hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 space-y-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src="/jarek.jpg" 
                      alt="Jarek" 
                      className="w-14 h-14 rounded-full object-cover object-top border border-card-border flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-foreground font-heading">Jarek</h4>
                      <p className="text-xs font-semibold text-text-muted">CEO</p>
                    </div>
                  </div>
                  <div className="space-y-2.5 pt-2 border-t border-card-border/50">
                    <a href="tel:+48508606062" className="flex items-center gap-3 text-sm text-foreground/80 hover:text-accent transition-colors duration-300">
                      <Phone size={16} className="text-accent" />
                      +48 508 606 062
                    </a>
                    <a href="mailto:kontakt@timeto.do" className="flex items-center gap-3 text-sm text-foreground/80 hover:text-accent transition-colors duration-300">
                      <Mail size={16} className="text-accent" />
                      kontakt@timeto.do
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-foreground/80 hover:text-accent transition-colors duration-300">
                      <LinkedinIcon className="text-accent" />
                      Profil LinkedIn
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              >
                <div className="p-6 rounded-[24px] bg-card-bg border border-card-border hover:border-accent hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 space-y-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src="/filip.jpg" 
                      alt="Filip" 
                      className="w-14 h-14 rounded-full object-cover object-top border border-card-border flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-foreground font-heading">Filip</h4>
                      <p className="text-xs font-semibold text-text-muted">New Business Manager</p>
                    </div>
                  </div>
                  <div className="space-y-2.5 pt-2 border-t border-card-border/50">
                    <a href="tel:+48606562040" className="flex items-center gap-3 text-sm text-foreground/80 hover:text-accent transition-colors duration-300">
                      <Phone size={16} className="text-accent" />
                      +48 606 562 040
                    </a>
                    <a href="mailto:kontakt@timeto.do" className="flex items-center gap-3 text-sm text-foreground/80 hover:text-accent transition-colors duration-300">
                      <Mail size={16} className="text-accent" />
                      kontakt@timeto.do
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-foreground/80 hover:text-accent transition-colors duration-300">
                      <LinkedinIcon className="text-accent" />
                      Profil LinkedIn
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="pt-4 space-y-4">
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Dane firmowe:
              </h4>
              <div className="space-y-3 font-sans text-sm text-text-muted">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>
                    Timeto Sp. z o.o.<br />
                    ul. Ksawerego Dunikowskiego 10<br />
                    44-100 Gliwice
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        <div className="mt-24 pt-8 border-t border-card-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted font-sans">
          <div>
            © {new Date().getFullYear()} Timeto.do. Wszelkie prawa zastrzeżone.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-accent transition-colors duration-300">
              Polityka prywatności
            </a>
            <a href="#hero" className="hover:text-accent transition-colors duration-300">
              Do góry ↑
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
