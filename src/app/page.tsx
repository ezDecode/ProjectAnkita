'use client';

import { useState, useCallback } from 'react';
import Loading from '@/components/Loading';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import MainImage from '@/components/MainImage';
import About from '@/components/About';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isIntroFinished, setIsIntroFinished] = useState(false);

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
          This container's only job is to provide scroll distance for the image animation.
          We've reduced its height as the pin is shorter now.
        */}
        <div id="image-pin-sequence" className="relative h-[200vh] w-full">
          <MainImage />
        </div>

        {/* 
          THE KEY CHANGE: About section is now outside and placed immediately after.
          It will appear as normal content once the pinning sequence is over.
        */}
        <About />

        {/* Extra space at the bottom */}
        <div className="h-[100vh] bg-white" />
      </main>
    </>
  );
}