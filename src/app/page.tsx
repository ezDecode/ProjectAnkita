// src/app/page.tsx
'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const isIntroFinished = true; // Show content immediately

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.05, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Navbar isVisible={isIntroFinished} />
      
      <main className="relative">
        <Hero isAnimated={isIntroFinished} />
        <About />
        <Projects />
        <Footer />
      </main>
    </>
  );
}