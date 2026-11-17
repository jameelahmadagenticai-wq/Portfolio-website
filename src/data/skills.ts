import { SkillItem } from '../types';

export const SKILLS_DATA: SkillItem[] = [
  {
    id: "llm-agentic",
    category: "ai",
    title: "LLMs & Agentic AI",
    iconName: "Bot",
    chips: [
      "LangChain",
      "LangGraph",
      "Multi-Agent Orchestration",
      "Hybrid RAG (Dense + BM25)",
      "Query Routing & Intent Detection",
      "Prompt Engineering",
      "Ollama Local Inference",
      "Qwen 2.5",
      "LLaMA 3",
      "Mistral 7B",
      "OpenAI GPT-4o",
      "Whisper"
    ]
  },
  {
    id: "ml-cv",
    category: "ai",
    title: "Machine Learning & Computer Vision",
    iconName: "BrainCircuit",
    chips: [
      "Computer Vision",
      "MediaPipe Face Mesh (468 Pts)",
      "3D CNN (Conv3D)",
      "Bidirectional LSTM (BiLSTM)",
      "CTC Loss & Beam Decoder",
      "TimeDistributed Layers",
      "Sequence Modeling (.npy)",
      "Scikit-learn",
      "OpenCV",
      "NLP & NER",
      "Deep Learning",
      "Synthetic Data Prep"
    ]
  },
  {
    id: "backend-apis",
    category: "backend",
    title: "Backend & Distributed Systems",
    iconName: "Server",
    chips: [
      "Python 3.11+",
      "FastAPI (Async)",
      "Hono (Node.js)",
      "RESTful APIs",
      "WebSockets",
      "Celery Task Queue",
      "Tenacity Retry / Exponential Backoff",
      "Structured Logging"
    ]
  },
  {
    id: "vector-db",
    category: "backend",
    title: "Databases & Vector Search",
    iconName: "Database",
    chips: [
      "Qdrant Vector DB",
      "PostgreSQL",
      "Forced Row-Level Security (RLS)",
      "Supabase",
      "Redis Cache & Memory",
      "IndexedDB (Offline-first)",
      "Drizzle ORM",
      "FAISS"
    ]
  },
  {
    id: "automation-pipelines",
    category: "devops",
    title: "Automation & Data Pipelines",
    iconName: "Workflow",
    chips: [
      "n8n Workflow Automation",
      "MoviePy & FFmpeg Video Assembly",
      "Telegram Bot API (pyTelegramBotAPI)",
      "Selenium WebDriver",
      "BeautifulSoup4",
      "Enterprise Catalog Parsers",
      "Web Scraping & Migration",
      "Air-Gapped Deployment"
    ]
  },
  {
    id: "frontend-modern",
    category: "frontend",
    title: "Modern Frontend Engineering",
    iconName: "Layout",
    chips: [
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Vite",
      "Motion (Framer Motion)",
      "Responsive Interactive SVGs",
      "Offline-First Service Workers",
      "Client-Side State Architecture"
    ]
  },
  {
    id: "devops-testing",
    category: "devops",
    title: "DevOps & Quality Assurance",
    iconName: "ShieldCheck",
    chips: [
      "Docker & Docker Compose",
      "Air-Gapped Environment Isolation",
      "Git & GitHub Actions",
      "Vitest",
      "Playwright E2E",
      "Linux / Windows Deployment"
    ]
  }
];
