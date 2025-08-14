'use client';

import { useRef, FC, ReactNode } from 'react';
import { motion, useScroll, useTransform, useInView, Variants, MotionValue } from 'framer-motion';

// --- Variants remain the same ---
const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } } };
const itemVariants: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } };

// --- Reusable SVG Icon ---
const ArrowIcon: FC = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// PLAN EXECUTED: A completely redesigned SocialLink component to match the reference image.
interface SocialLinkProps {
  href: string;
  children: ReactNode;
  color: MotionValue<string>;
}

const SocialLink: FC<SocialLinkProps> = ({ href, children, color }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      // The `group` utility is no longer needed as the hover is self-contained.
      className="flex items-center gap-4"
      style={{ color }}
      whileHover="hover"
      initial="initial"
      variants={itemVariants} // Use the same fade-in variant as other items
    >
      <span className="font-ppneue text-4xl font-medium tracking-tight">
        {children}
      </span>
      <motion.div
        variants={{
          initial: { rotate: 0 },
          hover: { rotate: -45 }, // A sophisticated -45 degree "launch" rotation
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <ArrowIcon />
      </motion.div>
    </motion.a>
  );
};


const Connect = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const background = useTransform(scrollYProgress, [0, 0.4], ["#000000", "#e4e4dd"]);
  const color = useTransform(scrollYProgress, [0, 0.4], ["#FFFFFF", "#000000"]);

  return (
    <motion.section ref={sectionRef} style={{ backgroundColor: background }} className="relative h-screen w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid h-full w-full grid-cols-1 items-center gap-12 px-10 py-24 md:grid-cols-2"
      >
        {/* Left Column: Call to Action */}
        <div className="flex flex-col items-start gap-12">
          <motion.p variants={itemVariants} style={{ color }} className="font-ppneue text-xl font-medium">
            Let's talk.
          </motion.p>
          <motion.h2 variants={itemVariants} style={{ color }} className="font-editorial text-8xl font-light md:text-9xl leading-none">
            Have a complex challenge?
          </motion.h2>
          <motion.div variants={itemVariants}>
            <motion.a
              href="mailto:example@email.com"
              className="relative z-10 block rounded-full bg-black px-12 py-7 text-xl font-medium text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              Email Me
            </motion.a>
          </motion.div>
        </div>

        {/* PLAN EXECUTED: Right Column using the new, cleaner SocialLink component */}
        <div className="flex h-full flex-col items-start justify-end gap-8 font-ppneue md:items-end">
          <SocialLink href="#" color={color}>LinkedIn</SocialLink>
          <SocialLink href="#" color={color}>GitHub</SocialLink>
          <SocialLink href="#" color={color}>Twitter</SocialLink>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Connect;