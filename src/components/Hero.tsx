'use client';

interface HeroProps {
  isVisible: boolean;
}

const Hero = ({ isVisible }: HeroProps) => {
  return (
    <main
      className={`relative z-10 flex h-screen w-full items-center justify-center bg-black transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center">
        <h1 className="font-ppneue text-4xl font-medium uppercase text-white">
          Main Content Revealed
        </h1>
        <p className="font-ppneue text-lg text-white/70">
          The hero section appears here.
        </p>
      </div>
    </main>
  );
};

export default Hero;