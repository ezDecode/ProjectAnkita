// src/components/Loading.tsx
'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface LoadingProps {
  onComplete: () => void;
}

// PLAN EXECUTED: Satellites are now data-driven for scalability and variety.
const SATELLITES = [
  { size: 30, initialRotation: 0 },
  { size: 20, initialRotation: 120 },
  { size: 25, initialRotation: 240 },
  { size: 18, initialRotation: 60 },
  { size: 22, initialRotation: 300 },
];

const Loading = ({ onComplete }: LoadingProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // --- Continuous Background Animations ---

    gsap.to(".orb-main", {
      duration: 3,
      borderRadius: "42% 58% 70% 30% / 45% 45% 55% 55%",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // PLAN EXECUTED: Each satellite now gets its own independent, randomized orbit animation.
    gsap.utils.toArray<HTMLDivElement>('.satellite').forEach((sat) => {
      gsap.to(sat, {
        duration: gsap.utils.random(8, 12), // Randomized duration for a natural feel.
        rotation: "+=360", // Continuous rotation from its starting point.
        repeat: -1,
        ease: "none",
      });
    });

    // --- Main Timed Reveal Sequence ---
    const tl = gsap.timeline();
    tl.to(".loader-text", { duration: 1.2, opacity: 1, y: 0, ease: "expo.out", delay: 1 })
      .to(".satellite-orb", { duration: 1, scale: 0, ease: "power3.in", stagger: 0.1 }, "+=1")
      .to(".orb-main", { duration: 0.3, scale: 1.1, ease: "power2.out" }, "-=0.5")
      .to(".orb-main", { duration: 0.5, scale: 1, ease: "power2.in" })
      .to(".loader-text", { duration: 0.8, opacity: 0, ease: "power3.in" }, "<")
      .to(".orb-main", { duration: 1.5, scale: 30, ease: "expo.in", onComplete: onComplete }, "-=0.5");

  }, { scope: preloaderRef });

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="orb-container">
        {SATELLITES.map((sat, index) => (
          <div key={index} className="satellite" style={{ transform: `rotate(${sat.initialRotation}deg)` }}>
            <div className="satellite-orb" style={{ width: sat.size, height: sat.size }}></div>
          </div>
        ))}
        <div className="orb-main"></div>
      </div>
      <div className="loader-text">ANKITA SAHOO</div>
    </div>
  );
};

export default Loading;