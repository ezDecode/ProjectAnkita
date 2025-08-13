"use client";

import { motion, useInView, Variants } from "framer-motion";
import { FC, useRef, useEffect, useState } from "react";

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

interface TextRevealByTimeProps {
  text: string;
  className?: string;
  startDelay?: number;
  wordDelay?: number;
  trigger?: boolean;
}

export const TextRevealByTime: FC<TextRevealByTimeProps> = ({ 
  text, 
  className, 
  startDelay = 0,
  wordDelay = 0.12,
  trigger = true
}) => {
  const words = text.split(" ");
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : wordDelay,
        delayChildren: prefersReducedMotion ? 0 : startDelay,
        ease: "easeOut",
      }
    }
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      // PLAN EXECUTED (DIRECTION): Changed 'x' to a negative value for a left-to-right flow.
      x: -20, 
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0, 
      filter: "blur(0px)",
      transition: {
        // PLAN EXECUTED (SMOOTHNESS): Doubled duration for a "100% smoother" feel.
        duration: prefersReducedMotion ? 0 : 0.7, 
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  return (
    <motion.p
      ref={containerRef}
      className={cn("flex flex-wrap justify-center", className)}
      variants={containerVariants}
      initial="hidden"
      animate={trigger ? "visible" : "hidden"}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="relative mr-1.5 mt-0.5"
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};