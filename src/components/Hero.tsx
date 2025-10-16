'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, Variants } from 'framer-motion';

// --- Sub-component for the animated Kinetic Digit ---
// This creates the "slot machine" effect for a single number
const KineticDigit = ({ finalDigit, isAnimated }: { finalDigit: number; isAnimated: boolean }) => {
    const [isCounting, setIsCounting] = useState(true);
    // A spring animation that goes from 0 to 100
    const spring = useSpring(0, { mass: 0.1, stiffness: 100, damping: 10 });
    
    // Map the spring's output to cycle through numbers 0-9
    const displayDigit = useTransform(spring, (current) => 
        Math.round(current) % 10
    );

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isAnimated) {
            // Start the spring animation
            spring.set(100);
            // After a delay, stop the cycling and settle on the final digit
            timeout = setTimeout(() => {
                spring.set(finalDigit);
                setIsCounting(false);
            }, 1500);
        } else {
            spring.set(finalDigit);
        }
        return () => clearTimeout(timeout);
    }, [isAnimated, spring, finalDigit]);

    return <motion.span>{isCounting ? displayDigit : finalDigit}</motion.span>;
};


// --- Main Animation Variants ---
const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delay: 1.8 } },
};

const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

// --- Main Hero Component ---
const Hero = ({ isAnimated }: { isAnimated: boolean }) => {
    const year = new Date().getFullYear().toString().split('').map(Number); // [2, 0, 2, 4]

    return (
        <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#101010]">
            <div className="relative z-10 text-center">
                
                {/* The Kinetic Counter */}
                <div className="flex justify-center font-mono text-[28vw] font-bold leading-none tracking-tighter text-white md:text-[20vw]">
                    {year.map((digit, index) => (
                        <KineticDigit key={index} finalDigit={digit} isAnimated={isAnimated} />
                    ))}
                </div>
                
                {/* The Main Text Content */}
                <motion.div
                    className="mt-8"
                    variants={textContainerVariants}
                    initial="hidden"
                    animate={isAnimated ? 'visible' : 'hidden'}
                >
                    <motion.h1
                        variants={textVariants}
                        className="font-editorial text-5xl font-medium text-white sm:text-7xl"
                    >
                        Ankita Sahoo
                    </motion.h1>
                    <motion.p
                        variants={textVariants}
                        className="mt-2 font-inter text-lg text-white/50"
                    >
                        Machine Learning Engineer
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;