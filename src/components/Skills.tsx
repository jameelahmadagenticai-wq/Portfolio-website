import React, { useState } from 'react';
import { Bot, BrainCircuit, Server, Database, Workflow, Layout, ShieldCheck } from 'lucide-react';
import { SKILLS_DATA } from '../data/skills';
import { SkillItem } from '../types';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Bot,
  BrainCircuit,
  Server,
  Database,
  Workflow,
  Layout,
  ShieldCheck
};

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'ai', label: 'LLMs & AI' },
    { id: 'backend', label: 'Backend & Databases' },
    { id: 'devops', label: 'DevOps & Automation' },
    { id: 'frontend', label: 'Frontend & Architecture' }
  ];

  const filteredSkills: SkillItem[] =
    activeCategory === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200/50 dark:border-indigo-800/50 mb-3">
            Core Competencies
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Technical Skills & Tooling
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mt-2">
            Categorized overview of engineering frameworks, machine learning models, and production tools applied across real-world deployments.
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

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => {
            const Icon = iconMap[skill.iconName] || Bot;
            return (
              <div
                key={skill.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {skill.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {skill.chips.map((chip, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{skill.chips.length} Technologies</span>
                  <span className="text-indigo-600 dark:text-indigo-400">Production Verified</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
