import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUp, Heart, Code2 } from 'lucide-react';
import { CambodiaFlag } from './Flags';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20 border-t border-white/[0.08] relative">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Info */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center font-mono font-bold text-[10px] text-cyan-300">
              ML
            </div>
            <span className="text-sm font-semibold text-white tracking-tight">
              Chab Mongleng
            </span>
          </div>

          <span className="hidden sm:inline text-zinc-600">|</span>

          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <CambodiaFlag className="w-3.5 h-2.5" />
            <span>Phnom Penh, Cambodia</span>
          </div>
        </div>

        {/* Center Copyright */}
        <div className="text-center text-xs font-mono text-zinc-500">
          © 2026 Chab Mongleng. {t('footer.rights')}
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          type="button"
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
        >
          <span>{t('footer.backToTop')}</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
