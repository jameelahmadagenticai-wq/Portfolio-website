import React, { useState, useRef } from 'react';
import { X, Lock, Key, Upload, FileText, Image, RefreshCw, Check, AlertCircle } from 'lucide-react';
import { AdminCustomData } from '../hooks/useAdmin';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  customData: AdminCustomData;
  onLogin: (email: string, pass: string) => boolean;
  onLogout: () => void;
  onUpdatePhoto: (dataUrl: string) => void;
  onUpdateResume: (dataUrl: string, filename: string) => void;
  onUpdateBio: (bio1: string, bio2: string) => void;
  onUpdateTitles: (titles: string[]) => void;
  onReset: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  isAdmin,
  customData,
  onLogin,
  onLogout,
  onUpdatePhoto,
  onUpdateResume,
  onUpdateBio,
  onUpdateTitles,
  onReset
}) => {
  if (!isOpen) return null;

  // Login form states
  const [email, setEmail] = useState('jameelahmadagenticai@gmail.com');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Content edit states
  const [bio1, setBio1] = useState(customData.bioText1);
  const [bio2, setBio2] = useState(customData.bioText2);
  const [titlesText, setTitlesText] = useState(customData.titles.join('\n'));
  const [saveSuccess, setSaveSuccess] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(email, password);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setPassword('');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onUpdatePhoto(dataUrl);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onUpdateResume(dataUrl, file.name);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBioAndTitles = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBio(bio1, bio2);
    const parsedTitles = titlesText
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    onUpdateTitles(parsedTitles);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {isAdmin ? 'Admin Portfolio Control Panel' : 'Admin Sign-In'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAdmin
                  ? 'Authenticated as Jameel Ahmad • Live Client-Side Storage'
                  : 'Enter your credentials to update photos, resume & content'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 p-6 overflow-y-auto">
          {!isAdmin ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold border border-rose-200 dark:border-rose-800">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Incorrect email or password. Please try again.</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                  Admin Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all mt-2"
              >
                <Key className="w-4 h-4" />
                <span>Sign In as Admin</span>
              </button>
            </form>
          ) : (
            /* Logged-In Admin Management Panel */
            <div className="space-y-6">
              {saveSuccess && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Changes saved successfully to browser storage!</span>
                </div>
              )}

              {/* 1. Profile Photo Manager */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={customData.profilePhoto}
                      alt="Profile preview"
                      className="w-14 h-14 rounded-xl object-cover border-2 border-indigo-500 shadow-xs"
                    />
                    <div>
                      <h4 className="text-sm font-bold">Profile Photo</h4>
                      <p className="text-xs text-slate-500">
                        PNG / JPG (defaults to wst cover.png)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    >
                      <Image className="w-3.5 h-3.5" />
                      <span>Upload New Photo</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Resume / CV Manager */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">Curriculum Vitae (Resume)</h4>
                      <p className="text-xs text-slate-500 truncate max-w-[200px]">
                        Active: {customData.resumeFileName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      ref={resumeInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => resumeInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Resume PDF</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Bio & Titles Editor */}
              <form onSubmit={handleSaveBioAndTitles} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Job Titles (One per line for cycling hero banner)
                  </label>
                  <textarea
                    rows={4}
                    value={titlesText}
                    onChange={(e) => setTitlesText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    About Bio Paragraph 1
                  </label>
                  <textarea
                    rows={3}
                    value={bio1}
                    onChange={(e) => setBio1(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    About Bio Paragraph 2
                  </label>
                  <textarea
                    rows={3}
                    value={bio2}
                    onChange={(e) => setBio2(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Revert to Defaults</span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Content Edits</span>
                  </button>
                </div>
              </form>

              {/* Logout */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={onLogout}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  Logout from Admin Mode
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
