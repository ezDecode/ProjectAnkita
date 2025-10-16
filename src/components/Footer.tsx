// src/components/Footer.tsx
'use client';

import { useRef, FC, ReactNode, CSSProperties } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Link from 'next/link';

const MinimalLink: FC<{ href: string; children: ReactNode }> = ({ href, children }) => (
  <Link href={href} target="_blank" className="text-white/60 transition-colors duration-300 hover:text-white">
    {children}
  </Link>
);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.3 });

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.footer
      ref={footerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#e4e4dd] p-4 sm:p-8"
      style={
        {
          '--mouse-x': '50%',
          '--mouse-y': '50%',
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(0, 0, 0, 0.06), transparent 80%)`,
        } as CSSProperties
      }
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* PLAN EXECUTED: Increased max-width from 5xl to 7xl to achieve the size increase. */}
      <motion.div 
        className="relative w-full max-w-7xl rounded-3xl sm:rounded-[32px] bg-black shadow-2xl shadow-black/20 border border-white/10"
        variants={{
          hidden: { opacity: 0, y: 50, scale: 0.95 },
          visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
        }}
      >
        {/* PLAN EXECUTED: Increased padding for a more spacious and grand feel. */}
        <motion.div 
          className="flex flex-col gap-12 p-12 sm:p-20"
          variants={containerVariants}
        >
          <div className="text-center">
            <motion.h2
              variants={itemVariants}
              className="text-center font-editorial text-5xl font-light leading-tight text-white md:text-7xl"
            >
              Let's Build Together
            </motion.h2>
            
            {/* PLAN EXECUTED: Added new, descriptive text to enrich the content. */}
            <motion.p 
              variants={itemVariants} 
              className="mx-auto mt-6 max-w-3xl text-lg text-white/70"
            >
              I specialize in architecting intelligent systems that are not only technically robust but are strategically aligned with business objectives. If you have a challenge that data can solve, let's discuss how we can create tangible value.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10">
              <motion.a
                href="mailto:ankitasahoo370@gmail.com"
                className="group inline-flex items-center gap-4 rounded-full bg-white px-8 py-5 text-lg font-inter font-medium text-black"
                whileHover="hover"
                initial="rest"
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <span>Start a Conversation</span>
                <motion.div variants={{ rest: { x: 0 }, hover: { x: 5 } }}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </motion.a>
            </motion.div>
          </div>

          <motion.div 
            className="border-t border-white/20 pt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="flex flex-col items-center justify-between gap-6 font-inter text-sm md:flex-row">
              <p className="text-white/60">&copy; {new Date().getFullYear()} Ankita Sahoo</p>
              <div className="flex items-center gap-6">
                <MinimalLink href="#">LinkedIn</MinimalLink>
                <MinimalLink href="#">GitHub</MinimalLink>
                <MinimalLink href="#">Twitter</MinimalLink>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;