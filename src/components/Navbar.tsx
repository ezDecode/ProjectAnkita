'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavbarProps {
  isVisible: boolean;
}

const Navbar = ({ isVisible }: NavbarProps) => {
  const navVariants = {
    hidden: {
      y: '-150%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
    },
  };

  return (
    <div className="sticky top-4 z-50 w-full flex justify-center">
      <motion.header
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="
          w-[45vw]                     
          bg-white/30                  
          backdrop-blur-lg             
          border border-white/50       
          shadow-lg                    
          rounded-full
        "
      >
        <div className="w-full flex justify-between items-center px-10 py-3">
          <Link 
            href="/" 
            className='font-ppneue font-medium text-black text-[2rem] tracking-tight' 
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
      </motion.header>
    </div>
  );
};

export default Navbar;