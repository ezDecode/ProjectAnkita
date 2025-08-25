'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import TextRevealByTime from '@/components/TextRevealByTime';

interface HeroProps {
  isAnimated: boolean;
}

// Variants for a clean, staggered entrance animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const Hero = ({ isAnimated }: HeroProps) => {
  return (
    <section className="relative z-0 h-screen w-full bg-black">
      {/* Container for layout and animation */}
      <motion.div
        className="flex h-full w-full flex-col items-center justify-center text-center"
        initial="hidden"
        // PLAN EXECUTED: Animation trigger is now simpler and more robust.
        animate={isAnimated ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Headline */}
        <motion.h1
          className="font-editorial text-[7vw] font-light leading-none tracking-tight text-white"
          variants={itemVariants}
        >
          <div>Where Data</div>
          <div className="mt-[-1.5vw]">Finds Its <span className="font-ppneue font-medium italic">Voice.</span></div>
        </motion.h1>

        {/* Subtext */}
        <motion.div className="mt-12 max-w-2xl px-10" variants={itemVariants}>
          <TextRevealByTime
            text="A Machine Learning Engineer building intelligent systems that speak in insights, not just numbers."
            className="font-ppneue text-xl leading-relaxed text-white/70"
            // The trigger is passed down from the parent container's state.
            trigger={isAnimated}
            startDelay={0} // Delay is handled by parent stagger.
            wordDelay={0.02}
          />
        </motion.div>
      </motion.div>

      {/* Atmospheric Background Gradient */}
      <div
        className="absolute inset-0 z-0 h-full w-full"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(220, 38, 38, 0.25), transparent 70%), #000000`,
        }}
        aria-hidden="true"
      />
    </section>
  );
};

export default Hero;