'use client';

import React, { useRef } from 'react';
import { motion, Variants, useInView } from 'framer-motion';
import TextRevealByTime from '@/components/TextRevealByTime';

interface HeroProps {
  isAnimated: boolean;
}

// Animation variants remain the same.
const heroVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const headlineVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// PLAN EXECUTED: Removed forwardRef, as it's no longer needed.
// The component now manages its own view-tracking.
const Hero = ({ isAnimated }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  // PLAN EXECUTED: Added useInView to track if the component is on screen.
  const isInView = useInView(sectionRef, { amount: 0.3 });

  // PLAN EXECUTED: The animation triggers only when the intro is finished AND it's in view.
  const canAnimate = isAnimated && isInView;

  return (
    <section ref={sectionRef} className="relative z-0 h-screen w-full">
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        <motion.div
          className="w-[85vw] mx-auto text-center"
          initial="hidden"
          animate={canAnimate ? 'visible' : 'hidden'}
          variants={heroVariants}
        >
          <motion.h1
            className="font-ppneue font-medium text-[9vw] font-light text-white leading-none tracking-tight"
            variants={headlineVariants}
          >
            <div>Spark of <span className="font-editorial font-light">Intelligence</span></div>
          </motion.h1>

          <motion.div variants={headlineVariants}>
            <TextRevealByTime
              text="A Machine Learning Engineer turning complex datasets into insightful, production-ready solutions."
              className="w-[60vw] font-ppneue font-medium text-[2rem] leading-snug text-white/80 mt-12 mx-auto"
              trigger={canAnimate} // The trigger is now the combined state.
              startDelay={0}
            />
          </motion.div>
        </motion.div>
      </div>

      <div
        className="absolute inset-0 z-0 h-full w-full"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(220, 38, 38, 0.15), transparent 70%), #000000",
        }}
      />
    </section>
  );
};

export default Hero;