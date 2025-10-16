'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- Sub-component for the mobile menu overlay (Defined correctly once) ---
const MobileMenu = ({ closeMenu }: { closeMenu: () => void }) => {
    const menuVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.1 } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: 'easeIn' } }
    };
    const linkVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    };
    return (
        <motion.div
            className="fixed inset-0 z-40 flex h-screen w-full flex-col items-center justify-center bg-white/80 backdrop-blur-2xl"
            variants={menuVariants} initial="hidden" animate="visible" exit="exit"
        >
            <nav className="flex flex-col items-center gap-10">
                <motion.div variants={linkVariants}><Link href="/about" onClick={closeMenu} className="font-inter text-[2.6rem] text-black">About</Link></motion.div>
                <motion.div variants={linkVariants}><Link href="/projects" onClick={closeMenu} className="font-inter text-[2.6rem] text-black">Projects</Link></motion.div>
                <motion.div variants={linkVariants}>
                    <Link href="mailto:ankitasahoo370@email.com" onClick={closeMenu} className="mt-6 rounded-full bg-black px-8 py-4 font-inter text-lg font-medium text-white">Email Me</Link>
                </motion.div>
            </nav>
        </motion.div>
    );
};

// --- Main Navbar Component ---
const NAV_LINKS = ["About", "Projects", "Email Me"];

const Navbar = ({ isVisible }: { isVisible: boolean }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isMenuOpen]);
    
    const navVariants: Variants = {
        hidden: { y: '-120%', opacity: 0 },
        visible: { y: '0%', opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <>
            <motion.div
                className="fixed top-0 z-50 w-full p-4 flex justify-center"
                initial="hidden" animate={isVisible ? 'visible' : 'hidden'} variants={navVariants}
            >
                <div 
                    className="hidden md:flex items-center gap-4 rounded-full bg-[#1A1A1A]/70 p-2 backdrop-blur-xl shadow-lg shadow-black/5"
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    <Link href="/" className='px-4 py-2 font-inter text-lg font-medium tracking-tight text-white'>
                        Ankita Sahoo
                    </Link>
                    <div className="h-6 w-px bg-white/10"></div>
                    <nav className="flex items-center">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link}
                                href={link === "Email Me" ? "mailto:ankitasahoo370@email.com" : `/${link.toLowerCase()}`}
                                className="relative px-4 py-2 text-lg font-inter transition-colors"
                                onMouseEnter={() => setHoveredLink(link)}
                                style={{ color: hoveredLink === link ? '#FFFFFF' : '#D1D1D1' }}
                            >
                                {hoveredLink === link && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-white/10 -z-10"
                                        layoutId="mercury-highlight"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                {link}
                            </Link>
                        ))}
                    </nav>
                </div>
                
                <div className="flex md:hidden items-center justify-between w-full rounded-full bg-[#1A1A1A]/70 p-2 backdrop-blur-xl shadow-lg shadow-black/5">
                    <Link href="/" className='px-4 py-2 font-inter text-lg font-medium tracking-tight text-white'>
                        Ankita Sahoo
                    </Link>
                    <button onClick={() => setIsMenuOpen(true)} className="px-4 py-2 font-inter text-lg font-medium text-white/80">
                        Menu
                    </button>
                </div>
            </motion.div>
            
            <AnimatePresence>
                {isMenuOpen && <MobileMenu closeMenu={() => setIsMenuOpen(false)} />}
            </AnimatePresence>
        </>
    );
};

export default Navbar;