"use client";

import { useRef, useState, ReactNode, MouseEvent } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  range?: number;
}

export default function Magnetic({ children, range = 50 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Odległość kursora od środka przycisku
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < range) {
      // Przyciąganie (fizyka sprężystości)
      setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.2 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
