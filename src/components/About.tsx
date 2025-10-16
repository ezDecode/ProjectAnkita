'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

// --- Data for the component ---
const SKILLS = ["PyTorch", "TensorFlow", "Kubernetes", "Docker", "MLOps", "AWS", "GCP", "Python"];
const CTA_LINK = "#"; // Replace with your actual LinkedIn profile URL

// --- Animation Variants ---
const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cellVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};


// --- Main About Component ---
const About = React.forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <section ref={ref} className="relative w-full bg-[#e4e4dd] py-24 sm:py-32">
            <motion.div
                // --- The Bento Grid Container ---
                className="mx-auto w-full max-w-7xl px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* Cell 1: Impactful Typographic Statement */}
                <motion.div
                    variants={cellVariants}
                    className="lg:col-span-2 rounded-3xl bg-white/50 p-8 flex flex-col justify-center backdrop-blur-lg border border-white"
                >
                    <h2 className="font-editorial text-4xl sm:text-5xl font-light text-black/90">
                        Bridging the gap between raw data and tangible reality.
                    </h2>
                </motion.div>
                
                {/* Cell 2: Profile Image */}
                <motion.div
                    variants={cellVariants}
                    className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-xl"
                >
                    <Image src="/assets/placeholder.png" alt="A portrait of Ankita Sahoo" fill className="object-cover" sizes="(max-width: 768px) 90vw, 30vw"/>
                </motion.div>
                
                {/* Cell 3: Interactive Call-to-Action (CTA) */}
                <motion.a
                    variants={cellVariants}
                    href={CTA_LINK}
                    target="_blank"
                    className="relative group aspect-square w-full rounded-3xl bg-[#1A1A1A] p-8 flex flex-col justify-between"
                    whileHover="hover"
                >
                    <div>
                        <motion.div
                            className="text-3xl text-white transition-transform"
                            variants={{ hover: { x: 5 } }}
                        >
                            →
                        </motion.div>
                    </div>
                    <div>
                        <p className="font-inter text-white/60">Connect on</p>
                        <p className="font-inter text-2xl font-medium text-white">LinkedIn</p>
                    </div>
                </motion.a>

                {/* Cell 4: Personal Bio */}
                <motion.div
                    variants={cellVariants}
                    className="lg:col-span-2 rounded-3xl bg-white/50 p-8 backdrop-blur-lg border border-white"
                >
                    <h3 className="font-inter text-2xl font-medium text-black/90">Engineer & Innovator</h3>
                    <p className="mt-4 font-inter text-lg text-black/70 leading-relaxed">
                        My fascination isn&apos;t just with algorithms; it&apos;s with the stories hidden within data. I architect intelligent systems that translate raw information into realities that drive decisions and create value.
                    </p>
                </motion.div>

                {/* Cell 5: Skills Toolkit */}
                <motion.div
                    variants={cellVariants}
                    className="lg:col-span-2 rounded-3xl bg-white/50 p-8 backdrop-blur-lg border border-white"
                >
                    <h3 className="font-inter text-2xl font-medium text-black/90">My Toolkit</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {SKILLS.map(skill => (
                            <div key={skill} className="px-3 py-1 text-sm bg-black/5 text-black/70 rounded-full font-medium">
                                {skill}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
});

About.displayName = 'About';

export default About;