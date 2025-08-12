'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface HeroProps {
  isVisible: boolean;
}

const Hero = ({ isVisible }: HeroProps) => {
  const contentRef = useRef(null);

  useGSAP(() => {
    if (!isVisible) return;

    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    );
  }, { dependencies: [isVisible] });

  return (
    <section
      className={`w-full flex items-center justify-center py-24 md:py-32 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 
        IMPLEMENTATION: 
        - The parent container width is now set to 75vw. 
      */}
      <div ref={contentRef} className="w-[75vw] mx-auto text-center opacity-0">
          <h1 className="font-ppneue text-[8.5rem] font-medium text-black leading-none">
            Crafting <span className='font-editorial font-light'>Intell<span className='italic text-pink-400'>i</span>gence</span> from Code and Data.
          </h1>
          {/*
            IMPLEMENTATION:
            - The paragraph now has its own specific width of 68vw.
            - mx-auto centers it perfectly within the 75vw parent container.
          */}
          <p className="w-[68vw] font-ppneue font-medium text-2xl text-black/70 mt-8 mx-auto">
            A Machine Learning and Deep Learning Engineer with a passion for building robust and scalable AI solutions. I specialize in turning complex datasets into production-ready models, with a focus on Natural Language Processing and Computer Vision.
          </p>
      </div>
    </section>
  );
};

export default Hero;