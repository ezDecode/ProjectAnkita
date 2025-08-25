'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';
import TextRevealByTime from '@/components/TextRevealByTime';

// Animation variants remain the same.
const sectionVariants: Variants = { initial: { opacity: 1 }, animate: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const leftColumnVariants: Variants = { initial: { x: -50, opacity: 0 }, animate: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const textVariants: Variants = { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };
const dividerVariants: Variants = { initial: { scaleX: 0 }, animate: { scaleX: 1, transition: { duration: 1, ease: [0.6, 0.01, -0.05, 0.95], delay: 0.3 } } };
const rightColumnVariants: Variants = { initial: { x: 50, opacity: 0 }, animate: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const imageVariants: Variants = { initial: { scale: 1.2, opacity: 0.5 }, animate: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } } };

const About = React.forwardRef<HTMLDivElement>((props, ref) => {
  const paragraphText = "My fascination isn't just with algorithms; it's with the stories hidden within the data. I see patterns as narratives waiting to be told. My role is to be their interpreter—to architect the systems that translate raw information not just into predictions, but into tangible, insightful realities that drive decisions and create value.";
  
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const isParagraphInView = useInView(paragraphRef, { amount: 0.3 });

  return (
    <section ref={ref} className="relative flex h-screen w-full items-center justify-center bg-[#e4e4dd]">
      <motion.div
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ amount: 0.3 }}
        className="w-[85vw] max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
      >
        <motion.div className="flex flex-col text-left" variants={leftColumnVariants}>
          <motion.h2 className="font-editorial text-5xl md:text-6xl font-light text-black/90 mb-4" variants={textVariants}>
            Engineer & Innovator.
          </motion.h2>
          <motion.div className="w-full h-px bg-black/20 origin-left mb-6" variants={dividerVariants} />
          
          <TextRevealByTime 
            ref={paragraphRef}
            text={paragraphText} 
            className="font-ppneue font-medium text-lg md:text-xl text-black/70 leading-relaxed !justify-start text-left" 
            trigger={isParagraphInView}
            startDelay={0}
            wordDelay={0.02} 
          />
        </motion.div>
        {/* The parent of the Image wrapper is already relative, which is good. */}
        <motion.div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl" variants={rightColumnVariants}>
          {/* PLAN EXECUTED: Added 'relative' to the direct parent of the Image component to fix the error. */}
          <motion.div variants={imageVariants} className="relative w-full h-full">
            <Image src="/assets/placeholder.png" alt="A portrait of Ankita Sahoo" fill className="object-cover" sizes="(max-width: 768px) 85vw, 40vw" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
});

About.displayName = 'About';
export default About;