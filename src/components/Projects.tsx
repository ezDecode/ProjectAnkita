'use client';

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS_DATA, Project } from '@/data/projects';

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const accordionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useGSAP(() => {
    if (!containerRef.current || !cursorRef.current) return;

    const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.6, ease: 'power3.out' });

    const moveHandler = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    containerRef.current.addEventListener('mousemove', moveHandler);

    return () => {
      containerRef.current?.removeEventListener('mousemove', moveHandler);
    };
  }, { scope: containerRef });

  const handleMouseEnter = (project: Project) => {
    // Don't show hover image if this project is currently expanded
    if (expandedId === project.id) {
      return;
    }
    
    setActiveProject(project);
    gsap.to(cursorRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cursorRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: 'power2.out',
    });
    setActiveProject(null);
  };

  const toggleAccordion = (projectId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const contentEl = accordionRefs.current.get(projectId);
    if (!contentEl) return;

    if (expandedId === projectId) {
      // Collapse
      gsap.to(contentEl, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => setExpandedId(null),
      });
    } else {
      // Hide the cursor image when expanding
      gsap.to(cursorRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.out',
      });
      setActiveProject(null);
      
      // Collapse previously expanded
      if (expandedId) {
        const prevEl = accordionRefs.current.get(expandedId);
        if (prevEl) {
          gsap.to(prevEl, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'power3.inOut',
          });
        }
      }
      
      // Expand new one
      setExpandedId(projectId);
      const autoHeight = contentEl.scrollHeight;
      gsap.fromTo(
        contentEl,
        { height: 0, opacity: 0 },
        {
          height: autoHeight,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.inOut',
        }
      );
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0a0a0a] text-white py-20 md:py-32"
      id="projects"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="font-editorial text-5xl md:text-7xl lg:text-8xl font-light mb-6 tracking-tight">
            Selected Projects
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl">
            A curated collection of work spanning AI/ML systems, infrastructure, and production deployments.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-1">
          {PROJECTS_DATA.map((project, index) => (
            <div
              key={project.id}
              className="project-item group"
              onMouseEnter={() => handleMouseEnter(project)}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                className="flex items-center justify-between py-6 md:py-8 border-t border-white/10 transition-colors duration-300 group-hover:border-white/30 cursor-pointer"
                onClick={(e) => toggleAccordion(project.id, e)}
              >
                {/* Left: Number + Title */}
                <div className="flex items-baseline gap-4 md:gap-8 flex-1">
                  <span className="text-white/40 text-sm md:text-base font-mono min-w-[40px]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-editorial text-2xl md:text-4xl lg:text-5xl font-light group-hover:translate-x-2 transition-transform duration-500">
                    {project.title}
                  </h3>
                </div>

                {/* Right: Category + Year + Expand Icon */}
                <div className="flex items-center gap-4 md:gap-8">
                  <div className="hidden md:flex items-center gap-8 text-white/50 text-sm">
                    <span className="uppercase tracking-wider">{project.category}</span>
                    <span className="font-mono">{project.year}</span>
                  </div>
                  
                  {/* Expand/Collapse Icon */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/30 transition-transform duration-300">
                    <span className={`text-white/70 transition-transform duration-300 ${expandedId === project.id ? 'rotate-180' : ''}`}>
                      ↓
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile: Show category and year below title */}
              <div className="md:hidden flex gap-4 text-white/50 text-xs uppercase tracking-wider pb-2 pl-14">
                <span>{project.category}</span>
                <span>•</span>
                <span>{project.year}</span>
              </div>

              {/* Accordion Content */}
              <div
                ref={(el) => {
                  if (el) accordionRefs.current.set(project.id, el);
                }}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="pl-14 pr-4 md:pr-12 pb-8 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left: Description and Tags */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-white/40 text-sm uppercase tracking-wider mb-3">Description</h4>
                        <p className="text-white/80 text-lg leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-white/40 text-sm uppercase tracking-wider mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-white/10 text-white/80 text-sm rounded-full border border-white/20"
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* View Project Link */}
                      <Link
                        href={project.href}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-medium transition-all duration-300 hover:gap-4 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>View Project</span>
                        <span>→</span>
                      </Link>
                    </div>

                    {/* Right: Project Image */}
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5">
                      <Image
                        src={project.imageSrc}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom border */}
        <div className="border-t border-white/10 mt-1"></div>

        {/* View All Link */}
        <div className="mt-16 md:mt-24 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-medium transition-all duration-300 hover:gap-5 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            <span>View All Projects</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* Floating Cursor Image - Desktop Only */}
      <div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none z-50 opacity-0 scale-90"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {activeProject && (
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={activeProject.imageSrc}
              alt={activeProject.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white/80 text-sm line-clamp-2">
                {activeProject.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
