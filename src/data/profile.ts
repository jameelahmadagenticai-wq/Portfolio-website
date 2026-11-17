import { Profile, ExperienceItem, EducationItem } from '../types';

export const PROFILE_DATA: Profile = {
  name: "Jameel Ahmad",
  titles: [
    "AI/ML Engineer",
    "LLMs & Agentic AI Specialist",
    "Offline Air-Gapped AI Architect",
    "Full-Stack Engineer (FastAPI & React)",
    "n8n Workflow Automation Expert"
  ],
  location: "Lahore, Pakistan",
  email: "jameelahmadagenticai@gmail.com",
  phone: "0308-6309698",
  whatsapp: "+923086309698",
  linkedin: "https://www.linkedin.com/in/mjameelahmad/",
  github: "https://github.com/jameelahmadagenticai-wq",
  stats: {
    experienceYears: 2,
    projectsCount: 7,
    companiesCount: 2,
    pagesMigrated: 260
  }
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: "January 2026 – Present",
    role: "AI Engineer",
    company: "Sysvoy",
    location: "Lahore, Pakistan",
    description: "Architecting fully offline air-gapped multi-agent systems, cybersecurity compliance platforms, and multi-tenant POS operating systems.",
    highlights: [
      "Built an air-gapped multi-agent AI system (LangGraph, Ollama, Qdrant, PostgreSQL, FastAPI, Docker) running fully offline.",
      "Contributed to the Customized CISO Assistant cybersecurity GRC platform (FastAPI, Celery, React, CI/CD).",
      "Built the Refinery CMS to Camaleon CMS migration; contributed to the SnackUp OS multi-tenant restaurant POS platform."
    ],
    associatedProjects: [
      { id: "air-gapped-ai", name: "Air-Gapped Multi-Agent AI" },
      { id: "ciso-assistant", name: "Customized CISO Assistant" },
      { id: "snackup-os", name: "SnackUp OS POS" },
      { id: "cms-migration", name: "Refinery CMS Migration" }
    ]
  },
  {
    period: "July 2024 – January 2026",
    role: "Associate AI/ML Engineer",
    company: "InvoZone",
    location: "Lahore, Pakistan",
    description: "Developed deep learning speech models, production hybrid RAG pipelines, and automated multi-channel media pipelines.",
    highlights: [
      "Built a deep learning lip-reading model (PyTorch, 3D CNN, BiLSTM, CTC loss), evaluated with WER and CER.",
      "Built production hybrid RAG pipelines (LangChain, GPT-4o-mini, Pinecone, SQL) and scalable FastAPI services with Docker.",
      "Built OCR pipelines, n8n workflow automation (Slack, Telegram), and ML pipelines with Scikit-learn and Pandas.",
      "Built an n8n social media automation converting Telegram messages into AI-voiced, captioned videos."
    ],
    associatedProjects: [
      { id: "lip-reading", name: "Lip Reading Model (Conv3D+BiLSTM+CTC)" },
      { id: "industrial-rag", name: "Industrial Hybrid RAG" },
      { id: "social-video-pipeline", name: "Social Media Video Automation" }
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "MS Computer Science (AI Specialization)",
    institution: "",
    period: "Aug 2022 – Oct 2024",
    specialization: "Specialization in Artificial Intelligence & Deep Learning",
    grade: "Major Focus on Deep Learning (3D CNN, BiLSTM, CTC), LLMs, and Multi-Agent Systems"
  },
  {
    degree: "MSc IT",
    institution: "",
    period: "2015 – 2017",
    specialization: "Information Technology & Enterprise Software Architecture",
    grade: "Core Focus on Distributed Systems, Relational Databases, and Algorithms"
  }
];
