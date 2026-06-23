"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Sprawdzenie motywu, aby dopasować tło i uniknąć migania
    const checkTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      const isDarkClass = document.documentElement.classList.contains("dark");
      setIsDark(savedTheme === "dark" || isDarkClass);
    };

    checkTheme();

    // Ukryj preloader po 2 sekundach
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wywołanie onComplete tuż przed końcem zsuwania, by uwidocznić resztę strony
      setTimeout(onComplete, 700);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-300 ${
            isDark ? "bg-[#090A0F]" : "bg-[#FFFFFF]"
          }`}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: "blur(12px)" }}
            animate={{ scale: 1.05, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-40 h-40 md:w-60 md:h-60"
          >
            <Image
              src="/logo.png"
              alt="Timeto Logo"
              fill
              className={`object-contain transition-all duration-300 ${
                isDark ? "dark:invert dark:brightness-200" : ""
              }`}
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
