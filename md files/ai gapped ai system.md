# Local Air-Gapped AI System

Enterprise-grade offline AI platform with:

* RAG pipelines
* LangGraph multi-agent orchestration
* Qdrant vector search
* Redis/PostgreSQL memory
* Ollama local inference
* FastAPI backend
* Streamlit testing interface
* Zero data egress architecture

---

# Agent Orchestration Architecture

## Overview

This module implements the enterprise multi-agent orchestration layer using LangGraph.

The orchestration layer sits above the existing RAG and memory systems and is responsible for:

* task routing
* agent coordination
* workflow execution
* state sharing
* memory-aware interactions
* multi-step reasoning

The system is designed for:

* local air-gapped deployment
* CPU-first development
* future GPU/Linux migration
* model-swappable architecture
* enterprise scalability
* zero data egress

---

# High-Level Architecture

```text
User Query
    ↓
Streamlit UI / FastAPI
    ↓
LangGraph Orchestrator
    ↓
Specialized Agents
    ├── RAG Agent
    ├── Analyst Agent
    ├── Utility Agent
    └── Memory Agent
    ↓
Existing Enterprise Services
    ├── retriever.py
    ├── context_builder.py
    ├── rag_chain.py
    ├── memory_manager.py
    └── qdrant_service.py
    ↓
Ollama / Future vLLM
```

---

# Agent Roles

## 1. Orchestrator Agent

### Purpose

Main workflow controller.

Routes tasks based on:

* query intent
* reasoning complexity
* conversational context
* memory requirements

### Development Model

```text
qwen2.5:3b
```

### Future Production Model

```text
llama3:70b
```

### Responsibilities

* task classification
* workflow planning
* agent routing
* response coordination
* orchestration control

---

## 2. RAG Agent

### Purpose

Handles enterprise retrieval workflows.

Uses:

* retriever.py
* context_builder.py
* rag_chain.py

### Development Model

```text
qwen2.5:3b
```

### Future Production Model

```text
llama3:8b
```

### Responsibilities

* semantic retrieval
* grounded QA
* source attribution
* retrieval validation
* context-aware responses

---

## 3. Analyst Agent

### Purpose

Handles reasoning-heavy analytical tasks.

### Development Model

```text
qwen2.5:3b
```

### Future Production Model

```text
mistral:7b
```

### Responsibilities

* comparisons
* analytical reasoning
* evaluations
* trend analysis
* multi-step reasoning

---

## 4. Utility Agent

### Purpose

Handles lightweight utility workflows.

### Development Model

```text
phi3
```

### Future Production Model

```text
phi4
```

### Responsibilities

* summarization
* formatting
* rewriting
* cleanup
* normalization

---

## 5. Memory Agent

### Purpose

Handles memory retrieval and memory coordination.

Uses:

* MemoryManager
* Redis short-term memory
* PostgreSQL long-term memory
* pgvector semantic memory

### Responsibilities

* context retrieval
* memory injection
* memory search
* session continuity
* user context enrichment

---

# Shared Agent State

Agents communicate using shared LangGraph state.

## Core State Fields

```python
class AgentState(TypedDict):
    input: str
    task_type: str
    current_agent: str
    context: dict
    memory: dict
    retrieved_chunks: list
    retrieval_debug: list
    output: str
```

---

# Design Principles

## 1. Modular Architecture

Agents remain isolated and reusable.

## 2. Model Swappability

Models can be changed via configuration without modifying agent logic.

## 3. Existing System Compatibility

The orchestration layer reuses:

* existing RAG pipeline
* existing MemoryManager
* existing vector services

No duplicate retrieval or memory systems should be created.

## 4. Future GPU Compatibility

Architecture remains compatible with:

* Ollama GPU
* vLLM
* tensor parallelism
* distributed inference

## 5. Enterprise Safety

Future versions will support:

* human-in-the-loop checkpoints
* approval workflows
* sensitive operation validation

---

# Project Structure

```text
local-airgap-llm/
│
├── app/
│   ├── agents/
│   ├── rag/
│   ├── memory/
│   ├── vectorstore/
│   ├── llm/
│   ├── monitoring/
│   └── ui/
│
├── backend/
├── docs/
├── tests/
├── scripts/
├── docker-compose.dev.yml
├── requirements.txt
└── README.md
```

---

# Core Technologies

| Component                   | Technology         |
| --------------------------- | ------------------ |
| Orchestration               | LangGraph          |
| LLM Framework               | LangChain          |
| Vector Database             | Qdrant             |
| Memory                      | Redis + PostgreSQL |
| API Layer                   | FastAPI            |
| UI                          | Streamlit          |
| Local Models                | Ollama             |
| Future Production Inference | vLLM               |

---

# Development Environment

## Current Development

* Windows 11
* CPU-first inference
* Docker Compose
* Ollama
* Streamlit
* FastAPI

## Future Production

* Linux GPU servers
* CUDA
* vLLM
* distributed orchestration
* tensor parallelism

---

# Installation And Local Run

These steps are for a fresh clone on another machine.

## 1. Install Required Software

Install these first:

* Git
* Docker Desktop
* VS Code
* VS Code Dev Containers extension

Python does not need to be installed manually if you use the Dev Container. The project container uses Python 3.11 from `.devcontainer/devcontainer.json`.

## 2. Clone Repository

```bash
git clone https://github.com/sem-naq/air-gapped-ai.git
cd air-gapped-ai
```

## 3. Create `.env`

Create a `.env` file in the project root:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
REDIS_PASSWORD=redis_password
QDRANT_API_KEY=
ADMIN_EMAIL=admin@local
ADMIN_PASSWORD=change_this_password
```

Do not commit the real `.env` file to GitHub.

## 4. Start Docker Services

```bash
docker compose -f docker-compose.dev.yml up -d
```

This starts the app container, Ollama, Qdrant, PostgreSQL, Redis, and pgAdmin. The Docker network is created automatically by Docker Compose.

Check containers:

```bash
docker ps
```

## 5. Open Dev Container

Open the project in VS Code, then run:

```text
Dev Containers: Reopen in Container
```

This opens a Linux terminal inside the Python 3.11 development container.

## 6. Install Python Dependencies

Run this inside the Dev Container terminal:

```bash
pip install -r requirements.txt
```

## 7. Pull Ollama Models Inside Docker

Run these from the normal host terminal after Docker services are up:

```bash
docker exec -it ollama ollama pull qwen2.5:3b
docker exec -it ollama ollama pull nomic-embed-text
```

Optional development models:

```bash
docker exec -it ollama ollama pull phi3
docker exec -it ollama ollama pull mistral:7b
```

Verify models:

```bash
docker exec -it ollama ollama list
```

## 8. Run FastAPI Backend

Run this inside the Dev Container terminal:

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Open:

```text
http://localhost:8000/docs
```

## 9. Run Streamlit UI

Open a second Dev Container terminal and run:

```bash
streamlit run app/ui/streamlit_app.py --server.port 8501 --server.address 0.0.0.0
```

Open:

```text
http://localhost:8501
```

## Stop Docker Services

```bash
docker compose -f docker-compose.dev.yml down
```

---

# Required Services

| Service    | Port  |
| ---------- | ----- |
| FastAPI    | 8000  |
| Streamlit  | 8501  |
| Qdrant     | 6333  |
| Ollama     | 11434 |
| PostgreSQL | 5432  |
| Redis      | 6379  |

---

# Qdrant Dashboard

```text
http://localhost:6333/dashboard
```

---

# API Endpoints

| Endpoint          | Purpose              |
| ----------------- | -------------------- |
| /models/status    | Model health         |
| /models/config    | Active models        |
| /rag/query        | RAG pipeline         |
| /agents/run       | Multi-agent workflow |
| /documents/upload | Document ingestion   |

---

# Workflow Overview

## RAG Flow

```text
User Query
    ↓
Retriever
    ↓
Qdrant Search
    ↓
Context Builder
    ↓
LLM Generation
    ↓
Grounded Response
```

---

## Agent Flow

```text
User Query
    ↓
Orchestrator
    ↓
Task Classification
    ↓
Specialized Agent
    ↓
Memory + Retrieval
    ↓
Final Response
```

---

# Current Features

* LangGraph orchestration
* shared agent state
* semantic retrieval
* contextual memory
* retrieval debugging
* model routing
* Streamlit testing UI
* FastAPI backend integration
* Qdrant vector search
* Redis/PostgreSQL memory architecture

---

# Planned Future Enhancements

## Retrieval Improvements

* hybrid retrieval
* rerankers
* contextual compression
* adaptive chunking

## Agent Improvements

* tool calling
* planner-executor workflows
* async parallel agents
* autonomous retries

## Infrastructure Improvements

* distributed workers
* observability dashboards
* GPU scheduling
* tracing and telemetry

---

# Important Architectural Rule

LangGraph is an orchestration layer.

It coordinates the enterprise RAG stack instead of replacing it.

The orchestration system must reuse:

* retriever.py
* memory_manager.py
* qdrant_service.py
* rag_chain.py

No duplicate retrieval or memory systems should be introduced.

---

# Security Goals

* zero data egress
* fully local inference
* air-gapped deployment
* no external API dependency
* enterprise-safe architecture

---

# Recommended Startup Order

```text
1. Docker Services
2. Ollama Models
3. Qdrant
4. FastAPI Backend
5. Streamlit UI
```

---

# python version recmended

 ### 3.11



# Verification Checklist

## Backend Health
#### uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```text
http://localhost:8000/docs
```

## Streamlit UI
#### streamlit run app/ui/streamlit_app.py --server.port 8501 --server.address 0.0.0.0
```text
http://localhost:8501
```

## Qdrant Dashboard

```text
http://localhost:6333/dashboard
```

## Ollama API

```text
http://localhost:11434
```

---

# Final Goal

A fully offline enterprise AI platform with:

* RAG pipelines
* memory systems
* multi-agent orchestration
* local LLM inference
* enterprise deployment readiness
* future GPU scalability
