import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
  Send,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  Inbox
} from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

interface StoredMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [storedMessages, setStoredMessages] = useState<StoredMessage[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_inbox');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const generateWhatsAppLink = () => {
    const text = `Hi Jameel, my name is ${name || '[Name]'}.\n\nSubject: ${subject || 'Project Inquiry'}\nEmail: ${email || '[Email]'}\n\nMessage:\n${message || 'I would like to discuss an opportunity.'}`;
    return `https://wa.me/923086309698?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      alert('Please enter your name and a brief message.');
      return;
    }

    // Save locally
    const newEntry: StoredMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toLocaleString()
    };

    const updated = [newEntry, ...storedMessages];
    setStoredMessages(updated);
    localStorage.setItem('portfolio_inbox', JSON.stringify(updated));

    // Open WhatsApp
    window.open(generateWhatsAppLink(), '_blank');
  };

  const handleCopyText = async () => {
    const text = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearInbox = () => {
    setStoredMessages([]);
    localStorage.removeItem('portfolio_inbox');
  };

  const handleAddSampleInquiry = () => {
    const sample: StoredMessage = {
      id: Date.now().toString(),
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@enterprise-ai.io',
      subject: 'Air-Gapped LLM Deployment Contract',
      message: 'Hi Jameel, we are looking for an AI engineer to architect a local Qdrant + LangGraph pipeline for our isolated intranet. Would love to schedule a technical discovery call.',
      timestamp: new Date().toLocaleString()
    };
    const updated = [sample, ...storedMessages];
    setStoredMessages(updated);
    localStorage.setItem('portfolio_inbox', JSON.stringify(updated));
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200/50 dark:border-indigo-800/50 mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Contact & Consultation
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mt-2">
            Reach out directly for freelance contracts, full-time engineering roles, or technical advisory. All form submissions can be dispatched instantly via WhatsApp.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Direct Highlight */}
            <a
              href="https://wa.me/923086309698"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  WhatsApp (Direct Chat)
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <span>+92 308-6309698</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-300">
                  Instant response for global clients
                </div>
              </div>
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Email Address</div>
                <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white break-all">
                  {PROFILE_DATA.email}
                </div>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={PROFILE_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-[#0A66C2] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Linkedin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">LinkedIn Profile</div>
                <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <span>linkedin.com/in/mjameelahmad</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0A66C2]" />
                </div>
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href={PROFILE_DATA.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Github className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">GitHub Repositories</div>
                <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <span>github.com/jameelahmadagenticai-wq</span>
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                </div>
              </div>
            </a>

            {/* Phone & Location Info */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <Phone className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Direct Call</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono">
                  {PROFILE_DATA.phone}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Base Location</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {PROFILE_DATA.location}
                </div>
              </div>
            </div>

            {/* In-Browser Stored Messages Badge / Button */}
            <div className="pt-2">
              <button
                onClick={() => setInboxOpen(true)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-indigo-500" />
                  <span>Client-Side Inquiries Store</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold">
                  {storedMessages.length} Stored
                </span>
              </button>
            </div>

          </div>

          {/* Right: Client-Side WhatsApp Dispatch Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 mb-6">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-1">
                <Check className="w-4 h-4" />
                <span>Instant WhatsApp Dispatch Enabled</span>
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-300">
                No backend email delays. Fill in your details below and hit <strong>"Send via WhatsApp"</strong> to dispatch your formatted message straight to Jameel's direct phone.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Henderson"
                    required
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@enterprise.com"
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Subject / Project Type
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Air-Gapped AI System / Full-Stack POS Contract"
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your technical needs, timeline, or engineering opportunity..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all hover:scale-[1.01]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyText}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
                  title="Copy text to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>
            </form>

          </div>

        </div>

        {/* Local Inbox Modal for Testing / Review */}
        {inboxOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setInboxOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Client-Side Inquiries Store
                  </h3>
                  <p className="text-xs text-slate-500">
                    Saved durably in your browser's local storage with zero server requirement.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddSampleInquiry}
                    className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800"
                  >
                    + Sample
                  </button>
                  <button
                    onClick={() => setInboxOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {storedMessages.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-sm">
                    No stored inquiries yet. Submissions from the form will appear here.
                  </div>
                ) : (
                  storedMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {msg.name} ({msg.email || 'No email provided'})
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">{msg.timestamp}</span>
                      </div>
                      <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        {msg.subject}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        {msg.message}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {storedMessages.length > 0 && (
                <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={handleClearInbox}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  >
                    Clear All Inquiries
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
