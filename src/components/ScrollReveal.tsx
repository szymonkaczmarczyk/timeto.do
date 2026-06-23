"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type RevealVariant = "blur" | "mask" | "fade" | "scale";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  yOffset?: number;
}

export default function ScrollReveal({
  children,
  variant = "blur",
  delay = 0,
  duration = 0.45,
  className = "",
  yOffset = 15,
}: ScrollRevealProps) {
  const getVariants = (): Variants => {
    switch (variant) {
      case "blur":
        return {
          hidden: { y: yOffset, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration, ease: [0.16, 1, 0.3, 1] as any, delay },
          },
        };
      case "mask":
        return {
          hidden: { y: "100%" },
          visible: {
            y: 0,
            transition: { duration, ease: [0.16, 1, 0.3, 1] as any, delay },
          },
        };
      case "scale":
        return {
          hidden: { scale: 0.95, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: { duration, ease: [0.16, 1, 0.3, 1] as any, delay },
          },
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0, y: yOffset },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration, ease: "easeOut", delay },
          },
        };
    }
  };

  if (variant === "mask") {
    return (
      <div className={`overflow-hidden ${className}`}>
        <motion.div
          variants={getVariants()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15px" }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
