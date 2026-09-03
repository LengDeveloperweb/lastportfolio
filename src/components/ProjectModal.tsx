import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Project } from '../types';
import { X, ExternalLink, Github, CheckCircle2, Cpu, Server, Lock } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { t, language } = useLanguage();

  if (!project) return null;

  const title = project.title;
  const cat = language === 'km' ? project.categoryKm : project.category;
  const overview = language === 'km' ? project.details.overviewKm : project.details.overview;
  const impacts = language === 'km' ? project.details.impactKm : project.details.impact;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-zinc-950 border border-white/15 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-black/40">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                {project.number}
              </span>
              <span className="text-[11px] font-mono text-zinc-400 uppercase">
                {cat}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Banner */}
          {project.bannerUrl && (
            <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/10">
              <img
                src={project.bannerUrl}
                alt={project.title}
                className="w-full h-full object-cover object-center opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          )}

          {/* Overview */}
          <div>
            <h3 className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
              // {t('work.overview')}
            </h3>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
              {overview}
            </p>
          </div>

          {/* Architecture Specifications */}
          <div>
            <h3 className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-3 flex items-center gap-1.5">
              <Server className="w-4 h-4" />
              <span>TECHNICAL SPECIFICATIONS & AUDIT</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.details.specs.map((spec, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between"
                >
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">
                    {spec.label}
                  </span>
                  <span className="text-xs font-mono text-zinc-200 font-semibold mt-1">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Impact & Key Outcomes */}
          <div>
            <h3 className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-3 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>{t('work.impact')}</span>
            </h3>
            <div className="space-y-2.5">
              {impacts.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Notes */}
          {project.details.architectureNotes && (
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs sm:text-sm text-cyan-200 font-mono leading-relaxed">
              <span className="text-cyan-400 font-bold block mb-1">// ARCHITECTURE MEMO</span>
              {project.details.architectureNotes}
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 text-black text-xs font-bold hover:bg-cyan-300 transition-colors"
              >
                <span>{t('work.liveDemo')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.sourceUrl && project.sourceUrl !== 'private' ? (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-mono transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Repository</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] text-zinc-400 text-xs font-mono">
                <Lock className="w-3.5 h-3.5" />
                <span>{t('work.sourcePrivate')}</span>
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
