'use client';

import { useState } from 'react';
import AnimatedIntro from '@/components/AnimatedIntro';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  return (
    <>
      <Navbar isVisible={isAnimationComplete} />
      <AnimatedIntro onAnimationComplete={() => setIsAnimationComplete(true)} />
    </>
  );
}