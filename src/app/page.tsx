'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loading from '@/components/Loading';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import MainImage from '@/components/MainImage';
import About from '@/components/About';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  
  // ARCHITECTURAL CHANGE: Create a ref for the master container
  const sequenceRef = useRef<HTMLDivElement>(null);

  // ARCHITECTURAL CHANGE: Control all animations from here
  const { scrollYProgress } = useScroll({
    target: sequenceRef,
    offset: ['start start', 'end end'],
  });

  // This value will track the progress of the text reveal animation specifically
  // It starts when the main scroll is at 40% and ends at 90%
  const textRevealProgress = useTransform(scrollYProgress, [0.4, 0.9], [0, 1]);

  useEffect(() => {
    // Lenis and GSAP setup remains the same
    const lenis = new Lenis({ lerp: 0.07, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => lenis.destroy();
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setIsIntroFinished(true);
  }, []);

  return (
    <>
      {isLoading && <Loading onComplete={handleLoadingComplete} />}
      <Navbar isVisible={isIntroFinished} />
      
      <main>
        <Hero isVisible={isIntroFinished} />

        {/* 
          THE KEY CHANGE: This is now the master container for the entire sequence.
          Height is increased to 500vh to provide a long scroll timeline.
        */}
        <div ref={sequenceRef} id="image-pin-sequence" className="relative h-[500vh] w-full">
          {/* MainImage and About are now siblings inside the pinning container */}
          <MainImage />
          <About progress={textRevealProgress} />
        </div>

        <div className="h-[100vh] bg-white" />
      </main>
    </>
  );
}