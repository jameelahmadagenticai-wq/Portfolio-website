import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Cpu,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { Project, DiagramView, DiagramNode } from '../types';

interface ArchitectureModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const views: DiagramView[] =
    project.diagram.views && project.diagram.views.length > 0
      ? project.diagram.views
      : [
          {
            id: 'default',
            name: 'Architecture Overview',
            shortName: 'Overview',
            title: project.diagram.title,
            subtitle: project.diagram.subtitle,
            viewBox: project.diagram.viewBox || '0 0 1100 440',
            nodes: project.diagram.nodes || [],
            edges: project.diagram.edges || []
          }
        ];

  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const activeView = views[activeViewIndex] || views[0];
  const nodes = activeView.nodes || [];
  const edges = activeView.edges || [];

  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [zoomScale, setZoomScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const totalSteps = Math.max(...nodes.map((n) => n.step), 1);

  // Auto-play step animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev >= totalSteps ? 1 : prev + 1));
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalSteps]);

  // Reset step when changing view
  useEffect(() => {
    setCurrentStep(1);
  }, [activeViewIndex]);

  // Active node details
  const activeNode = nodes.find((n) => n.step === currentStep) || nodes[0];

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => (prev <= 1 ? totalSteps : prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => (prev >= totalSteps ? 1 : prev + 1));
  };

  const handleReplay = () => {
    setCurrentStep(1);
    setIsPlaying(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={`bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100 transition-all ${
          isFullscreen
            ? 'w-full h-full rounded-none'
            : 'w-full max-w-6xl max-h-[92vh]'
        }`}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                {project.company}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white truncate max-w-md sm:max-w-xl">
                {activeView.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5 truncate max-w-lg">
              {activeView.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close Explorer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Switchable View Tabs (if multi-view) */}
        {views.length > 1 && (
          <div className="px-6 py-2 bg-slate-950/40 border-b border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {views.map((v, idx) => {
              const isActive = activeViewIndex === idx;
              return (
                <button
                  key={v.id}
                  onClick={() => setActiveViewIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {v.shortName || v.name}
                </button>
              );
            })}
          </div>
        )}

        {/* Controls Toolbar */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Play Flow'}</span>
            </button>

            <button
              onClick={handleReplay}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Replay from Step 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            <button
              onClick={handlePrev}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Step Counter Badge */}
            <div className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-indigo-300 font-semibold">
              Step <span className="text-white">{currentStep}</span> of {totalSteps}
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-slate-800/60 p-1 rounded-lg border border-slate-700/60">
              <button
                onClick={() => setZoomScale((z) => Math.max(0.7, z - 0.15))}
                className="p-1 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomScale(1)}
                className="px-2 py-0.5 text-[11px] hover:text-white"
                title="Reset Zoom"
              >
                {Math.round(zoomScale * 100)}%
              </button>
              <button
                onClick={() => setZoomScale((z) => Math.min(1.6, z + 0.15))}
                className="p-1 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive SVG Canvas Viewport */}
        <div className="flex-1 bg-slate-950 p-4 sm:p-6 overflow-auto flex items-center justify-center min-h-[300px] sm:min-h-[380px]">
          <div
            style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}
            className="transition-transform duration-200 w-full flex justify-center"
          >
            <svg
              viewBox={activeView.viewBox}
              className="w-full max-w-5xl h-auto select-none"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Arrowhead Marker */}
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#6366F1" />
                </marker>
                <marker
                  id="arrow-active"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
                </marker>
                {/* Glow Filter */}
                <filter id="node-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Render Connectors / Edges */}
              {edges.map((edge, idx) => {
                const fromNode = nodes.find((n) => n.id === edge.from);
                const toNode = nodes.find((n) => n.id === edge.to);
                if (!fromNode || !toNode) return null;

                const fromX = fromNode.x + (fromNode.width || 170);
                const fromY = fromNode.y + (fromNode.height || 64) / 2;
                const toX = toNode.x;
                const toY = toNode.y + (toNode.height || 64) / 2;

                const isPathActive = toNode.step <= currentStep;
                const isCurrentTransition = toNode.step === currentStep;

                const midX = fromX + (toX - fromX) / 2;
                const pathD = `M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`;

                return (
                  <g key={idx}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isPathActive ? '#6366F1' : '#334155'}
                      strokeWidth={isCurrentTransition ? 3 : isPathActive ? 2 : 1.5}
                      strokeDasharray={edge.dashed ? '4 4' : undefined}
                      markerEnd={isCurrentTransition ? 'url(#arrow-active)' : 'url(#arrow)'}
                      className="transition-colors duration-300"
                    />
                    {isCurrentTransition && (
                      <circle r="4" fill="#38BDF8">
                        <animateMotion path={pathD} dur="1.8s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Render Nodes */}
              {nodes.map((node) => {
                const width = node.width || 170;
                const height = node.height || 64;
                const isActive = node.step === currentStep;
                const isPassed = node.step < currentStep;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStep(node.step);
                    }}
                    className="cursor-pointer group"
                  >
                    {/* Active Halo / Glow */}
                    {isActive && (
                      <rect
                        width={width + 8}
                        height={height + 8}
                        x="-4"
                        y="-4"
                        rx="16"
                        fill="none"
                        stroke="#818CF8"
                        strokeWidth="2.5"
                        opacity="0.9"
                        filter="url(#node-glow)"
                      />
                    )}

                    {/* SVG Base Border */}
                    <rect
                      width={width}
                      height={height}
                      rx="12"
                      fill={isActive ? '#1E1B4B' : isPassed ? '#1E293B' : '#0F172A'}
                      stroke={isActive ? '#818CF8' : isPassed ? '#4F46E5' : '#334155'}
                      strokeWidth={isActive ? '2' : '1'}
                      className="transition-all duration-300 group-hover:stroke-indigo-400"
                    />

                    {/* HTML Content Container: 100% Contained, Never Overflows */}
                    <foreignObject
                      x="0"
                      y="0"
                      width={width}
                      height={height}
                      className="overflow-hidden rounded-xl pointer-events-none"
                    >
                      <div
                        className={`w-full h-full p-2.5 flex flex-col justify-between select-none transition-colors duration-300 ${
                          isActive
                            ? 'bg-gradient-to-br from-indigo-950/95 via-slate-900/95 to-indigo-900/40 text-white'
                            : isPassed
                            ? 'bg-slate-900/95 text-slate-100'
                            : 'bg-slate-950/90 text-slate-200 group-hover:bg-slate-900/90'
                        }`}
                      >
                        {/* Top: Step Badge + Label */}
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                              isActive
                                ? 'bg-indigo-500 text-white shadow-sm shadow-indigo-500/50'
                                : isPassed
                                ? 'bg-indigo-700 text-white'
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}
                          >
                            {node.step}
                          </span>
                          <span
                            className="text-xs font-bold tracking-tight truncate leading-tight"
                            title={node.label}
                          >
                            {node.label}
                          </span>
                        </div>

                        {/* Bottom: Tech Subtitle */}
                        <div className="min-w-0">
                          <span
                            className={`inline-block max-w-full text-[10px] font-mono px-2 py-0.5 rounded truncate leading-none ${
                              isActive
                                ? 'bg-indigo-900/90 text-indigo-200 border border-indigo-700/80 font-medium'
                                : 'bg-slate-900/80 text-slate-400 border border-slate-800'
                            }`}
                            title={node.tech}
                          >
                            {node.tech}
                          </span>
                        </div>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Detail Step Panel */}
        {activeNode && (
          <div className="px-6 py-4 bg-slate-900/90 border-t border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Step {activeNode.step}: {activeNode.label}
                </h4>
              </div>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-indigo-950/80 text-indigo-300 border border-indigo-800/80">
                {activeNode.tech}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              {activeNode.desc}
            </p>
          </div>
        )}

        {/* Extra Strips: Core Principles */}
        {project.diagram.corePrinciples && project.diagram.corePrinciples.length > 0 && (
          <div className="px-6 py-3 bg-slate-950 border-t border-slate-800/80 flex flex-wrap items-center gap-3 text-xs">
            <span className="font-mono text-slate-500 uppercase tracking-wider shrink-0 font-semibold">
              Core Principles:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {project.diagram.corePrinciples.map((cp, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
                >
                  <span className="font-semibold text-indigo-400">{cp.title}:</span>
                  <span className="text-slate-400">{cp.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
