import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DEVELOPER_QUOTES, TECH_STACK } from '../data/portfolioData';
import { Copy, Check, ChevronRight, Quote, Sparkles, GraduationCap, Code2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'database' | 'devops'>('all');

  const currentQuote = DEVELOPER_QUOTES[quoteIdx];
  const quoteText = language === 'km' ? currentQuote.quoteKm : currentQuote.quote;

  const handleNextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % DEVELOPER_QUOTES.length);
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(`"${quoteText}" — ${currentQuote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredSkills =
    activeTab === 'all'
      ? TECH_STACK
      : TECH_STACK.filter((s) => s.category === activeTab);

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20 relative">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-full">
          {t('about.story')}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Narrative & Experience */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {t('about.title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
              {t('about.titleEm')}
            </span>
          </h2>

          <div className="space-y-4 text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
            <p>{t('about.p1')}</p>
            <p className="text-zinc-400">{t('about.p2')}</p>
          </div>

          {/* Education & Focus Callouts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                  EDUCATION · PHNOM PENH
                </span>
                <span className="text-sm font-semibold text-white">
                  SETEC Institute (B.Sc. CS 2025 — Present)
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Code2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                  {t('about.focusTag')}
                </span>
                <span className="text-sm font-semibold text-white">
                  {t('about.focusVal')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quote Switcher & Tech Matrix */}
        <div className="lg:col-span-6 space-y-6">
          {/* Interactive Developer Quote Card */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider">
                {t('about.quoteTag')}
              </span>
              <Quote className="w-5 h-5 text-zinc-600" />
            </div>

            <p className="text-base sm:text-lg text-zinc-200 font-medium italic leading-relaxed mb-4 min-h-[70px]">
              "{quoteText}"
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
              <span className="text-xs font-mono text-zinc-400">
                — {currentQuote.author}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyQuote}
                  type="button"
                  className="p-1.5 rounded-lg text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                  title={t('about.copyQuote')}
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[11px]">{copied ? t('about.quoteCopied') : t('about.copyQuote')}</span>
                </button>

                <button
                  onClick={handleNextQuote}
                  type="button"
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{t('about.nextQuote')}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Tech Stack Matrix with Filter Tabs */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                // VERIFIED TOOLCHAIN & STACK
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(['all', 'frontend', 'backend', 'database', 'devops'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  type="button"
                  className={`px-3 py-1 rounded-full text-xs font-mono capitalize transition-colors cursor-pointer ${
                    activeTab === tab
                      ? 'bg-cyan-400 text-black font-semibold'
                      : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-zinc-200 truncate">
                      {skill.name}
                    </span>
                    {skill.featured && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-cyan-400/90">{skill.level}</span>
                    <span className="text-zinc-500 capitalize">{skill.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
