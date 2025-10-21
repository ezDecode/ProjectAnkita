'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- Constants for maintainability ---
// PLAN EXECUTED: Centralized email link as a constant to prevent inconsistencies.
const EMAIL_LINK = "mailto:ankitasahoo370@email.com";
const NAV_LINKS = [
    { title: "About", href: "/about" },
    { title: "Projects", href: "/projects" },
    { title: "Email Me", href: EMAIL_LINK },
];

// --- Sub-component for the mobile menu dropdown ---
const MobileMenuDropdown = ({ closeMenu }: { closeMenu: () => void }) => {
    // ESC key handler to close menu
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeMenu();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [closeMenu]);

    const backdropVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.25 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };

    const dropdownVariants: Variants = {
        hidden: { 
            opacity: 0, 
            y: -10,
            scale: 0.98
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: { 
                duration: 0.35, 
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.06,
                delayChildren: 0.08
            } 
        },
        exit: { 
            opacity: 0, 
            y: -10,
            scale: 0.98,
            transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    const linkVariants: Variants = {
        hidden: { opacity: 0, x: -10 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { 
                duration: 0.4, 
                ease: [0.16, 1, 0.3, 1] 
            } 
        },
    };

    return (
        <>
            {/* Backdrop - Click to close */}
            <motion.div
                className="fixed inset-0 z-[45] bg-black/20 backdrop-blur-sm"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={closeMenu}
            />

            {/* Dropdown Menu - Positioned right below navbar, aligned to the right */}
            <motion.div
                className="fixed top-[88px] right-4 z-[50] w-[calc(100%-2rem)] max-w-sm md:right-auto md:left-1/2 md:-translate-x-1/2"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="rounded-2xl bg-[#1A1A1A]/95 backdrop-blur-xl shadow-2xl border border-white/10 overflow-hidden">
                    {/* Menu Links */}
                    <nav className="flex flex-col p-3 gap-1">
                        <motion.div variants={linkVariants}>
                            <Link 
                                href="/about" 
                                onClick={closeMenu} 
                                className="flex items-center justify-between px-4 py-3 font-inter text-lg text-white rounded-lg hover:bg-white/10 transition-all duration-200 group"
                            >
                                <span>About</span>
                                <span className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
                            </Link>
                        </motion.div>
                        
                        <motion.div variants={linkVariants}>
                            <Link 
                                href="/projects" 
                                onClick={closeMenu} 
                                className="flex items-center justify-between px-4 py-3 font-inter text-lg text-white rounded-lg hover:bg-white/10 transition-all duration-200 group"
                            >
                                <span>Projects</span>
                                <span className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
                            </Link>
                        </motion.div>
                        
                        <motion.div variants={linkVariants} className="pt-2">
                            <Link 
                                href={EMAIL_LINK} 
                                onClick={closeMenu} 
                                className="flex items-center justify-center gap-2 w-full rounded-lg bg-white px-4 py-3 font-inter text-base font-medium text-black hover:bg-white/90 transition-all duration-200 group"
                            >
                                <span>Email Me</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </motion.div>
                    </nav>
                </div>
            </motion.div>
        </>
    );
};

// --- Main Navbar Component ---
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
                {/* Desktop Navbar */}
                <div 
                    className="hidden md:flex items-center gap-3 rounded-full bg-[#1A1A1A]/80 px-3 py-2 backdrop-blur-xl shadow-xl border border-white/10"
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    <Link href="/" className='px-4 py-2 font-inter text-lg font-semibold tracking-tight text-white hover:text-white/80 transition-colors'>
                        Ankita Sahoo
                    </Link>
                    <div className="h-6 w-px bg-white/20"></div>
                    <nav className="flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                className="relative px-4 py-2 text-base font-inter font-medium rounded-full transition-colors"
                                onMouseEnter={() => setHoveredLink(link.title)}
                                style={{ color: hoveredLink === link.title ? '#FFFFFF' : '#A1A1A1' }}
                            >
                                {hoveredLink === link.title && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-white/15 -z-10"
                                        layoutId="mercury-highlight"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                {link.title}
                            </Link>
                        ))}
                    </nav>
                </div>
                
                {/* Mobile Navbar */}
                <div className="flex md:hidden items-center justify-between w-full rounded-full bg-[#1A1A1A]/80 px-3 py-2 backdrop-blur-xl shadow-xl border border-white/10">
                    <Link href="/" className='px-4 py-2 font-inter text-lg font-semibold tracking-tight text-white'>
                        Ankita Sahoo
                    </Link>
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="px-4 py-2 font-inter text-base font-medium text-white/90 hover:text-white transition-colors rounded-full hover:bg-white/10"
                    >
                        {isMenuOpen ? 'Close' : 'Menu'}
                    </button>
                </div>
            </motion.div>
            
            <AnimatePresence>
                {isMenuOpen && <MobileMenuDropdown closeMenu={() => setIsMenuOpen(false)} />}
            </AnimatePresence>
        </>
    );
};

export default Navbar;