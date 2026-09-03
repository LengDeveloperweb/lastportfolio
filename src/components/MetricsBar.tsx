import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { METRICS } from '../data/portfolioData';
import { Terminal, Globe, Layers, Zap } from 'lucide-react';

export const MetricsBar: React.FC = () => {
  const { t, language } = useLanguage();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-cyan-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-sky-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-amber-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-emerald-400" />;
      default:
        return <Zap className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="metrics" className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/40">
          {t('metrics.tag')}
        </span>
      </div>

      {/* 4-Card Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric, idx) => {
          const label = language === 'km' ? metric.labelKm : metric.labelEn;
          const sub = language === 'km' ? metric.subKm : metric.subEn;

          return (
            <div
              key={idx}
              className="relative group p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm"
            >
              {/* Subtle card top glow */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent group-hover:via-cyan-400/50 transition-all" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {metric.val}
                </span>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] group-hover:bg-cyan-950/40 group-hover:border-cyan-500/30 transition-colors">
                  {getIcon(metric.icon)}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-zinc-200 mb-1 tracking-tight">
                  {label}
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
