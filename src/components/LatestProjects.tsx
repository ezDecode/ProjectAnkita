// src/components/LatestProjects.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS_DATA, Project } from '@/data/projects';

// Using the top 4 projects for a substantial but focused showcase.
const FEATURED_PROJECTS = PROJECTS_DATA.slice(0, 4);

export default function LatestProjects() {
  const [activeProject, setActiveProject] = useState<Project>(FEATURED_PROJECTS[0]);

  return (
    // PLAN EXECUTED: Added a min-height and adjusted padding to ensure the sticky scroll effect is prominent.
    <section className="relative w-full z-10 bg-black text-white min-h-screen flex flex-col justify-center py-24 sm:py-32">
      <div className="w-full max-w-7xl mx-auto px-8">
        
        {/* PLAN EXECUTED: The section header has been rewritten and restyled for better impact. */}
        <div className="mb-20 text-center">
            <h2 className="font-editorial font-extralight text-6xl sm:text-8xl leading-none tracking-tighter">
                Selected Case Studies
            </h2>
            <p className="font-inter text-white/70 text-lg mt-6 max-w-2xl mx-auto">
                A showcase of my recent work in machine learning and AI systems. Each project represents a unique challenge and a tailored, high-performance solution.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-24 items-start">
          {/* Left Column: Project Titles */}
          <div className="flex flex-col gap-y-2 md:sticky md:top-32">
            {FEATURED_PROJECTS.map((project) => (
              <ProjectTitle 
                key={project.id} 
                project={project}
                isActive={activeProject.id === project.id}
                setActiveProject={setActiveProject}
              />
            ))}
            <Link href="/projects" className="group mt-8 flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 text-lg font-inter font-medium text-white backdrop-blur-lg border border-white/20 transition-all hover:bg-white/20 w-fit">
                <span>View Full Archive</span>
                <span className="transition-transform group-hover:translate-x-1.5">→</span>
            </Link>
          </div>
          
          {/* Right Column: Image & Description */}
          <div className="md:sticky md:top-32 w-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeProject.imageSrc}
                    alt={activeProject.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 45vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* PLAN EXECUTED: The project description and tags are now displayed, providing essential context. */}
            <motion.div 
              className="mt-6"
              key={`${activeProject.id}-info`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            >
              <p className="font-inter text-white/70 leading-relaxed text-base">
                {activeProject.description}
              </p>
              <div className="flex flex-wrap gap-2.5 mt-4">
                  {activeProject.tags.map(tag => (
                      <div key={tag.name} className="px-3 py-1 text-sm bg-white/[0.08] text-white/90 rounded-full font-medium">
                          {tag.name}
                      </div>
                  ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ProjectTitle = ({ project, isActive, setActiveProject }: { project: Project; isActive: boolean; setActiveProject: (project: Project) => void; }) => {
  return (
    <div onMouseEnter={() => setActiveProject(project)} className="w-full">
      <motion.div 
        className="relative cursor-pointer py-4 px-5 rounded-xl transition-colors"
        animate={{ backgroundColor: isActive ? 'rgba(255, 255, 255, 0.07)' : 'transparent' }}
      >
        <motion.p 
          className="font-editorial text-4xl font-light transition-colors"
          animate={{ color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)' }}
        >
          {project.title}
        </motion.p>
        {isActive && (
          <motion.div 
            className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-white rounded-full"
            layoutId="active-showcase-indicator"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </motion.div>
    </div>
  );
};