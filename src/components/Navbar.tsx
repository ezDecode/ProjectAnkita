'use client';

import Image from 'next/image';
import Link from 'next/link';

interface NavbarProps {
  isVisible: boolean;
}

const Navbar = ({ isVisible }: NavbarProps) => {
  return (
    <header
      className={`
        fixed top-0 left-1/2 -translate-x-1/2 w-[81vw] py-6 z-50
        transition-opacity duration-1000
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <div className="w-full flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/image/LoadingImage.png" // ** Replace with your logo path **
            alt="Logo"
            width={40}
            height={40}
          />
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex items-center gap-8 text-white font-manrope uppercase text-sm">
            <li><Link href="/about" className="hover:text-gray-300">[About]</Link></li>
            <li><Link href="/projects" className="hover:text-gray-300">[Project]</Link></li>
            <li>
              <Link
                href="mailto:example@email.com" // ** Replace with your email **
                className="text-white hover:bg-gray-200"
              >
                [Email Me]
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;