'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
// PLAN EXECUTED: Removed imports for deleted components.

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5, // Delay children to allow background to animate
    },
  },
};

const leftColumnVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const rightColumnVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

// PLAN EXECUTED: Defined variants for list items directly in this component.
const linkItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Connect = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const backgroundColor = useTransform(scrollYProgress, [0, 0.2], ["#000000", "#e4e4dd"]);

  return (
    <section ref={sectionRef} className="relative h-[150vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ scale, backgroundColor }}
          className="absolute inset-0 h-full w-full origin-center rounded-full"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 grid h-full w-full grid-cols-1 items-end gap-12 px-10 py-20 md:grid-cols-2"
        >
          {/* Left Column */}
          <motion.div
            variants={leftColumnVariants}
            className="flex flex-col items-start gap-8"
          >
            <p className="font-ppneue text-lg font-medium">Have a project in mind?</p>
            <h2 className="font-editorial text-6xl font-light text-black/90 md:text-7xl">
              Let's create something remarkable.
            </h2>
            {/* PLAN EXECUTED: Replaced MagneticButton with a standard, styled <a> tag. */}
            <a
              href="mailto:example@email.com"
              className="relative z-10 block rounded-full bg-black px-10 py-6 text-lg font-medium text-white transition-colors hover:bg-black/90"
            >
              Email Me
            </a>
          </motion.div>

          {/* Right Column */}
          <motion.ul 
            variants={rightColumnVariants}
            className="flex flex-col items-start gap-4 font-ppneue md:items-end"
          >
            {/* PLAN EXECUTED: Replaced HoverLink with motion.li and a styled <a> tag. */}
            <motion.li variants={linkItemVariants}>
              <a href="#" target="_blank" className="relative inline-block text-2xl font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-400 after:ease-[cubic-bezier(0.6,0.01,-0.05,0.95)] hover:after:scale-x-100">
                LinkedIn
              </a>
            </motion.li>
            <motion.li variants={linkItemVariants}>
              <a href="#" target="_blank" className="relative inline-block text-2xl font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-400 after:ease-[cubic-bezier(0.6,0.01,-0.05,0.95)] hover:after:scale-x-100">
                GitHub
              </a>
            </motion.li>
            <motion.li variants={linkItemVariants}>
              <a href="#" target="_blank" className="relative inline-block text-2xl font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-400 after:ease-[cubic-bezier(0.6,0.01,-0.05,0.95)] hover:after:scale-x-100">
                Twitter
              </a>
            </motion.li>
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Connect;