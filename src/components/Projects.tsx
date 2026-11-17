import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Shield,
  Activity,
  CheckCircle2,
  GitBranch
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';
import { Project } from '../types';

interface ProjectsProps {
  onOpenDiagram: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenDiagram }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'llm', label: 'LLMs & Multi-Agent' },
    { id: 'fullstack', label: 'Full-Stack & POS' },
    { id: 'automation', label: 'Automation Bots' },
    { id: 'ai', label: 'Computer Vision' }
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200/50 dark:border-indigo-800/50 mb-3">
            Featured Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Production Engineering Projects
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mt-2">
            Detailed architectures, system topologies, and real-world engineering metrics. Click <strong>"Explore Architecture"</strong> on any project to interact with its live pipeline flow.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mt-3" />
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={project.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col justify-between group"
            >
              <div>
                
                {/* Card Header: Company & Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-md border border-indigo-200/50 dark:border-indigo-800/50">
                    {project.company}
                  </span>
                  {project.badge && (
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {project.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>

                {/* Summary */}
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {project.summary}
                </p>

                {/* Metrics Row (if available) */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60 mb-5">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="flex flex-col">
                        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                          {metric.label}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono truncate">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.stack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Key Architectural Bullets */}
                <ul className="space-y-2 mb-6 text-sm text-slate-600 dark:text-slate-300">
                  {project.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Card Footer Actions */}
              <div className="pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
                <button
                  onClick={() => onOpenDiagram(project)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all hover:scale-[1.02]"
                >
                  <GitBranch className="w-4 h-4" />
                  <span>Explore Architecture</span>
                </button>

                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                  {project.diagram.views
                    ? `${project.diagram.views.length} Diagram Views`
                    : `${project.diagram.nodes?.length || 5} Pipeline Stages`}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
