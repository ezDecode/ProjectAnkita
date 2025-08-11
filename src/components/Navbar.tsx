'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface NavbarProps {
  isVisible: boolean;
}

const Navbar = ({ isVisible }: NavbarProps) => {
  const headerRef = useRef(null);

  useGSAP(
    () => {
      if (isVisible) {
        gsap.to(headerRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.5, // A slight delay after the intro finishes
        });
      }
    },
    { dependencies: [isVisible], scope: headerRef }
  );

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-1/2 -translate-x-1/2 w-[80.21vw] py-6 z-50 opacity-0"
      style={{ transform: 'translateY(-100%)' }} // Initial position off-screen
    >
      <div className="w-full flex justify-between items-center">
        {/* Logo */}
        <Link 
          href="/" 
          className='font-ppneue font-light text-black text-[2rem]' style={{letterSpacing: '1px'}}
        >
          Ankita Sahoo
        </Link>
        
        <nav>
          <ul className="flex items-center gap-8 text-black font-ppneue tracking-tight uppercase text-[1rem]" style={{fontWeight: 500, letterSpacing: '-0.01em'}}>
            <li>
              <Link href="/about" className="font-ppneue">About</Link>
            </li>
            <li>
              <Link href="/projects" className="font-ppneue">Project</Link>
            </li>
            <li>
              <Link
                href="mailto:example@email.com" 
                className="font-ppneue"
              >
                Email Me
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;