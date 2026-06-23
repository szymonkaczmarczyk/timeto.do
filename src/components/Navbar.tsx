"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import Image from "next/image";
import Magnetic from "@/components/Magnetic";

const navItems = [
  { label: "O nas", href: "about" },
  { label: "Wasze potrzeby", href: "needs" },
  { label: "Case Studies", href: "cases" },
  { label: "Jak działamy", href: "how-it-works" },
];

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Synchronizacja motywu przy montowaniu
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    setTheme(isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleScroll = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = id === "contact" ? 100 : 80; // Obniżamy o 20px dla kontaktu
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

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-background/80 dark:bg-background/80 backdrop-blur-xl border-b border-card-border shadow-sm"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex md:grid md:grid-cols-3 items-center justify-between w-full relative">
          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center md:static md:left-auto md:translate-x-0 md:top-auto md:translate-y-0 md:justify-start">
            <button
              onClick={() => handleScroll("hero")}
              className="relative w-44 h-12 flex items-center justify-center focus:outline-none cursor-pointer"
            >
              <Image
                src="/logo.png"
                alt="Timeto.do Logo"
                fill
                className="object-contain object-center dark:invert dark:brightness-200 transition-all duration-300"
                priority
              />
            </button>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleScroll(item.href)}
                className="text-sm font-medium hover:text-accent transition-colors duration-300 cursor-pointer text-foreground/80 dark:text-foreground/90 whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Actions (Theme Toggle & CTA z efektem magnetycznym) */}
          <div className="hidden md:flex items-center justify-end space-x-4">
            <Magnetic range={30}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-card-bg border border-card-border hover:bg-foreground/5 cursor-pointer text-foreground flex items-center justify-center transition-colors duration-300"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              </motion.button>
            </Magnetic>

            <Magnetic range={45}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleScroll("contact")}
                className="px-5 py-2.5 bg-foreground text-background text-sm font-semibold rounded-full hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Rozpocznij współpracę
              </motion.button>
            </Magnetic>
          </div>

          {/* Mobile Actions Button */}
          <div className="flex md:hidden items-center space-x-3 ml-auto">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-card-bg border border-card-border text-foreground flex items-center justify-center cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-card-bg border border-card-border text-foreground flex items-center justify-center cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 pt-24 pb-8 px-4 bg-background flex flex-col md:hidden"
          >
            <div className="flex flex-col space-y-6 items-center justify-center flex-grow">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleScroll(item.href)}
                  className="text-2xl font-semibold text-foreground/80 dark:text-foreground/90 hover:text-accent transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="w-full mt-auto flex flex-col items-center justify-center">
              <button
                onClick={() => handleScroll("contact")}
                className="w-full max-w-sm py-4 bg-foreground text-background text-center font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Rozpocznij współpracę
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
