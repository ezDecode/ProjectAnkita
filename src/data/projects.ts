// src/data/projects.ts

export type ProjectTag = {
  name: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  imageSrc: string;
  description: string;
  tags: ProjectTag[];
  href: string;
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "nas",
    title: "Neural Architecture Search",
    category: "Research",
    year: "2024",
    imageSrc: "/assets/placeholder.png",
    description: "An automated system using evolutionary algorithms to discover novel, high-performance network architectures, moving beyond human intuition in network design.",
    tags: [{ name: "AutoML" }, { name: "PyTorch" }, { name: "Ray" }, { name: "Kubernetes" }],
    href: "#",
  },
  {
    id: "real-time-anomaly",
    title: "Real-time Anomaly Detection",
    category: "Production",
    year: "2024",
    imageSrc: "/assets/placeholder.png",
    description: "Engineered a high-throughput streaming ML pipeline to identify outliers and detect fraud in real-time transaction data with sub-millisecond latency.",
    tags: [{ name: "Apache Kafka" }, { name: "TensorFlow" }, { name: "Redis" }, { name: "gRPC" }],
    href: "#",
  },
  {
    id: "multimodal-ai-assistant",
    title: "Multimodal AI Assistant",
    category: "AI/ML",
    year: "2023",
    imageSrc: "/assets/placeholder.png",
    description: "A fine-tuned LLM with integrated computer vision, built to generate technical documentation from multiple data sources, bridging the gap between code and comprehension.",
    tags: [{ name: "Transformers" }, { name: "CLIP" }, { name: "FastAPI" }, { name: "Docker" }],
    href: "#",
  },
  {
    id: "distributed-training",
    title: "Distributed Training Framework",
    category: "Infrastructure",
    year: "2023",
    imageSrc: "/assets/placeholder.png",
    description: "A custom framework for distributed training across GPU clusters with automatic fault tolerance, solving for the speed and reliability issues of massive models.",
    tags: [{ name: "PyTorch" }, { name: "NCCL" }, { name: "Kubernetes" }, { name: "MLOps" }],
    href: "#",
  },
  {
    id: "cv-diagnostics",
    title: "Computer Vision for Diagnostics",
    category: "Healthcare",
    year: "2023",
    imageSrc: "/assets/placeholder.png",
    description: "An end-to-end, HIPAA-compliant pipeline providing FDA-grade diagnostic assistance for clinicians using medical imaging data.",
    tags: [{ name: "Medical AI" }, { name: "DICOM" }, { name: "TensorRT" }, { name: "AWS" }],
    href: "#",
  },
   {
    id: "recsys-engine",
    title: "Scalable Recommendation Engine",
    category: "Production",
    year: "2022",
    imageSrc: "/assets/placeholder.png",
    description: "Built and deployed a recommendation system serving millions of users, leading to a measurable uplift in user engagement and retention metrics.",
    tags: [{ name: "Spark" }, { name: "Matrix Factorization" }, { name: "AWS Sagemaker" }],
    href: "#",
  },
];