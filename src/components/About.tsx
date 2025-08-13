'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';
import { TextRevealByTime } from '@/components/TextRevealByTime';

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const leftColumnVariants: Variants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const textVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const dividerVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: {
            duration: 1,
            ease: [0.6, 0.01, -0.05, 0.95],
            delay: 0.3,
        }
    }
}

const rightColumnVariants: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageVariants: Variants = {
    hidden: { scale: 1.2, opacity: 0.5 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  const paragraphText = "As a Machine Learning Engineer, I architect intelligent systems that turn complex data into tangible solutions. My focus is on creating robust, scalable, and production-ready models. Beyond the code, I am driven by a passion for understanding the 'why'—crafting technology that is not just functional, but truly insightful and impactful.";

  return (
    // PLAN EXECUTED: Restored to a simple section. z-index ensures it sits behind the upcoming project section.
    <motion.section
      ref={sectionRef}
      id="about"
      className="relative z-10 flex h-screen w-full items-center justify-center bg-[#e4e4dd]"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="w-[85vw] max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          className="flex flex-col text-left"
          variants={leftColumnVariants}
        >
          <motion.h2 
            className="font-editorial text-5xl md:text-6xl font-light text-black/90 mb-4"
            variants={textVariants}
          >
            Engineer & <span className="italic">Innovator.</span>
          </motion.h2>

          <motion.div 
            className="w-full h-px bg-black/20 origin-left mb-6"
            variants={dividerVariants}
          />
          
          <TextRevealByTime
            text={paragraphText}
            className="font-ppneue font-medium text-lg md:text-xl text-black/70 leading-relaxed !justify-start text-left"
            trigger={isInView}
            startDelay={0.5} 
            wordDelay={0.02}
          />
        </motion.div>

        <motion.div 
          className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl"
          variants={rightColumnVariants}
        >
          <motion.div
            variants={imageVariants}
            className="w-full h-full"
          >
            <Image
                src="/assets/placeholder.png"
                alt="A portrait of Ankita Sahoo" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 85vw, 40vw"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;