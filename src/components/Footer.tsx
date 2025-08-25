'use client';

import { useRef, useEffect, FC, ReactNode } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Link from 'next/link';

// --- Reusable Link for the bottom bar ---
const MinimalLink: FC<{ href: string; children: ReactNode }> = ({ href, children }) => (
  <Link href={href} target="_blank" className="transition-colors duration-300 hover:text-black">
    {children}
  </Link>
);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.4 });

  // This effect handles the "Aurora" background that follows the mouse
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = footer.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      footer.style.setProperty('--mouse-x', `${x}px`);
      footer.style.setProperty('--mouse-y', `${y}px`);
    };

    footer.addEventListener('mousemove', handleMouseMove);
    return () => footer.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.footer
      ref={footerRef}
      // PLAN EXECUTED: Changed to h-screen (100vh), added flex layout, and inverted colors.
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#e4e4dd] text-black"
      style={
        {
          '--mouse-x': '50%',
          '--mouse-y': '50%',
          // PLAN EXECUTED: Inverted the aurora effect for the light theme.
          background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(0, 0, 0, 0.04), transparent 80%)`,
          transition: 'background 0.4s ease-out',
        } as any
      }
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center gap-12 px-10">
        {/* Main CTA */}
        <motion.h2
          variants={itemVariants}
          className="text-center font-editorial text-5xl font-light leading-tight md:text-7xl"
        >
          Have a project in mind?
        </motion.h2>
        <motion.div variants={itemVariants}>
          {/* PLAN EXECUTED: Inverted button colors */}
          <motion.a
            href="mailto:ankitasahoo370@gmail.com"
            className="group flex items-center gap-4 rounded-full bg-black px-8 py-5 text-lg font-medium text-white"
            whileHover="hover"
            initial="rest"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <span>Start a Conversation</span>
            <motion.div variants={{ rest: { x: 0 }, hover: { x: 5 } }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 5L19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.a>
        </motion.div>
      </div>

      {/* PLAN EXECUTED: Bottom Bar now absolutely positioned for the h-screen layout */}
      <div className="absolute bottom-0 left-0 right-0 z-10 w-full">
        <div className="mx-auto max-w-7xl border-t border-black/20 px-10 py-8">
          <motion.div
            className="flex flex-col items-center justify-between gap-4 font-ppneue text-sm text-black/60 md:flex-row"
            // Use a simpler variant for the bottom bar so it fades in last
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p>&copy; {new Date().getFullYear()} Ankita Sahoo</p>
            <div className="flex items-center gap-6">
              <MinimalLink href="#">LinkedIn</MinimalLink>
              <MinimalLink href="#">GitHub</MinimalLink>
              <MinimalLink href="#">Twitter</MinimalLink>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;