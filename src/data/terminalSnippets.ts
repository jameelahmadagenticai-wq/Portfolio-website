import { TerminalSnippet } from '../types';

export const TERMINAL_SNIPPETS: Record<string, TerminalSnippet> = {
  langgraph: {
    tech: "langgraph",
    label: "LangGraph Multi-Agent",
    title: "orchestrator.py — Enterprise Multi-Agent Graph",
    code: `# LangGraph Multi-Agent Architecture
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated

class AgentState(TypedDict):
    query: str
    intent: str
    context: list[str]
    response: str
    memory_key: str

def router_agent(state: AgentState):
    """Classifies user intent and routes to specialized worker."""
    intent = classify_intent(state["query"])
    return {"intent": intent}

def route_next_node(state: AgentState):
    if state["intent"] == "analytical":
        return "analyst_agent"
    elif state["intent"] == "retrieval":
        return "rag_agent"
    return "utility_agent"

# Build graph topology with local air-gapped models
workflow = StateGraph(AgentState)
workflow.add_node("router", router_agent)
workflow.add_node("rag_agent", rag_agent_node)
workflow.add_node("analyst_agent", analyst_agent_node)
workflow.add_node("utility_agent", utility_agent_node)

workflow.set_entry_point("router")
workflow.add_conditional_edges("router", route_next_node)
workflow.add_edge("rag_agent", END)
workflow.add_edge("analyst_agent", END)

app = workflow.compile()`
  },
  rag: {
    tech: "rag",
    label: "Hybrid RAG Pipeline",
    title: "hybrid_search.py — Dense Embeddings + BM25 Reciprocal Rank",
    code: `import asyncio
from qdrant_client import AsyncQdrantClient
from rank_bm25 import BM25Okapi

async def hybrid_retrieve(query: str, collection: str, top_k: int = 5):
    # 1. Parallel execution: Vector dense search + BM25 sparse keyword
    dense_task = qdrant.search(
        collection_name=collection,
        query_vector=await embedder.aget_query_embedding(query),
        limit=top_k * 2
    )
    sparse_task = bm25_index.asearch(query, limit=top_k * 2)
    
    dense_hits, sparse_hits = await asyncio.gather(dense_task, sparse_task)
    
    # 2. Reciprocal Rank Fusion (RRF) scoring (k=60)
    fused_scores = {}
    for rank, doc in enumerate(dense_hits):
        fused_scores[doc.id] = fused_scores.get(doc.id, 0.0) + 1.0 / (60 + rank)
    for rank, doc in enumerate(sparse_hits):
        fused_scores[doc.id] = fused_scores.get(doc.id, 0.0) + 1.0 / (60 + rank)
        
    reranked_ids = sorted(fused_scores, key=fused_scores.get, reverse=True)[:top_k]
    return await fetch_hydrated_documents(reranked_ids)`
  },
  offline: {
    tech: "offline",
    label: "Offline-First Till (Saaz)",
    title: "outbox.ts — IndexedDB Durable Transactional Store",
    code: `// Offline-First Outbox Pattern (SnackUp OS)
import { openDB } from 'idb';

interface OutboxSale {
  idempotencyKey: string;
  tenantId: string;
  totalPaisa: number; // Integer paisa: zero float precision bugs
  items: CartItem[];
  timestamp: number;
  synced: boolean;
}

export async function recordSale(sale: OutboxSale): Promise<void> {
  const db = await openDB('snackup_pos', 2);
  
  // 1. Transactional write to local IndexedDB first
  await db.put('sales_outbox', {
    ...sale,
    synced: false,
    recordedAt: Date.now()
  });

  // 2. Trigger asynchronous background sync with idempotency check
  if (navigator.onLine) {
    window.dispatchEvent(new CustomEvent('pos:sync_outbox'));
  }
}`
  },
  cv: {
    tech: "cv",
    label: "Lip Reading (Conv3D+BiLSTM+CTC)",
    title: "lip_spatiotemporal_ctc.py — Conv3D + Bidirectional LSTM + CTC Decoder",
    code: `# 3D CNN + Bidirectional LSTM + CTC Silent Speech Decoder
import tensorflow as tf
from tensorflow.keras import layers, Model

def build_spatiotemporal_lip_model(input_shape=(20, 64, 64, 3), num_classes=50):
    inputs = layers.Input(shape=input_shape, name="mouth_frames_3d")
    
    # 1. 3D Convolutional Layers (Conv3D) to capture spatial & temporal dynamics
    x = layers.Conv3D(32, kernel_size=(3, 3, 3), padding="same", activation="relu")(inputs)
    x = layers.MaxPool3D(pool_size=(1, 2, 2))(x)
    x = layers.Conv3D(64, kernel_size=(3, 3, 3), padding="same", activation="relu")(x)
    x = layers.MaxPool3D(pool_size=(1, 2, 2))(x)
    
    # 2. Reshape into temporal sequence preserving frame dimension
    x = layers.TimeDistributed(layers.Flatten())(x)
    
    # 3. Bidirectional LSTM (BiLSTM) for past & future temporal phonetics
    x = layers.Bidirectional(layers.LSTM(128, return_sequences=True))(x)
    x = layers.Bidirectional(layers.LSTM(64, return_sequences=True))(x)
    
    # 4. Dense Projection Layer for Character / Word Logits
    y_pred = layers.Dense(num_classes + 1, activation="softmax", name="ctc_logits")(x)
    
    # 5. Model Output ready for CTC Loss & Beam Search Decoding
    return Model(inputs=inputs, outputs=y_pred, name="Conv3D_BiLSTM_CTC_Model")`
  },
  automation: {
    tech: "automation",
    label: "OpenClaw Video Pipeline",
    title: "video_assembly.py — Threaded Video Synthesis & Webhook Dispatch",
    code: `from moviepy.editor import VideoFileClip, AudioFileClip, CompositeVideoClip
from tenacity import retry, stop_after_attempt, wait_exponential
import requests

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def synthesize_and_upload(video_task: VideoTask) -> str:
    # 1. Load TTS voiceover + synced Whisper word timestamps
    audio = AudioFileClip(video_task.audio_path)
    video = VideoFileClip(video_task.bg_video_path).subclip(0, audio.duration)
    
    # 2. Render dynamic animated caption overlays
    subtitles = render_subtitles(video_task.captions, video.size)
    final_video = CompositeVideoClip([video, subtitles]).set_audio(audio)
    final_video.write_videofile(video_task.output_path, codec="libx264", audio_codec="aac")
    
    # 3. Cloud webhook dispatch to n8n / cloud storage
    with open(video_task.output_path, "rb") as f:
        res = requests.post(video_task.webhook_url, files={"video": f}, timeout=120)
        res.raise_for_status()
    return res.json()["file_url"]`
  }
};
