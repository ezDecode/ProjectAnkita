'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import LatestProjects from '@/components/LatestProjects';
import Connect from '@/components/Connect';
import Hero from '@/components/Hero';
import About from '@/components/About';

// Register GSAP plugin for Lenis integration.
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  // Lenis setup for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.05, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    // Cleanup function
    return () => lenis.destroy();
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    // A slight delay to ensure the loading screen animation is fully finished.
    setTimeout(() => setIsIntroFinished(true), 100);
  }, []);

  return (
    <>
      {isLoading && <Loading onComplete={handleLoadingComplete} />}
      <Navbar isVisible={isIntroFinished} />
      
      <main className="relative bg-[#e4e4dd]">
        {/* PLAN EXECUTED: Pass the isIntroFinished state down as a prop to Hero. */}
        <Hero isAnimated={isIntroFinished} />
        <About />
        <LatestProjects />
        <Connect />
      </main>
    </>
  );
}