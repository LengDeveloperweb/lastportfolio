import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Copy, Check, MapPin, Clock, Send, Github, SendHorizonal } from 'lucide-react';
import { CambodiaFlag } from './Flags';

export const ContactSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('monglengchab@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20 relative">
      <div className="mb-12 text-center sm:text-left">
        <span className="inline-block text-xs font-mono font-semibold tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-full mb-3">
          {t('contact.tag')}
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2">
          {t('contact.title')}
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          {t('contact.sub')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden">
          {submitted && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-3">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{t('contact.success')}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                  {t('contact.name')} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('contact.namePlaceholder')}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                  {t('contact.email')} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t('contact.emailPlaceholder')}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                {t('contact.subject')}
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder={t('contact.subjectPlaceholder')}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                {t('contact.message')} *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t('contact.messagePlaceholder')}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-cyan-400 text-black font-semibold text-sm hover:bg-cyan-300 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? t('contact.sending') : t('contact.send')}</span>
            </button>
          </form>
        </div>

        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Email Copy Card */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                  DIRECT EMAIL
                </span>
                <span className="text-sm font-semibold text-white font-mono truncate block">
                  monglengchab@gmail.com
                </span>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              type="button"
              className="px-3 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-zinc-200 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
              title="Copy Email"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t('contact.copied') : t('contact.copyEmail')}</span>
            </button>
          </div>

          {/* Location Card */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-zinc-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                LOCATION
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <CambodiaFlag className="w-4 h-3" />
                <span className="text-sm font-semibold text-white">
                  {t('contact.location')}
                </span>
              </div>
            </div>
          </div>

          {/* Response Window Card */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                AVAILABILITY
              </span>
              <span className="text-sm font-semibold text-zinc-200">
                {t('contact.responseWindow')}
              </span>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-4">
              // CONNECT ON EXTERNAL CHANNELS
            </span>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://github.com/LengDeveloperweb"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center gap-2 text-xs font-mono text-zinc-200 hover:text-white transition-colors group"
              >
                <Github className="w-4 h-4 text-zinc-300 group-hover:text-white shrink-0" />
                <span className="truncate">LengDeveloperweb</span>
              </a>

              <a
                href="https://t.me/lengdeveloper"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center gap-2 text-xs font-mono text-zinc-200 hover:text-white transition-colors group"
              >
                <SendHorizonal className="w-4 h-4 text-sky-400 group-hover:text-sky-300 shrink-0" />
                <span className="truncate">@lengdeveloper</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
