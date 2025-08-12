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

  useGSAP(() => {
    if (!isVisible) return;

    // Enhanced navbar entrance animation
    const tl = gsap.timeline();
    
    // First, slide down from above
    tl.fromTo(headerRef.current, 
      {
        y: -100,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
      }
    );

    // Add a subtle bounce effect
    tl.to(headerRef.current, {
      y: -5,
      duration: 0.2,
      ease: 'power2.out',
    }).to(headerRef.current, {
      y: 0,
      duration: 0.3,
      ease: 'back.out(1.7)',
    });

  }, { dependencies: [isVisible], scope: headerRef });

  return (
    <div className="sticky top-4 z-50 w-full flex justify-center">
      <header
        ref={headerRef}
        className="w-[60vw] opacity-0 rounded-[20px] border border-white/50 bg-white/30 backdrop-blur-lg shadow-lg"
        style={{ transform: 'translateY(-100%)' }}
      >
        <div className="w-full flex justify-between items-center px-6 py-3">
          {/* Logo */}
          <Link 
            href="/" 
            className='font-ppneue font-medium text-black text-[2rem]' 
            style={{letterSpacing: '1px'}}
          >
            Kimia Sans
          </Link>
          
          <nav>
            <ul className="flex items-center gap-8 text-black font-ppneue tracking-tight uppercase text-[1rem]" style={{fontWeight: 500, letterSpacing: '-0.01em'}}>
              <li>
                <Link href="/about" className="font-ppneue hover:text-black/70 transition-colors duration-200">About</Link>
              </li>
              <li>
                <Link href="/projects" className="font-ppneue hover:text-black/70 transition-colors duration-200">Project</Link>
              </li>
              <li>
                <Link
                  href="mailto:example@email.com" 
                  className="font-ppneue hover:text-black/70 transition-colors duration-200"
                >
                  Email Me
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;