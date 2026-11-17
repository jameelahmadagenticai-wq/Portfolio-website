import { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: "air-gapped-ai",
    slug: "air-gapped-ai",
    title: "Local Air-Gapped Multi-Agent AI System (Zero Data Egress)",
    company: "Sysvoy",
    badge: "Air-Gapped LangGraph Architecture",
    category: "llm",
    metrics: [
      { label: "Data Egress", value: "0.00 KB (Strict Air-Gap)" },
      { label: "Models (Dev/Prod)", value: "Qwen 2.5:3b / LLaMA 3:70b" },
      { label: "Vector Search", value: "Qdrant (Local HNSW)" }
    ],
    summary: "Enterprise-grade offline AI platform engineered with LangGraph multi-agent orchestration, Qdrant vector search, Redis/PostgreSQL memory coordination, and local Ollama inference under complete data isolation.",
    stack: [
      "Python 3.11",
      "LangGraph StateGraph",
      "LangChain",
      "Qdrant (Local)",
      "Ollama Local Inference",
      "Qwen 2.5:3b",
      "LLaMA 3:70b",
      "Mistral 7B",
      "Phi-3 / Phi-4",
      "FastAPI",
      "Redis Memory",
      "Docker"
    ],
    bullets: [
      "Zero Data Egress Architecture: Designed for strictly isolated corporate intranets; 100% of embeddings, vector lookups, and model inference run on local hardware with zero external API calls.",
      "LangGraph Multi-Agent Orchestration: Routes tasks dynamically between Orchestrator Agent (qwen2.5:3b / llama3:70b), RAG Agent (llama3:8b), Analyst Agent (mistral:7b), Utility Agent (phi-3/4), and Memory Agent.",
      "Modular Service Decoupling: Integrates enterprise services (retriever.py, context_builder.py, rag_chain.py, memory_manager.py, qdrant_service.py) under unified agent state.",
      "Deterministic Verification: RAG Agent performs semantic retrieval validation and source attribution before passing synthesized context to downstream reasoning agents."
    ],
    diagram: {
      title: "Local Air-Gapped Multi-Agent AI System",
      subtitle: "Multi-agent LangGraph orchestration, specialized worker nodes, and local Ollama inference",
      corePrinciples: [
        { title: "Zero Data Egress", desc: "Strict offline air-gap; impossible to leak proprietary data outside local intranet." },
        { title: "Decoupled Routing", desc: "Intent & complexity classification routes queries to lightweight specialized agents." },
        { title: "Model Swappable", desc: "Seamless migration from CPU-first development (Qwen 2.5:3b) to production clusters (LLaMA 3:70b)." }
      ],
      roles: [
        { name: "Orchestrator Agent", class: "role-orchestrator", desc: "Routes tasks based on intent, complexity, context, and memory (Qwen 2.5 / LLaMA 3:70b)" },
        { name: "RAG Agent", class: "role-rag", desc: "Handles semantic retrieval, grounded QA, and source attribution (LLaMA 3:8b)" },
        { name: "Analyst Agent", class: "role-analyst", desc: "Deep analytical reasoning, multi-step evaluations, and trend analysis (Mistral 7B)" },
        { name: "Utility Agent", class: "role-utility", desc: "Summarization, formatting, markdown normalization, and data cleanup (Phi-3 / Phi-4)" },
        { name: "Memory Agent", class: "role-memory", desc: "Conversational context tracking and Redis/PostgreSQL memory coordination" }
      ],
      views: [
        {
          id: "agent-graph",
          name: "View 1: LangGraph Agent Orchestration",
          shortName: "Multi-Agent Topology",
          title: "LangGraph Multi-Agent Workflow Execution",
          subtitle: "User Query -> FastAPI -> LangGraph Orchestrator -> Specialized Agents -> Enterprise Services -> Local Ollama",
          viewBox: "0 0 1520 490",
          nodes: [
            { id: "ag_query", label: "Streamlit UI / FastAPI", tech: "User Query & Local Auth", x: 30, y: 200, width: 220, height: 76, step: 1, desc: "Captures user query within air-gapped intranet; enforces local input validation and auth tokens." },
            { id: "ag_orch", label: "LangGraph Orchestrator", tech: "qwen2.5:3b / llama3:70b", x: 320, y: 200, width: 230, height: 76, step: 2, desc: "Classifies task intent, plans workflow, and routes conditional execution edges in LangGraph StateGraph." },
            { id: "ag_rag", label: "RAG Agent Node", tech: "llama3:8b (retriever.py)", x: 620, y: 30, width: 235, height: 74, step: 3, desc: "Performs enterprise semantic retrieval via retriever.py, context_builder.py, and grounded QA validation." },
            { id: "ag_analyst", label: "Analyst Agent Node", tech: "mistral:7b (Deep Reasoning)", x: 620, y: 142, width: 235, height: 74, step: 3, desc: "Handles multi-step reasoning, comparative evaluations, and trend analysis on retrieved datasets." },
            { id: "ag_utility", label: "Utility Agent Node", tech: "phi3 / phi4 (Format/Clean)", x: 620, y: 254, width: 235, height: 74, step: 3, desc: "Executes response summarization, structured markdown normalization, and prompt sanitization." },
            { id: "ag_mem", label: "Memory Agent Node", tech: "Redis / PostgreSQL State", x: 620, y: 366, width: 235, height: 74, step: 3, desc: "Coordinates with memory_manager.py for session continuity and pgvector semantic memory search." },
            { id: "ag_qdrant", label: "Enterprise Services", tech: "qdrant_service.py HNSW", x: 925, y: 200, width: 240, height: 76, step: 4, desc: "Hydrates vector chunks, manages rag_chain.py, and runs deterministic source validation." },
            { id: "ag_ollama", label: "Local Ollama Engine", tech: "Zero Egress Inference", x: 1235, y: 200, width: 245, height: 76, step: 5, desc: "Executes final grounded synthesis purely on local CPU/GPU hardware with 0.00 KB external data egress." }
          ],
          edges: [
            { from: "ag_query", to: "ag_orch", step: 2 },
            { from: "ag_orch", to: "ag_rag", step: 3 },
            { from: "ag_orch", to: "ag_analyst", step: 3 },
            { from: "ag_orch", to: "ag_utility", step: 3 },
            { from: "ag_orch", to: "ag_mem", step: 3 },
            { from: "ag_rag", to: "ag_qdrant", step: 4 },
            { from: "ag_analyst", to: "ag_qdrant", step: 4 },
            { from: "ag_utility", to: "ag_qdrant", step: 4 },
            { from: "ag_mem", to: "ag_qdrant", step: 4 },
            { from: "ag_qdrant", to: "ag_ollama", step: 5 }
          ]
        },
        {
          id: "enterprise-services",
          name: "View 2: RAG & Memory Services Pipeline",
          shortName: "Enterprise Services",
          title: "Enterprise Services & Data Flow Architecture",
          subtitle: "StateGraph -> retriever.py -> context_builder.py -> Qdrant HNSW -> rag_chain.py -> Local Ollama",
          viewBox: "0 0 1520 480",
          nodes: [
            { id: "es_in", label: "AgentState Ingestion", tech: "LangGraph State Dict", x: 30, y: 195, width: 220, height: 76, step: 1, desc: "Ingests unified state containing input query, task_type, session history, and memory context." },
            { id: "es_retriever", label: "retriever.py & context", tech: "Context Construction", x: 325, y: 95, width: 235, height: 76, step: 2, desc: "Extracts query keywords, builds structured context windows, and coordinates chunk boundaries." },
            { id: "es_mem", label: "memory_manager.py", tech: "Redis / PostgreSQL Cache", x: 325, y: 295, width: 235, height: 76, step: 2, desc: "Retrieves conversational history from Redis short-term store and long-term user preferences from PostgreSQL." },
            { id: "es_qdrant", label: "qdrant_service.py", tech: "Local Qdrant HNSW Index", x: 630, y: 95, width: 240, height: 76, step: 3, desc: "Performs offline dense vector similarity search across air-gapped corporate documents collection." },
            { id: "es_chain", label: "rag_chain.py Validation", tech: "Source Attribution Guard", x: 940, y: 195, width: 240, height: 76, step: 4, desc: "Validates retrieved source attribution and prevents hallucination before passing payload to LLM." },
            { id: "es_ollama", label: "Local Ollama / vLLM", tech: "Zero Egress Execution", x: 1245, y: 195, width: 245, height: 76, step: 5, desc: "Runs open-weight model synthesis locally on private servers without internet access." }
          ],
          edges: [
            { from: "es_in", to: "es_retriever", step: 2 },
            { from: "es_in", to: "es_mem", step: 2 },
            { from: "es_retriever", to: "es_qdrant", step: 3 },
            { from: "es_qdrant", to: "es_chain", step: 4 },
            { from: "es_mem", to: "es_chain", step: 4 },
            { from: "es_chain", to: "es_ollama", step: 5 }
          ]
        }
      ]
    }
  },
  {
    id: "lip-reading",
    slug: "lip-reading",
    title: "Silent Speech Visual Decoder (Lip Reading System)",
    company: "InvoZone",
    badge: "Conv3D + BiLSTM + CTC Architecture",
    category: "ai",
    metrics: [
      { label: "Spatiotemporal Model", value: "3D CNN (Conv3D)" },
      { label: "Temporal Recurrence", value: "Bidirectional LSTM" },
      { label: "Sequence Decoder", value: "CTC Alignment & Loss" }
    ],
    summary: "End-to-end silent speech decoder predicting spoken words in real time purely from video mouth movements without acoustic audio input using 3D CNNs (Conv3D), Bidirectional LSTMs, and CTC decoding.",
    stack: [
      "Python 3.10",
      "MediaPipe Face Mesh",
      "3D CNN (Conv3D)",
      "Bidirectional LSTM (BiLSTM)",
      "CTC Loss & Beam Decoder",
      "TensorFlow / Keras",
      "OpenCV",
      "NumPy (.npy Sequence Buffers)"
    ],
    bullets: [
      "3D CNN Spatiotemporal Extraction: Utilizes 3D Convolutional layers (Conv3D) to simultaneously capture 2D spatial lip contour geometry and 1D temporal frame-to-frame variations across video sequences.",
      "Bidirectional Temporal Recurrence: Implements multi-layer Bidirectional LSTMs (BiLSTM) to analyze both past and future temporal context for complex phonetic mouth transitions.",
      "CTC Sequence Alignment: Applies Connectionist Temporal Classification (CTC) loss and beam-search decoding to align variable-length visual features directly into continuous words without audio synchronization.",
      "MediaPipe Face Normalization: Isolates 468 facial landmarks to crop normalized mouth sequences (points 61, 146, 91, 181, 84, 17, 314, 405), canceling out head movement and lighting fluctuations."
    ],
    diagram: {
      title: "Silent Speech Visual Decoder Pipeline",
      subtitle: "Webcam stream, MediaPipe Face Mesh, 3D CNN (Conv3D) feature extraction, Bidirectional LSTM, and CTC sequence decoding",
      corePrinciples: [
        { title: "Pure Visual Speech", desc: "Completely zero audio reliance; operates reliably in covert or high-noise environments." },
        { title: "3D Spatiotemporal (Conv3D)", desc: "Captures inter-frame mouth shape velocity and contour dynamics in one unified tensor." },
        { title: "Bidirectional Context", desc: "BiLSTM evaluates bidirectional temporal transitions to distinguish similar phonemes." },
        { title: "CTC Loss Alignment", desc: "Connectionist Temporal Classification solves visual sequence timing without audio markers." }
      ],
      views: [
        {
          id: "lip-pipeline",
          name: "Visual Speech Recognition Flow",
          shortName: "Lip Reading Flow",
          title: "End-to-End Silent Speech Inference Pipeline (Conv3D + BiLSTM + CTC)",
          subtitle: "Camera Frames -> Face Mesh Landmark Crop -> 3D Volume (.npy) -> Conv3D -> BiLSTM -> CTC Decoder -> Word Output",
          viewBox: "0 0 1740 380",
          nodes: [
            { id: "l_cam", label: "Video / Webcam Input", tech: "OpenCV VideoCapture (30 FPS)", x: 30, y: 150, width: 215, height: 76, step: 1, desc: "Captures 30 FPS video frames; normalizes frame rate and image dimensions under variable room angles without audio input." },
            { id: "l_mesh", label: "MediaPipe Face Mesh", tech: "468 Facial Landmarks", x: 275, y: 150, width: 215, height: 76, step: 2, desc: "Tracks 468 landmarks and isolates lip contour perimeter points (61, 146, 91, 181, 84, 17, 314, 405) to cancel head tilt." },
            { id: "l_crop", label: "Mouth Sequence Buffer", tech: "64x64 Tensor (.npy)", x: 520, y: 150, width: 220, height: 76, step: 3, desc: "Crops normalized mouth ROI into a (Batch, 20-30 Frames, 64, 64, 3) spatiotemporal sequence buffer." },
            { id: "l_cnn", label: "3D CNN (Conv3D)", tech: "Spatiotemporal Feature Map", x: 770, y: 150, width: 220, height: 76, step: 4, desc: "Applies 3D convolutional kernels across both 2D spatial mouth shapes and 1D temporal frame velocities simultaneously." },
            { id: "l_lstm", label: "Bidirectional LSTM", tech: "BiLSTM (Forward + Back)", x: 1020, y: 150, width: 215, height: 76, step: 5, desc: "Dual forward and backward LSTM layers capture past and future phonetic transitions to differentiate visually ambiguous phonemes." },
            { id: "l_ctc", label: "CTC Alignment & Loss", tech: "Beam Search Decoder", x: 1265, y: 150, width: 215, height: 76, step: 6, desc: "Connectionist Temporal Classification computes sequence loss and decodes variable-length visual motions into words." },
            { id: "l_out", label: "Predicted Word Output", tech: "0% Audio (WER / CER)", x: 1510, y: 150, width: 200, height: 76, step: 7, desc: "Outputs real-time stabilized word transcription evaluated with Word Error Rate (WER) and Character Error Rate (CER)." }
          ],
          edges: [
            { from: "l_cam", to: "l_mesh", step: 2 },
            { from: "l_mesh", to: "l_crop", step: 3 },
            { from: "l_crop", to: "l_cnn", step: 4 },
            { from: "l_cnn", to: "l_lstm", step: 5 },
            { from: "l_lstm", to: "l_ctc", step: 6 },
            { from: "l_ctc", to: "l_out", step: 7 }
          ]
        }
      ]
    }
  },
  {
    id: "social-video-pipeline",
    slug: "social-video-pipeline",
    title: "OpenClaw AI Video Automation Bot v2.0",
    company: "InvoZone",
    badge: "Autonomous Media Pipeline",
    category: "automation",
    metrics: [
      { label: "TTS Quality", value: "OpenAI tts-1 / tts-1-hd" },
      { label: "Captions Sync", value: "Whisper Word-Level" },
      { label: "Retry Policy", value: "Tenacity Exponential" }
    ],
    summary: "Production-grade autonomous Telegram video bot orchestrating end-to-end short-form video generation from AI script writing to synchronized voiceover, animated captions, and cloud webhook delivery.",
    stack: [
      "Python 3.11",
      "OpenAI GPT-4o",
      "OpenAI TTS-1 / HD",
      "Whisper Word Timestamps",
      "MoviePy",
      "FFmpeg",
      "pyTelegramBotAPI",
      "Tenacity Retry",
      "n8n Webhooks"
    ],
    bullets: [
      "Autonomous Pipeline: Generates viral short-form videos from raw prompt: Script -> Voiceover -> Dynamic Captions -> Video Assembly -> Cloud Upload.",
      "Whisper Word-Level Synchronization: Extracts exact word timestamps to produce dynamic, high-engagement animated subtitle animations.",
      "Threaded Concurrency: Asynchronous worker queue ensures the Telegram bot remains instantly responsive while rendering multiple heavy video tasks.",
      "Resilient Webhook Dispatch: Tenacity exponential backoff retries transient cloud network glitches up to 3 times with structured rotating logs."
    ],
    diagram: {
      title: "OpenClaw Video Automation Pipeline v2.0",
      subtitle: "Multi-brand Telegram bot, OpenAI TTS, Whisper alignment, MoviePy assembly, and n8n dispatch",
      corePrinciples: [
        { title: "Threaded Concurrency", desc: "Video processing never blocks Telegram bot polling; multiple videos render concurrently." },
        { title: "Tenacity Retries", desc: "Automatic exponential backoff on API glitches prevents failed renders." },
        { title: "Multi-Brand Config", desc: "Dynamic tone, CTA, and background video selection loaded from brands.json." }
      ],
      views: [
        {
          id: "video-pipeline-view",
          name: "Video Generation Pipeline",
          shortName: "Video Pipeline",
          title: "OpenClaw v2.0 — End-to-End Synthesis Workflow",
          subtitle: "Telegram Prompt -> GPT-4o Script -> OpenAI TTS -> Whisper Alignment -> FFmpeg Assembly -> Webhook Upload",
          viewBox: "0 0 1740 380",
          nodes: [
            { id: "v_cmd", label: "Telegram Bot Trigger", tech: "pyTelegramBotAPI (/gen)", x: 30, y: 150, width: 215, height: 76, step: 1, desc: "Captures brand selector and topic prompt via Telegram command; validates authorization." },
            { id: "v_brand", label: "Brand Preset Loader", tech: "brands.json (Tone & CTA)", x: 275, y: 150, width: 215, height: 76, step: 2, desc: "Loads target brand tone, CTA, and brand background.mp4 path from brands.json configuration." },
            { id: "v_gpt", label: "GPT-4o Script Engine", tech: "Hook + Value + CTA", x: 520, y: 150, width: 220, height: 76, step: 3, desc: "Generates high-converting short-form video script with viral hook, concise value, and punchy call to action." },
            { id: "v_tts", label: "OpenAI TTS Voiceover", tech: "tts-1 / tts-1-hd (Alloy)", x: 770, y: 150, width: 220, height: 76, step: 4, desc: "Synthesizes studio-quality MP3 voiceover using OpenAI TTS engine with configurable voice and speed." },
            { id: "v_whisper", label: "Whisper Word Alignment", tech: "Word-Level Timestamps", x: 1020, y: 150, width: 215, height: 76, step: 5, desc: "Extracts exact microsecond word boundaries to render dynamic, high-engagement animated popping subtitles." },
            { id: "v_assembly", label: "MoviePy & FFmpeg", tech: "1080x1920 MP4 Assembly", x: 1265, y: 150, width: 215, height: 76, step: 6, desc: "Composites background video, voiceover track, and ImageMagick animated subtitles into vertical 1080x1920 MP4." },
            { id: "v_webhook", label: "Cloud Webhook Upload", tech: "Tenacity Retry / n8n", x: 1510, y: 150, width: 200, height: 76, step: 7, desc: "Uploads final video to Google Drive via n8n webhook with automatic 3x Tenacity exponential retry backoff." }
          ],
          edges: [
            { from: "v_cmd", to: "v_brand", step: 2 },
            { from: "v_brand", to: "v_gpt", step: 3 },
            { from: "v_gpt", to: "v_tts", step: 4 },
            { from: "v_tts", to: "v_whisper", step: 5 },
            { from: "v_whisper", to: "v_assembly", step: 6 },
            { from: "v_assembly", to: "v_webhook", step: 7 }
          ]
        }
      ]
    }
  },
  {
    id: "ciso-assistant",
    slug: "ciso-assistant",
    title: "Sophia CISO Assistant — Cybersecurity GRC Platform",
    company: "Sysvoy",
    badge: "Cybersecurity & Governance",
    category: "fullstack",
    metrics: [
      { label: "Frameworks in DB", value: "180 Verified" },
      { label: "Controls Catalog", value: "64,025 Rows" },
      { label: "Control Mappings", value: "38,763 Active" }
    ],
    summary: "Large-scale cybersecurity Governance, Risk, and Compliance (GRC) data engine mapping 180 international compliance frameworks (ISO 27001, PCI-DSS, SOC 2, NIST) with 64,025 controls and zero orphaned entities.",
    stack: [
      "Python 3.11",
      "PostgreSQL",
      "YAML / JSON Pipeline",
      "Automated Patching Engine",
      "FastAPI",
      "Docker",
      "SQLAlchemy"
    ],
    bullets: [
      "180 International Frameworks: Ingested and reconciled ISO 27001, PCI-DSS, SOC 2, BSI IT-Grundschutz, NIST, and ANSSI guides into a unified relational schema.",
      "64,025 Controls Catalog: Normalized enterprise control requirements across global regulatory bodies with strict structural integrity (0 orphaned controls).",
      "Automated Patching Contract: Built 116 idempotent Python patch scripts ensuring independent, original wording to protect intellectual property and AGPL compliance.",
      "Cross-Framework Mapping: Converted and seeded 38,763 cross-framework control mappings enabling automated multi-standard compliance audits."
    ],
    diagram: {
      title: "Sophia CISO Assistant — Framework & Mapping Pipeline",
      subtitle: "267 YAMLs inspection, license bucketing, 116 idempotent patches, and PostgreSQL seeding",
      corePrinciples: [
        { title: "Pure Structural Integrity", desc: "Zero orphaned controls in DB; 100% of parent_ids point to valid nodes." },
        { title: "Immutable Ref IDs", desc: "Patches rewrite prose descriptions while preserving ref_ids to keep mappings intact." },
        { title: "4-Point Verification", desc: "Every import verified against node count, duplicate ref_ids, and mapping edges." }
      ],
      views: [
        {
          id: "grc-pipeline",
          name: "Framework Ingestion & Patching Pipeline",
          shortName: "GRC Pipeline",
          title: "Sophia CISO Assistant — Ingestion & Patch Contract Flow",
          subtitle: "267 Source YAMLs -> Shape Classifier -> Copyright Safe Patching -> PostgreSQL Database",
          viewBox: "0 0 1520 480",
          nodes: [
            { id: "g_raw", label: "267 Source YAMLs", tech: "backend/framework/*.yaml", x: 30, y: 200, width: 225, height: 76, step: 1, desc: "Raw YAML library: 186 frameworks, 52 requirement mappings, 11 risk matrices, 11 presets." },
            { id: "g_sort", label: "Object Key Classifier", tech: "Shape & Object Inspector", x: 320, y: 200, width: 230, height: 76, step: 2, desc: "Directly inspects objects key: separates control frameworks from mappings, threat catalogs, and risk matrices." },
            { id: "g_license", label: "License Risk Bucketing", tech: "Etalab / Law / Commercial", x: 620, y: 95, width: 235, height: 76, step: 3, desc: "Categorizes frameworks: 16 Open License, 7 Law/Official, 5 Hard-Excluded NC/ND, ~158 Commercial Copyright." },
            { id: "g_patch", label: "116 Idempotent Patches", tech: "patches/<basename>.py", x: 620, y: 305, width: 235, height: 76, step: 3, desc: "Rewrites framework descriptive prose into independently original wording while strictly preserving ref_ids." },
            { id: "g_verify", label: "4-Way Verification Contract", tech: "0 Orphans, Exact Node Match", x: 925, y: 200, width: 245, height: 76, step: 4, desc: "Validates 0 duplicate ref_ids, exact DB count match with JSON nodes, and 0 orphaned parents pointing nowhere." },
            { id: "g_db", label: "PostgreSQL Seeded Catalog", tech: "180 Fwks / 64k Controls / 38k Maps", x: 1240, y: 200, width: 250, height: 76, step: 5, desc: "Seeded relational database holding 180 compliance frameworks, 64,025 controls, and 38,763 active cross-framework mappings." }
          ],
          edges: [
            { from: "g_raw", to: "g_sort", step: 2 },
            { from: "g_sort", to: "g_license", step: 3 },
            { from: "g_sort", to: "g_patch", step: 3 },
            { from: "g_license", to: "g_verify", step: 4 },
            { from: "g_patch", to: "g_verify", step: 4 },
            { from: "g_verify", to: "g_db", step: 5 }
          ]
        }
      ]
    }
  },
  {
    id: "snackup-os",
    slug: "snackup-os",
    title: "Saaz (SnackUp OS) — Multi-Tenant Restaurant Operating System",
    company: "Sysvoy",
    badge: "Enterprise POS & KDS",
    category: "fullstack",
    metrics: [
      { label: "Data Isolation", value: "PostgreSQL RLS" },
      { label: "Offline Resilience", value: "100% Durable (IndexedDB)" },
      { label: "Rounding Error", value: "0.00% (Integer Paisa)" }
    ],
    summary: "Production offline-first restaurant operating system featuring durable local transactions, forced multi-tenant database isolation, and real-time station-routed kitchen display system.",
    stack: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Row-Level Security (RLS)",
      "IndexedDB",
      "WebSockets",
      "Service Workers",
      "Drizzle ORM"
    ],
    bullets: [
      "Forced Multi-Tenancy: Every query filtered by tenant_id enforced at the PostgreSQL database engine level via Row Level Security (RLS).",
      "Offline-First Outbox: All sales, item modifiers, and tenders written durably to IndexedDB first with idempotency keys; zero data loss during network dropouts.",
      "Real-time KDS: WebSocket kitchen display system routing tickets dynamically to grill, fry, prep, and beverage stations.",
      "Financial Integrity: Strict integer paisa arithmetic eliminating floating-point rounding errors across split tenders and automated discounts."
    ],
    diagram: {
      title: "Saaz (SnackUp OS) — Architectural Flows",
      subtitle: "Offline-first transactional pipeline, station-routed KDS, and multi-tenant cloud sync",
      corePrinciples: [
        { title: "Offline-First", desc: "Never lose a transaction when internet drops; sales written durably to local IndexedDB first." },
        { title: "Forced RLS", desc: "PostgreSQL Row-Level Security guarantees zero cross-tenant data leakage." },
        { title: "Integer Paisa", desc: "Money computed strictly as integer paisa eliminating float precision errors." },
        { title: "Station Routing", desc: "Kitchen stations only receive tickets specific to their culinary prep duties." }
      ],
      roles: [
        { name: "Cashier", class: "role-cashier", desc: "Till operations, basket management, tender validation" },
        { name: "Manager", class: "role-manager", desc: "Shift overrides, blind cash-drawer reconciliation" },
        { name: "Kitchen Chef", class: "role-chef", desc: "Station-specific ticket bump, cooking status updates" },
        { name: "Store Owner", class: "role-owner", desc: "Multi-branch reporting, menu governance, tenant settings" }
      ],
      views: [
        {
          id: "sale-flow",
          name: "View 1: Offline-First Sale Flow",
          shortName: "Sale Flow",
          title: "Saaz — Offline-First Till Transaction Flow",
          subtitle: "Cashier PIN Login -> Basket -> IndexedDB Outbox -> 3 Parallel Branches (Receipt, KDS WebSocket, Cloud Sync)",
          viewBox: "0 0 1520 480",
          nodes: [
            { id: "s1_auth", label: "Cashier PIN Login", tech: "HMAC / Session Cache", x: 30, y: 70, width: 220, height: 74, step: 1, desc: "Verifies cashier PIN against local cached HMAC session; allows seamless offline sign-in." },
            { id: "s1_till", label: "Catalog & Modifiers", tech: "Service Worker Cache", x: 285, y: 70, width: 225, height: 74, step: 2, desc: "Loads cached menu hierarchy, branch pricing, and item modifiers with zero network latency." },
            { id: "s1_basket", label: "Basket Computation", tech: "Integer Paisa Math", x: 545, y: 70, width: 225, height: 74, step: 3, desc: "Calculates line-item totals, split tenders, discounts, and tax in integer paisa to prevent float errors." },
            { id: "s1_tender", label: "Tender Selection", tech: "Cash / Card / JazzCash", x: 805, y: 70, width: 225, height: 74, step: 4, desc: "Captures payment method, change due, and records transaction with an idempotency key." },
            { id: "s1_idb", label: "IndexedDB Outbox", tech: "Durable Local Store", x: 1065, y: 70, width: 245, height: 74, step: 5, desc: "Commits sale durably to browser IndexedDB outbox. Customer is unblocked immediately." },
            { id: "s1_print", label: "Thermal Receipt", tech: "ESC/POS / 58mm CSS", x: 1065, y: 175, width: 245, height: 72, step: 6, desc: "Generates paper receipt for customer via Web Bluetooth or USB thermal printer." },
            { id: "s1_kds", label: "Local KDS Broadcast", tech: "Station Routing WS", x: 1065, y: 275, width: 245, height: 72, step: 7, desc: "Broadcasts order ticket directly to kitchen display screens over local network." },
            { id: "s1_sync", label: "Background Cloud Sync", tech: "REST + Idempotency", x: 1065, y: 375, width: 245, height: 72, step: 8, desc: "Pushes outbox record to cloud Supabase PostgreSQL as soon as internet connectivity is active." }
          ],
          edges: [
            { from: "s1_auth", to: "s1_till", step: 2 },
            { from: "s1_till", to: "s1_basket", step: 3 },
            { from: "s1_basket", to: "s1_tender", step: 4 },
            { from: "s1_tender", to: "s1_idb", step: 5 },
            { from: "s1_idb", to: "s1_print", step: 6 },
            { from: "s1_idb", to: "s1_kds", step: 7 },
            { from: "s1_idb", to: "s1_sync", step: 8 }
          ]
        },
        {
          id: "kds-routing",
          name: "View 2: Kitchen Display System",
          shortName: "Kitchen KDS",
          title: "Saaz — Station-Routed Kitchen Display Engine",
          subtitle: "Ticket Ingestion -> Station Filter -> Chef Bump Bar -> Delivery Dispatch",
          viewBox: "0 0 1520 460",
          nodes: [
            { id: "k1_in", label: "Order Ingestion", tech: "WebSocket Dispatch", x: 30, y: 195, width: 220, height: 74, step: 1, desc: "Receives raw ticket payload from POS outbox over secure WebSocket." },
            { id: "k1_route", label: "Station Classifier", tech: "Rule-Based Filter", x: 285, y: 195, width: 225, height: 74, step: 2, desc: "Parses ticket line items and tags them for specific culinary prep zones." },
            { id: "k1_grill", label: "Grill Station Display", tech: "Burgers & Steaks", x: 550, y: 70, width: 230, height: 74, step: 3, desc: "Displays items tagged 'grill' with target cook countdown and temperature alerts." },
            { id: "k1_fry", label: "Fryer Station Display", tech: "Sides & Appetizers", x: 550, y: 195, width: 230, height: 74, step: 3, desc: "Displays items tagged 'fry' synchronized to match burger completion time." },
            { id: "k1_bev", label: "Barista / Beverage", tech: "Drinks & Desserts", x: 550, y: 320, width: 230, height: 74, step: 3, desc: "Displays cold drinks and shakes for instant pickup station." },
            { id: "k1_expo", label: "Expo / Assembly Station", tech: "Tray Consolidation", x: 840, y: 195, width: 235, height: 74, step: 4, desc: "Consolidates all completed station tickets into a single unified customer tray." },
            { id: "k1_done", label: "Customer / Rider Bump", tech: "Order Ready Notification", x: 1140, y: 195, width: 235, height: 74, step: 5, desc: "Triggers SMS/WhatsApp notification and alerts pickup counter." }
          ],
          edges: [
            { from: "k1_in", to: "k1_route", step: 2 },
            { from: "k1_route", to: "k1_grill", step: 3 },
            { from: "k1_route", to: "k1_fry", step: 3 },
            { from: "k1_route", to: "k1_bev", step: 3 },
            { from: "k1_grill", to: "k1_expo", step: 4 },
            { from: "k1_fry", to: "k1_expo", step: 4 },
            { from: "k1_bev", to: "k1_expo", step: 4 },
            { from: "k1_expo", to: "k1_done", step: 5 }
          ]
        }
      ]
    }
  },
  {
    id: "industrial-rag",
    slug: "industrial-rag",
    title: "Industrial Hybrid RAG & Multi-Agent Assistant",
    company: "InvoZone",
    badge: "Hybrid Dense + Sparse RAG",
    category: "llm",
    metrics: [
      { label: "Retrieval Strategy", value: "Hybrid (Dense + BM25)" },
      { label: "Reranking", value: "Cross-Encoder (BGE)" },
      { label: "Vector Search", value: "Qdrant HNSW" }
    ],
    summary: "Production retrieval-augmented generation engine combining dense semantic vector search with BM25 keyword matching and cross-encoder reranking to accurately answer complex technical queries.",
    stack: [
      "Python 3.11",
      "LangChain",
      "Qdrant",
      "BM25Okapi",
      "Cross-Encoder Reranker",
      "FastAPI",
      "Docker"
    ],
    bullets: [
      "Hybrid Retrieval Fusion: Combines dense vector embeddings with exact BM25 keyword token scoring using Reciprocal Rank Fusion (RRF).",
      "Cross-Encoder Reranking: Re-evaluates top 20 candidate passages with a fine-tuned Cross-Encoder to guarantee relevance before prompt assembly.",
      "Hallucination Guard: Validates whether claims in generated answers are directly supported by retrieved chunks before presenting output.",
      "Sub-Second Latency: Implements HNSW vector index optimization with asynchronous parallel fetching for sub-500ms pipeline execution."
    ],
    diagram: {
      title: "Industrial Hybrid RAG Architecture",
      subtitle: "Dense embeddings, BM25 sparse index, Reciprocal Rank Fusion, and Cross-Encoder reranking",
      views: [
        {
          id: "rag-view",
          name: "Hybrid Retrieval Flow",
          shortName: "RAG Flow",
          title: "Hybrid Dense + Sparse RAG Pipeline",
          subtitle: "User Query -> Parallel Vector + BM25 Search -> Reciprocal Rank Fusion -> Cross-Encoder -> LLM Synthesis",
          viewBox: "0 0 1520 460",
          nodes: [
            { id: "r_in", label: "User Question / API", tech: "FastAPI Endpoint", x: 30, y: 195, width: 220, height: 74, step: 1, desc: "Ingests user question and extracts domain-specific search keywords." },
            { id: "r_dense", label: "Dense Vector Search", tech: "Qdrant (Cosine HNSW)", x: 310, y: 80, width: 235, height: 74, step: 2, desc: "Performs dense semantic similarity lookup against embedded technical knowledge base." },
            { id: "r_sparse", label: "BM25 Sparse Search", tech: "Exact Keyword Match", x: 310, y: 310, width: 235, height: 74, step: 2, desc: "Matches exact part numbers, technical codes, and acronyms that vectors often miss." },
            { id: "r_rrf", label: "Reciprocal Rank Fusion", tech: "RRF Scoring (k=60)", x: 610, y: 195, width: 235, height: 74, step: 3, desc: "Merges candidate rankings from both retrieval strategies into unified list." },
            { id: "r_rerank", label: "Cross-Encoder Reranker", tech: "Deep Context Rerank", x: 910, y: 195, width: 235, height: 74, step: 4, desc: "Deeply computes query-document interaction scores to isolate top 5 definitive passages." },
            { id: "r_out", label: "Grounded Synthesis", tech: "Context-Attributed LLM", x: 1210, y: 195, width: 235, height: 74, step: 5, desc: "Generates factually verified answer with direct document citation footnotes." }
          ],
          edges: [
            { from: "r_in", to: "r_dense", step: 2 },
            { from: "r_in", to: "r_sparse", step: 2 },
            { from: "r_dense", to: "r_rrf", step: 3 },
            { from: "r_sparse", to: "r_rrf", step: 3 },
            { from: "r_rrf", to: "r_rerank", step: 4 },
            { from: "r_rerank", to: "r_out", step: 5 }
          ]
        }
      ]
    }
  },
  {
    id: "cms-migration",
    slug: "cms-migration",
    title: "Refinery CMS to Camaleon CMS Automated Website Migration",
    company: "Sysvoy",
    badge: "Data Migration Pipeline",
    category: "automation",
    metrics: [
      { label: "Pages Migrated", value: "260+ Verified" },
      { label: "SEO Integrity", value: "100% Preserved" },
      { label: "Media Assets", value: "Zero Broken Links" }
    ],
    summary: "Automated large-scale crawler and ETL pipeline migrating 260+ pages from legacy Refinery CMS to Camaleon CMS while preserving full URL hierarchy, structured taxonomy, and SEO ranking metadata.",
    stack: [
      "Python 3.10",
      "Selenium WebDriver",
      "BeautifulSoup4",
      "PostgreSQL",
      "REST APIs",
      "Pandas"
    ],
    bullets: [
      "Automated Headless Crawling: Traversed 260+ dynamic pages using Selenium WebDriver and BeautifulSoup to extract clean HTML content.",
      "Taxonomy Normalization: Re-mapped legacy relational hierarchies, categories, author credits, and publication tags into target schema.",
      "SEO Route Preservation: Automatically verified URL slug redirects, canonical tags, Open Graph tags, and header hierarchies.",
      "Asset Pipeline: Downloaded, deduplicated, and re-hosted hundreds of legacy images and documents with zero dead link errors."
    ],
    diagram: {
      title: "Automated CMS Migration Pipeline",
      subtitle: "Headless crawler, DOM sanitizer, taxonomy mapper, and target CMS API ingestion",
      views: [
        {
          id: "migration-flow",
          name: "CMS Migration Pipeline",
          shortName: "Migration Flow",
          title: "Refinery to Camaleon CMS ETL Workflow",
          subtitle: "Target Site -> Headless Crawler -> DOM Sanitizer -> Taxonomy Normalizer -> Camaleon API",
          viewBox: "0 0 1200 420",
          nodes: [
            { id: "m_source", label: "Refinery CMS (Legacy)", tech: "260+ Production Pages", x: 30, y: 180, width: 200, height: 68, step: 1, desc: "Source legacy CMS hosting live business articles, media files, and nested pages." },
            { id: "m_crawl", label: "Selenium Crawler", tech: "Headless Web Scraping", x: 260, y: 180, width: 205, height: 68, step: 2, desc: "Traverses site tree, renders client-side elements, and dumps raw page snapshots." },
            { id: "m_clean", label: "DOM Sanitizer", tech: "BeautifulSoup4 / RegEx", x: 495, y: 180, width: 205, height: 68, step: 3, desc: "Strips inline legacy styles, scripts, and normalizes semantic HTML markup." },
            { id: "m_assets", label: "Media Asset Pipeline", tech: "Deduplication & Re-host", x: 730, y: 75, width: 215, height: 68, step: 4, desc: "Downloads and verifies all media assets, rewriting source URLs to new storage." },
            { id: "m_seo", label: "SEO & URL Governance", tech: "Slug & Meta Preservation", x: 730, y: 285, width: 215, height: 68, step: 4, desc: "Preserves URL routing, meta descriptions, and canonical headers for search rankings." },
            { id: "m_target", label: "Camaleon CMS Target", tech: "Automated REST API Seed", x: 975, y: 180, width: 195, height: 68, step: 5, desc: "Ingests structured pages and publishes migrated content with 100% integrity." }
          ],
          edges: [
            { from: "m_source", to: "m_crawl", step: 2 },
            { from: "m_crawl", to: "m_clean", step: 3 },
            { from: "m_clean", to: "m_assets", step: 4 },
            { from: "m_clean", to: "m_seo", step: 4 },
            { from: "m_assets", to: "m_target", step: 5 },
            { from: "m_seo", to: "m_target", step: 5 }
          ]
        }
      ]
    }
  }
];
