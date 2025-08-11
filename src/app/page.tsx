'use client';

import { useState, useCallback } from 'react';
import Loading from '@/components/Loading';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => {
      setIsIntroFinished(true);
    }, 100);
  }, []);

  return (
    <>
      {isLoading && <Loading onComplete={handleLoadingComplete} />}

      {/* Pass the isVisible prop to the Hero component */}
      <Hero isVisible={isIntroFinished} />

      <Navbar isVisible={isIntroFinished} />
    </>
  );
}