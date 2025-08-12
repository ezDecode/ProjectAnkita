'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface HeroProps {
  isVisible: boolean;
}

const Hero = ({ isVisible }: HeroProps) => {
  const contentRef = useRef(null);

  // Simple fade-in animation when the component is visible.
  useGSAP(() => {
    if (!isVisible) return;

    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    );
  }, { dependencies: [isVisible] });

  return (
    // This is now a regular section with some padding.
    // It will scroll up naturally with the page.
    <section
      className={`w-full flex items-center justify-center py-24 md:py-32 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div ref={contentRef} className="w-[75vw] mx-auto text-center opacity-0">
          <h1 className="font-ppneue text-[8.5rem] font-medium uppercase text-black leading-none">
            Main Content
          </h1>
          <p className="font-ppneue text-2xl text-black/70 mt-8">
            The hero section appears here.
          </p>
      </div>
    </section>
  );
};

export default Hero;