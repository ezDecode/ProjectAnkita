'use client';

import { useState, useEffect } from 'react';

interface AnimatedIntroProps {
  onAnimationComplete: () => void;
}

const AnimatedIntro = ({ onAnimationComplete }: AnimatedIntroProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 100);

    const completeTimer = setTimeout(() => {
      onAnimationComplete();
    }, 2100);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden z-[-1] bg-black">
      <div className="absolute inset-0 w-full h-full bg-black" />

      <div className="z-10">
        <span
          className="font-t1korium font-light text-white whitespace-nowrap transition-opacity duration-[2000ms] ease-[cubic-bezier(0.86,0,0.07,1)]"
          style={{
            // The font size is now fixed, removing the zoom effect.
            fontSize: '26rem',
            letterSpacing: '-2px',
            // Animate only the opacity for a clean fade-in.
          }}
        >
          KAMEI SANSH
        </span>
      </div>
    </div>
  );
};

export default AnimatedIntro;