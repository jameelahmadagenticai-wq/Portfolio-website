import React from 'react';
import { ShieldCheck, Edit3, LogOut } from 'lucide-react';

interface AdminBarProps {
  isAdmin: boolean;
  onOpenModal: () => void;
  onLogout: () => void;
}

export const AdminBar: React.FC<AdminBarProps> = ({ isAdmin, onOpenModal, onLogout }) => {
  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 dark:bg-slate-950/90 text-white px-4 py-2.5 rounded-full border border-indigo-500/50 shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs font-mono animate-in slide-in-from-bottom-3 duration-300">
      <div className="flex items-center gap-1.5 text-indigo-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span className="font-bold">Admin Active</span>
      </div>

      <div className="h-3 w-px bg-slate-700" />

      <button
        onClick={onOpenModal}
        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>Manage Portfolio</span>
      </button>

      <button
        onClick={onLogout}
        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-slate-400 hover:text-rose-400 transition-colors"
        title="Logout Admin"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span>Exit</span>
      </button>
    </div>
  );
};
