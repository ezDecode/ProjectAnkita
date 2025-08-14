'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export type ProjectItem = {
  title: string;
  description: string;
  imageSrc: string;
  tags?: string[];
  href?: string;
  year?: string;
  category?: string;
};

type LatestProjectsProps = {
  projects?: ProjectItem[];
  className?: string;
};

// PLAN EXECUTED: Rewritten project descriptions to be narrative-driven case studies.
const DEFAULT_PROJECTS: ProjectItem[] = [
    { title: 'Neural Architecture Search', description: 'Challenge: Move beyond human intuition in network design. This automated system uses evolutionary algorithms to discover novel, high-performance architectures.', imageSrc: '/assets/placeholder.png', tags: ['AutoML', 'PyTorch', 'Ray', 'Kubernetes'], year: '2024', category: 'Research' },
    { title: 'Real-time Anomaly Detection', description: 'Requirement: Sub-millisecond fraud detection. Engineered a high-throughput streaming ML pipeline to identify outliers in real-time transaction data.', imageSrc: '/assets/placeholder.png', tags: ['Apache Kafka', 'TensorFlow', 'Redis', 'gRPC'], year: '2024', category: 'Production' },
    { title: 'Multimodal AI Assistant', description: 'Bridging the gap between code and comprehension. A fine-tuned LLM with integrated computer vision, built to generate technical documentation from multiple data sources.', imageSrc: '/assets/placeholder.png', tags: ['Transformers', 'CLIP', 'FastAPI', 'Docker'], year: '2023', category: 'AI/ML' },
    { title: 'Distributed Training Framework', description: 'Problem: Training massive models is slow and prone to failure. Solution: A custom framework for distributed training across GPU clusters with automatic fault tolerance.', imageSrc: '/assets/placeholder.png', tags: ['PyTorch', 'NCCL', 'Kubernetes', 'MLOps'], year: '2023', category: 'Infrastructure' },
    { title: 'Computer Vision for Diagnostics', description: 'Goal: FDA-grade accuracy for medical imaging. An end-to-end, HIPAA-compliant pipeline providing diagnostic assistance for clinicians.', imageSrc: '/assets/placeholder.png', tags: ['Medical AI', 'DICOM', 'TensorRT', 'AWS'], year: '2023', category: 'Healthcare' },
];

export default function LatestProjects({
  projects = DEFAULT_PROJECTS,
  className = '',
}: LatestProjectsProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section 
      ref={sectionRef} 
      style={{ height: `${projects.length * 120}vh` }}
      className={`relative w-full z-10 bg-black ${className}`} 
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
        <div className="mb-16 text-center pt-24">
            {/* PLAN EXECUTED: New, more professional section title. */}
            <h2 className="font-editorial font-extralight text-[8rem] leading-none text-white tracking-tight">
                Selected Works.
            </h2>
            <p className="font-ppneue text-white/60 text-lg mt-2 max-w-xl">
                A curated selection of my recent work in machine learning and AI systems.
            </p>
        </div>

        <div className="relative h-[70vh] w-[85vw] max-w-6xl">
        {projects.map((project, index) => (
            <ProjectCard 
            key={`${project.title}-${index}`}
            item={project}
            index={index}
            totalProjects={projects.length}
            progress={scrollYProgress}
            />
        ))}
        </div>
      </div>
    </section>
  );
}

// ProjectCard component remains the same, only the data it receives has changed.
function ProjectCard({ item, index, totalProjects, progress }: { item: ProjectItem; index: number; totalProjects: number; progress: any; }) {
  const start = index / totalProjects;
  const end = start + (1 / totalProjects);
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], ['-5%', '5%']);
  const cardScale = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0.9, 1, 1, 0.9]);
  return (
    <motion.div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-x-12 items-center" style={{ opacity, y, scale: cardScale }}>
      <motion.div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
        <Image src={item.imageSrc} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 85vw, 40vw" priority={index < 2} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </motion.div>
      <div className="flex flex-col gap-y-6 text-white text-left">
        <div className="flex items-baseline gap-4">
          <span className="font-editorial text-5xl text-white/40">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="font-editorial font-light text-[3rem] leading-tight tracking-tight text-white">{item.title}</h3>
        </div>
        <p className="font-ppneue text-lg leading-relaxed text-white/75 max-w-lg">{item.description}</p>
        {item.tags && (
          <div className="flex flex-wrap gap-3 pt-2">
            {item.tags.map((tag) => (
              <motion.span key={tag} className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/[0.07] backdrop-blur-sm text-sm font-ppneue text-white/90 font-medium" whileHover={{ borderColor: "rgba(255, 255, 255, 0.4)", backgroundColor: "rgba(255, 255, 255, 0.1)" }}>{tag}</motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}