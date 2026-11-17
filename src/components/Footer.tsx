import React from 'react';
import { ArrowUp, Github, Linkedin, MessageSquare, Mail } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white font-mono font-bold text-sm shadow-xs">
              JA
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                © {new Date().getFullYear()} {PROFILE_DATA.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                AI/ML & Full-Stack Systems Engineer • 100% Client-Side Architecture
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={PROFILE_DATA.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href={PROFILE_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-[#0A66C2] hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            <a
              href="https://wa.me/923086309698"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              title="WhatsApp Direct"
            >
              <MessageSquare className="w-5 h-5" />
            </a>

            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              title="Send Email"
            >
              <Mail className="w-5 h-5" />
            </a>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-900 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
