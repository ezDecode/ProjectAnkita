'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Loading = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    // Timer to start the animation
    const animationTimer = setTimeout(() => {
      setIsAnimating(true);
    }, 1000); // 1-second delay

    // Timer to mark the animation as complete and adjust z-index
    // 1000ms (initial delay) + 2000ms (animation duration) = 3000ms
    const doneTimer = setTimeout(() => {
      setAnimationDone(true);
    }, 3000);

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(animationTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div
      className={`
        fixed inset-0 flex items-center justify-center overflow-hidden
        bg-[linear-gradient(to_bottom,#1a0033,#3c006b,#6b00b3)]
        transition-all
        ${isAnimationDone ? 'z-[-1]' : 'z-[9999]'}
      `}
    >
      {/* Text container - centers the text blocks initially */}
      <div
        className="
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          flex items-center justify-center gap-4
          transition-opacity duration-500
          ${isAnimationDone ? 'opacity-0' : 'opacity-100 z-10'}
        "
      >
        {/* ANKITA text - slides left */}
        <div
          className={`
            transition-all duration-[2000ms] ease-[cubic-bezier(0.86,0,0.07,1)]
            ${isAnimating ? 'transform -translate-x-[600px] opacity-0' : 'transform translate-x-0 opacity-100'}
          `}
        >
          <span
            className="font-t1korium font-light text-white"
            style={{ fontSize: '9.25rem' }}
          >
            ANKITA
          </span>
        </div>

        {/* SAHOO text - slides right */}
        <div
          className={`
            transition-all duration-[2000ms] ease-[cubic-bezier(0.86,0,0.07,1)]
            ${isAnimating ? 'transform translate-x-[600px] opacity-0' : 'transform translate-x-0 opacity-100'}
          `}
        >
          <span
            className="font-t1korium font-light text-white"
            style={{ fontSize: '9.25rem' }}
          >
            SAHOO
          </span>
        </div>
      </div>

      {/* The image wrapper handles the expansion animation from center point to full screen */}
      <div
        className={`
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          transition-all duration-[2000ms] ease-[cubic-bezier(0.86,0,0.07,1)]
          ${isAnimating
            ? 'w-[100vw] h-[100vh] scale-100'
            : 'w-0 h-0 scale-0'
          }
        `}
      >
        <div className="relative w-full h-full">
          <Image
            src="/image/LoadingImage.png"
            alt="Showcase background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;