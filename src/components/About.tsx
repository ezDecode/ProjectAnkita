'use client';

import { motion, MotionValue } from 'framer-motion';
import { TextRevealByWord } from '@/components/TextRevealByWord';

interface AboutProps {
  progress: MotionValue<number>;
}

const About = ({ progress }: AboutProps) => {
  const paragraphText = "Here is some placeholder text describing the individual. This paragraph can be updated later with more specific details about skills, experiences, and professional background. It provides a brief introduction and sets the stage for a more detailed resume or project portfolio.";

  return (
    <div className="sticky top-0 z-20 flex h-screen items-center justify-center">
      <motion.div
        className="w-[72vw] flex flex-col items-start"
      >
        {/*
          IMPLEMENTATION:
          1. Spacing reduced further (from mb-8 to mb-4).
          2. The letter 'u' in "About" is wrapped in a span with the 'italic' class.
        */}
        <h2 
          className="font-editorial font-extralight text-[8rem] text-white mb-4"
        >
          Abo<span className="italic">u</span>t Me.
        </h2>
        
        <TextRevealByWord
          text={paragraphText}
          className="font-ppneue font-regular text-[2.75rem] leading-[3.575rem] text-white/95 text-left tracking-tight"
          scrollProgress={progress}
        />
      </motion.div>
    </div>
  );
};

export default About;