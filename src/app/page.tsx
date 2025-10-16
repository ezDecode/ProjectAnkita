// src/app/page.tsx
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import LatestProjects from '@/components/LatestProjects';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.05, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => lenis.destroy();
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => setIsIntroFinished(true), 100);
  }, []);

  return (
    <>
      {isLoading && <Loading onComplete={handleLoadingComplete} />}
      <Navbar isVisible={isIntroFinished} />
      
      <main className="relative">
        <Hero isAnimated={isIntroFinished} />
        <About />
        <LatestProjects />
        <Footer />
      </main>
    </>
  );
}