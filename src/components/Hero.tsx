'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

// --- Animation Variants (unchanged) ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
};

const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
};


// --- The Main Hero Component ---
const Hero = ({ isAnimated }: { isAnimated: boolean }) => {
    return (
        <section className="relative w-full bg-[#e4e4dd] min-h-screen flex flex-col items-center justify-center">
            <motion.div
                className="relative w-full max-w-7xl text-center px-8 py-16"
                variants={containerVariants}
                initial="hidden"
                animate={isAnimated ? 'visible' : 'hidden'}
            >
                {/* --- Introductory Text --- */}
                <motion.p variants={fadeUpVariants} className="font-inter text-2xl text-black/70 mb-4">
                    Hi! I'm Ankita Sahoo
                </motion.p>

                {/* --- The Main Typographic Block --- */}
                <div className="relative mx-auto w-full">
                    
                    <motion.h2
                        variants={fadeUpVariants}
                        className="font-inter text-[7.2vw] md:text-[5.76vw] font-medium leading-none tracking-tighter text-black/90 whitespace-nowrap"
                    >
                        Machine Learning Engineer
                    </motion.h2>

                    <motion.h2
                        variants={fadeUpVariants}
                        className="mt-[1vw] font-inter text-[5.76vw] md:text-[4.32vw] font-medium leading-none tracking-tighter text-black/90 flex items-center justify-center gap-[1.5vw]"
                    >
                        <div className="relative inline-block h-[1.5em] aspect-square p-1 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 shadow-md">
                           <div className="relative w-full h-full rounded-lg overflow-hidden">
                                <Image 
                                    src="/assets/placeholder.png" 
                                    alt="Ankita's Location" 
                                    fill 
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <span className="font-editorial font-light italic">based in</span> 
                        <span className="bg-black text-white px-3 py-1 rounded-lg">Bangalore.</span>
                    {/* PLAN EXECUTED: Removed the extra space in the closing tag to fix the critical syntax error. */}
                    </motion.h2>

                </div>
                
                {/* --- The Descriptive Paragraph --- */}
                <motion.p
                    variants={fadeUpVariants}
                    className="max-w-4xl mx-auto mt-12 font-inter text-xl text-black/80 leading-relaxed"
                >
                    <strong className="font-medium text-black">5 years</strong> delivering solutions across various industries. I pair strong <strong className="font-medium text-black">machine learning</strong> skills with expertise in <strong className="font-medium text-black">strategy and architecture</strong> aligned with <strong className="font-medium text-black">business</strong> objectives. My experience spans diverse sectors: retail, tech startups, healthcare, sports, B2B companies, institutions...
                </motion.p>
            </motion.div>
        </section>
    );
};

export default Hero;