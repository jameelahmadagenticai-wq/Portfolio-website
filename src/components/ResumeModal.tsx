import React, { useState } from 'react';
import {
  X,
  Download,
  ExternalLink,
  Printer,
  FileText,
  GraduationCap,
  Briefcase,
  Layers,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Github
} from 'lucide-react';
import { PROFILE_DATA, EXPERIENCES, EDUCATION } from '../data/profile';
import { SKILLS_DATA } from '../data/skills';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
  resumeFileName: string;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  resumeUrl,
  resumeFileName
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'interactive' | 'pdf'>('interactive');
  const isCustomPdf = resumeUrl && (resumeUrl.startsWith('data:') || resumeUrl.endsWith('.pdf'));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Curriculum Vitae — {PROFILE_DATA.name}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                AI/ML & Full-Stack Systems Engineer • Master's in CS (AI) & MSc (IT)
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {isCustomPdf && (
              <div className="hidden sm:flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-mono mr-2">
                <button
                  onClick={() => setActiveTab('interactive')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeTab === 'interactive'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Interactive CV
                </button>
                <button
                  onClick={() => setActiveTab('pdf')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeTab === 'pdf'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  PDF Document
                </button>
              </div>
            )}

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-xs"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            {/* Direct Download Button */}
            <a
              href={resumeUrl}
              download={resumeFileName}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/30 transition-all hover:scale-[1.02]"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
              title="Close Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto bg-slate-100 dark:bg-slate-950 p-4 sm:p-8 flex justify-center">
          {activeTab === 'pdf' && isCustomPdf ? (
            /* Render Uploaded PDF */
            <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden">
              <iframe
                src={resumeUrl}
                title="Jameel Ahmad Resume PDF"
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            /* Full High-End Interactive Digital CV */
            <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 print:p-0 print:border-0 print:shadow-none">
              
              {/* CV Header */}
              <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {PROFILE_DATA.name}
                  </h1>
                  <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                    AI/ML & Full-Stack Systems Engineer
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Specializing in Air-Gapped LLMs, LangGraph Multi-Agent Systems, and Offline-First POS
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-mono self-start">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{PROFILE_DATA.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-500" />
                    <a href={`mailto:${PROFILE_DATA.email}`} className="hover:underline">
                      {PROFILE_DATA.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{PROFILE_DATA.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                    <a href={PROFILE_DATA.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                      linkedin.com/in/mjameelahmad
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-slate-800 dark:text-slate-200" />
                    <a href={PROFILE_DATA.github} target="_blank" rel="noreferrer" className="hover:underline">
                      github.com/jameelahmadagenticai-wq
                    </a>
                  </div>
                </div>
              </div>

              {/* Education (Prominently Placed) */}
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-4 pb-1 border-b border-slate-200 dark:border-slate-800">
                  <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Educations & Academic Foundation</span>
                </h2>

                <div className="space-y-4">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {edu.degree}
                        </h3>
                        {edu.institution ? (
                          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                            {edu.institution}
                          </div>
                        ) : null}
                        {edu.specialization && (
                          <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                            {edu.specialization}
                          </div>
                        )}
                        {edu.grade && (
                          <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{edu.grade}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 shrink-0">
                        {edu.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Experience */}
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-4 pb-1 border-b border-slate-200 dark:border-slate-800">
                  <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Professional Work Experience</span>
                </h2>

                <div className="space-y-6">
                  {EXPERIENCES.map((exp, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                            {exp.role} — <span className="text-indigo-600 dark:text-indigo-400">{exp.company}</span>
                          </h3>
                        </div>
                        <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 shrink-0">
                          {exp.period} | {exp.location}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {exp.description}
                      </p>
                      <ul className="space-y-1">
                        {exp.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                            <span className="text-indigo-500 font-bold">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Technical Systems */}
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-4 pb-1 border-b border-slate-200 dark:border-slate-800">
                  <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Key Systems & Engineering Architecture</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Local Air-Gapped AI System
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 text-[11px] block mt-0.5">
                      LangGraph, Qdrant, Ollama (Qwen 2.5 / LLaMA 3), Zero Data Egress.
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Silent Speech Lip Decoder
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 text-[11px] block mt-0.5">
                      3D CNN (Conv3D) + Bidirectional LSTM + CTC Loss, MediaPipe Mesh.
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Saaz (SnackUp OS) POS & KDS
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 text-[11px] block mt-0.5">
                      IndexedDB Outbox, Forced PostgreSQL RLS, Integer Paisa Math.
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Sophia CISO GRC Platform
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 text-[11px] block mt-0.5">
                      180 Frameworks, 64,025 Controls, 116 Idempotent Python Patches.
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills Matrix */}
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono mb-3 pb-1 border-b border-slate-200 dark:border-slate-800">
                  Skills & Tooling Matrix
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {SKILLS_DATA.flatMap((s) => s.chips).map((chip, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
