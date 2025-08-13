'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextRevealByTime } from '@/components/TextRevealByTime';

interface HeroProps {
  isVisible: boolean;
}

const Hero = ({ isVisible }: HeroProps) => {
  const contentRef = useRef(null);

  useGSAP(() => {
    if (!isVisible) return;

    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power3.out', 
        delay: 0.5,
      }
    );
  }, { dependencies: [isVisible] });

  return (
    <section
      className={`sticky top-0 w-full h-screen flex items-center justify-center bg-[#e4e4dd] transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div ref={contentRef} className="w-[75vw] mx-auto text-center opacity-0">
          <h1 className="font-ppneue text-[8.5rem] font-medium text-black leading-[0.95] tracking-tight">
            Crafting <span className='font-editorial font-light'>Intell<span className='italic text-pink-400'>i</span>gence</span> from Code and Data.
          </h1>
          <TextRevealByTime
            text="AI Engineer specializing in NLP and Computer Vision, building robust, scalable production-ready Machine Learning and Deep Learning models from complex datasets."
            className="w-[68vw] font-ppneue font-medium text-[2rem] leading-snug text-black/80 mt-8 mx-auto"
            startDelay={0.5} 
            wordDelay={0.06}
            trigger={isVisible} 
          />
      </div>
    </section>
  );
};

export default Hero;