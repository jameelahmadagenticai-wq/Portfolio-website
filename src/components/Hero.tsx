import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Download,
  Linkedin,
  Github,
  MapPin,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  FileText,
  Play
} from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';
import { TERMINAL_SNIPPETS } from '../data/terminalSnippets';
import { AdminCustomData } from '../hooks/useAdmin';

interface HeroProps {
  customData: AdminCustomData;
  onOpenResume: () => void;
  onOpenVideo?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ customData, onOpenResume, onOpenVideo }) => {
  const titles = customData.titles && customData.titles.length > 0 ? customData.titles : PROFILE_DATA.titles;
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string>('langgraph');
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentTitle = titles[titleIndex % titles.length];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentTitle) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText((prev) =>
            isDeleting
              ? currentTitle.substring(0, prev.length - 1)
              : currentTitle.substring(0, prev.length + 1)
          );
        },
        isDeleting ? 30 : 65
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex, titles]);

  const activeSnippet = TERMINAL_SNIPPETS[selectedTech] || TERMINAL_SNIPPETS.langgraph;

  const photoSrc =
    customData.profilePhoto && !customData.profilePhoto.includes('image_')
      ? customData.profilePhoto
      : '/profile.png';

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(activeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Profile Card, Headline & Intro */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Professional Employee / Engineer Badge Card */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 p-3.5 pr-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md mb-6 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all group">
              
              {/* Profile Photo */}
              <div className="relative shrink-0">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-500 opacity-60 blur-xs group-hover:opacity-100 transition duration-300" />
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-900 border-2 border-white dark:border-slate-800 shadow-md">
                  {!imageError ? (
                    <img
                      src={photoSrc}
                      alt={PROFILE_DATA.name}
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white font-mono font-bold text-2xl">
                      JA
                    </div>
                  )}
                </div>
                {/* Active Indicator */}
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
                </span>
              </div>

              {/* Employee & Location Credentials */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-base">
                    {PROFILE_DATA.name}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    <ShieldCheck className="w-3 h-3 text-indigo-500" />
                    <span>AI Engineer @ Sysvoy</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>{PROFILE_DATA.location}</span>
                  <span>•</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    Available for Remote & Global
                  </span>
                </div>
              </div>

            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">{PROFILE_DATA.name}</span>
            </h1>

            {/* Cycling Subtitle */}
            <div className="h-14 sm:h-12 flex items-center mb-6">
              <span className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-200">
                {displayText}
                <span className="inline-block w-0.5 h-6 ml-1 bg-indigo-600 dark:bg-indigo-400 animate-pulse align-middle" />
              </span>
            </div>

            {/* Professional Summary */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
              {customData.bioText1}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-8">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all hover:scale-[1.02]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {onOpenVideo && (
                <button
                  type="button"
                  onClick={onOpenVideo}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-indigo-600 dark:fill-indigo-400" />
                  <span>Watch Intro</span>
                </button>
              )}

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
              >
                <FileText className="w-4 h-4 text-indigo-500" />
                <span>View Resume</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-800 transition-all"
              >
                Contact Me
              </a>
            </div>

            {/* Professional Profile Social Buttons */}
            <div className="flex items-center gap-3 pt-2 border-t border-slate-200/80 dark:border-slate-800/80 w-full">
              <span className="text-xs font-mono font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Direct Profiles:
              </span>

              {/* LinkedIn Pill Button */}
              <a
                href={PROFILE_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0A66C2] bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/30 transition-all"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>

              {/* GitHub Pill Button */}
              <a
                href={PROFILE_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repos</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Terminal Previewer */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden backdrop-blur-xl">
              
              {/* Terminal Window Header */}
              <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block" />
                  <span className="ml-2 font-mono text-xs text-slate-400 truncate max-w-[210px] sm:max-w-xs">
                    {activeSnippet.title}
                  </span>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
                  title="Copy snippet"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Technology Tabs */}
              <div className="px-3 py-2 bg-slate-900/40 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
                {Object.entries(TERMINAL_SNIPPETS).map(([key, item]) => {
                  const isActive = selectedTech === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedTech(key)}
                      className={`px-2.5 py-1 rounded-md font-mono whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white font-medium shadow-xs'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {/* Code Display Area */}
              <div className="p-4 overflow-x-auto max-h-[360px] scrollbar-thin scrollbar-thumb-slate-800">
                <pre className="font-mono text-xs text-slate-200 leading-relaxed">
                  <code>{activeSnippet.code}</code>
                </pre>
              </div>

              {/* Terminal Footer Indicator */}
              <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3 h-3 text-indigo-400" />
                  <span>Production Tested Snippet</span>
                </div>
                <span>Client-Side Verified</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
