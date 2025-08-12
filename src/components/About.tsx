'use client';

// No GSAP or animation imports needed anymore.

const About = () => {
  return (
    // This section is now a normal part of the page flow.
    <section 
      // THE MAGIC TRICK:
      // -mt-[100vh]: Pulls the entire section up by one screen height.
      // h-screen: Gives the section a full screen height to center its content in.
      // relative z-10: Ensures it sits on top of the image that comes before it.
      className="relative z-10 h-screen w-full flex items-center justify-center -mt-[100vh]"
    >
      <div className="w-[75vw] max-w-4xl text-center">
        <h2 
          className="font-ppneue text-6xl font-medium uppercase text-white mb-8"
          style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
        >
          About Me
        </h2>
        <p 
          className="font-ppneue text-xl text-white/90 leading-relaxed max-w-2xl mx-auto"
          style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
        >
          Here is some placeholder text describing the individual. This paragraph can be updated later with more specific details about skills, experiences, and professional background. It provides a brief introduction and sets the stage for a more detailed resume or project portfolio.
        </p>
      </div>
    </section>
  );
};

export default About;