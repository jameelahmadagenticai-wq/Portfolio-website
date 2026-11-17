import React from 'react';
import { Briefcase, Calendar, GraduationCap, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES, EDUCATION } from '../data/profile';

interface ExperienceProps {
  onSelectProject?: (projectId: string) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onSelectProject }) => {
  return (
    <section id="experience" className="py-20 md:py-28 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200/50 dark:border-indigo-800/50 mb-3">
            Career Track
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Work Experience & Education
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mt-2">
            Track record of shipping AI infrastructure, multi-tenant cloud platforms, and data pipelines.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mt-3" />
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-200 dark:border-indigo-900/60 space-y-12">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="relative group">
                
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white dark:border-slate-950 group-hover:scale-125 transition-transform shadow-xs" />

                {/* Experience Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
                  
                  {/* Period & Company Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-800/50">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {exp.location}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {exp.role}
                  </h3>
                  <div className="text-base font-semibold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{exp.company}</span>
                  </div>

                  {exp.description && (
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {/* Highlights */}
                  <ul className="space-y-2.5 mb-6">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Associated Projects */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
                      Associated Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {exp.associatedProjects.map((proj) => (
                        <a
                          key={proj.id}
                          href={`#${proj.id}`}
                          onClick={(e) => {
                            if (onSelectProject) {
                              e.preventDefault();
                              onSelectProject(proj.id);
                            }
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/60 dark:border-indigo-800/60 transition-colors"
                        >
                          <span>{proj.name}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Academic Education Cards */}
          <div className="pt-6 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Advanced Academic Qualifications</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-indigo-400 dark:hover:border-indigo-600 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
                        {idx === 0 ? 'Master of Science' : 'M.Sc. IT'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{edu.period}</span>
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                      {edu.degree}
                    </h4>
                    {edu.institution ? (
                      <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                        {edu.institution}
                      </div>
                    ) : null}
                    {edu.specialization && (
                      <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                        {edu.specialization}
                      </div>
                    )}
                  </div>

                  {edu.grade && (
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{edu.grade}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
