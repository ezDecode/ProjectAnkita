"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { FC, ReactNode, useRef } from "react";

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

interface TextRevealByWordProps {
  text: string;
  className?: string;
  scrollProgress: MotionValue<number>; 
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({ text, className, scrollProgress }) => {
  const words = text.split(" ");

  return (
    <p className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length) * 1.25; 
        return (
          <Word key={i} progress={scrollProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  // IMPLEMENTATION: The starting opacity is now 0 for a true fade-in effect.
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mr-1.5 mt-1.5">
      <motion.span style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  );
};