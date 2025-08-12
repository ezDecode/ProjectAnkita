'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MainImage = () => {
  const imageAnimateRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!imageAnimateRef.current) return;

    gsap.fromTo(
      imageAnimateRef.current,
      {
        width: '70vw',
        height: '75vh',
        borderRadius: '40px',
      },
      {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '#image-pin-sequence',
          start: 'top top',
          end: '33% top', 
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <div className="sticky top-0 h-screen w-full flex justify-center items-center overflow-hidden">
      <div
        ref={imageAnimateRef}
        className="relative w-[70vw] h-[75vh] overflow-hidden"
      >
        <Image
          src="/assets/placeholder.png"
          alt="A woman with pigeons flying around her"
          fill
          className="object-cover grayscale"
          priority
        />
      </div>
    </div>
  );
};

export default MainImage;