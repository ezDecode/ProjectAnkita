'use client';

import { useState, useCallback, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loading from '@/components/Loading';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import LatestProjects from '@/components/LatestProjects';
import Connect from '@/components/Connect';

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
    setIsIntroFinished(true);
  }, []);

  return (
    <>
      {isLoading && <Loading onComplete={handleLoadingComplete} />}
      <Navbar isVisible={isIntroFinished} />
      
      <main>
        <Hero isVisible={isIntroFinished} />
        <About />
        <LatestProjects />
        <Connect />
      </main>
    </>
  );
}