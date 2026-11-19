import React, { useState } from 'react';
import {
  Globe,
  Award,
  Briefcase,
  Layers,
  CheckCircle2,
  Shield,
  Cpu,
  RefreshCw,
  GraduationCap,
  Calendar,
  Sparkles,
  BookOpen,
  Film
} from 'lucide-react';
import { PROFILE_DATA, EDUCATION } from '../data/profile';
import { AdminCustomData } from '../hooks/useAdmin';

interface AboutProps {
  customData: AdminCustomData;
}

export const About: React.FC<AboutProps> = ({ customData }) => {
  const [selectedDegree, setSelectedDegree] = useState<number>(0);

  const stats = [
    {
      value: `${PROFILE_DATA.stats.experienceYears}+`,
      label: "Years Experience",
      desc: "Delivering production AI & full-stack systems",
      icon: Award
    },
    {
      value: `${PROFILE_DATA.stats.projectsCount}`,
      label: "Major Systems Built",
      desc: "From air-gapped LLMs to POS & KDS",
      icon: Layers
    },
    {
      value: `${PROFILE_DATA.stats.companiesCount}`,
      label: "Tech Companies",
      desc: "Sysvoy (AI Engineer) & InvoZone",
      icon: Briefcase
    },
    {
      value: `${PROFILE_DATA.stats.pagesMigrated}+`,
      label: "Pages Migrated",
      desc: "Automated ETL & headless crawling",
      icon: RefreshCw
    }
  ];

  const pillars = [
    {
      title: "Zero Data Egress & Air-Gapped Security",
      desc: "Engineering high-security LLM pipelines running strictly on local hardware with Ollama, Qdrant, and LangGraph without internet egress.",
      icon: Shield
    },
    {
      title: "Forced PostgreSQL Row-Level Security (RLS)",
      desc: "Ensuring zero cross-tenant leakage at the PostgreSQL engine level, combining immutable audit trails with integer paisa accounting.",
      icon: CheckCircle2
    },
    {
      title: "Offline-First Distributed Systems",
      desc: "Designing resilient browser outboxes with IndexedDB, Service Workers, and real-time station-routed WebSocket displays.",
      icon: Cpu
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200/50 dark:border-indigo-800/50 mb-3">
            Academic & Professional Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            About Me
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mt-3" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Bio Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                {customData.bioText1}
              </p>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {customData.bioText2}
              </p>

              {/* Language Proficiency Pills */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Globe className="w-4 h-4 text-indigo-500" />
                  <span className="font-medium">Languages:</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  <span>English:</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">Professional</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  <span>Urdu:</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">Native</span>
                </div>
              </div>
            </div>

            {/* Core Architectural Pillars */}
            <div className="grid grid-cols-1 gap-3.5">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
                >
                  <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Intro Video Player & Statistics Grid */}
          <div className="lg:col-span-5 space-y-6">
            {/* Intro Video Player Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                    <Film className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Video Introduction
                  </h4>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800">
                  HD Video
                </span>
              </div>
              
              <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video group shadow-inner">
                <video
                  src="/intro.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>This video is generated by AI with my own voice.</span>
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-[11px]">
                  Play with sound
                </span>
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col justify-between group"
                >
                  <div className="p-3 w-fit rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-105 transition-transform">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                      {stat.label}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* PROMINENT INTERACTIVE EDUCATIONS SHOWCASE (LIGHT & DARK ADAPTIVE) */}
        <div className="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm dark:shadow-xl backdrop-blur-md">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30 shrink-0">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Verified Academic Credentials
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Educations
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Double Master's Degrees in Computer Science & Information Technology
                </p>
              </div>
            </div>

            {/* Quick Degree Selector Tabs */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
              {EDUCATION.map((edu, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDegree(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    selectedDegree === idx
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {idx === 0 ? 'MS CS (AI)' : 'MSc (IT)'}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Degree Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION.map((edu, idx) => {
              const isSelected = selectedDegree === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDegree(idx)}
                  className={`cursor-pointer rounded-2xl p-6 sm:p-8 border transition-all duration-300 relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-600 dark:border-indigo-400 shadow-md ring-2 ring-indigo-500/20'
                      : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/60'
                  }`}
                >
                  {/* Top Badge & Period */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                        idx === 0
                          ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/40'
                          : 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/40'
                      }`}>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{idx === 0 ? 'Master of Science (AI Focus)' : 'Master of Science (IT)'}</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-2xs">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>{edu.period}</span>
                      </span>
                    </div>

                    {/* Degree Title */}
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1.5 tracking-tight">
                      {edu.degree}
                    </h4>

                    {/* Institution (if any) */}
                    {edu.institution ? (
                      <div className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span>{edu.institution}</span>
                      </div>
                    ) : null}

                    {/* Specialization & Core Knowledge */}
                    {edu.specialization && (
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {edu.specialization}
                      </p>
                    )}
                  </div>

                  {/* Highlights Bullet */}
                  {edu.grade && (
                    <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 text-xs sm:text-sm font-mono text-slate-700 dark:text-indigo-200 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="font-medium">{edu.grade}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
