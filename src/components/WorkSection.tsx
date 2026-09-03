import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ExternalLink, Github, Lock, Layers, ArrowUpRight, Code, Eye } from 'lucide-react';

interface WorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectProject }) => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'live' | 'fullstack' | 'tools'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'live') return !!p.liveDemoUrl && p.id === 'lengtool';
    if (filter === 'fullstack') return p.tags.includes('PostgreSQL') || p.tags.includes('C# ASP.NET Core') || p.tags.includes('Spring Boot 3');
    if (filter === 'tools') return p.id === 'lengtool' || p.id === 'chatbridge-gateway' || p.id === 'postgres-data-engine';
    return true;
  });

  return (
    <section id="work" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20 relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="inline-block text-xs font-mono font-semibold tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-full mb-3">
            {t('work.tag')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2">
            {t('work.title')}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
            {t('work.sub')}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: t('work.filterAll') },
            { id: 'live', label: t('work.filterLive') },
            { id: 'fullstack', label: t('work.filterFullstack') },
            { id: 'tools', label: t('work.filterTools') },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              type="button"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                filter === item.id
                  ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with Framer Motion layout & hover dynamics */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const cat = language === 'km' ? project.categoryKm : project.category;
            const desc = language === 'km' ? project.descriptionKm : project.description;
            // Alternating subtle tilt angle (-0.75deg or +0.75deg) for organic tactile feel
            const hoverRotation = index % 2 === 0 ? 0.75 : -0.75;

            return (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                whileHover={{
                  y: -8,
                  scale: 1.025,
                  rotate: hoverRotation,
                  transition: { type: 'spring', stiffness: 400, damping: 24 },
                }}
                whileTap={{
                  scale: 0.99,
                  y: -4,
                  transition: { duration: 0.1 },
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="group relative rounded-2xl bg-zinc-950/80 backdrop-blur-sm border border-white/[0.08] hover:border-cyan-400/60 transition-colors duration-300 flex flex-col justify-between overflow-hidden shadow-lg shadow-black/40 hover:shadow-[0_20px_45px_-15px_rgba(6,182,212,0.28)]"
              >
                {/* Ambient Top Glow Border on Hover */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/0 group-hover:via-cyan-400/80 to-transparent transition-all duration-500 z-10" />

                {/* Card Banner / Gradient Area */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                  {project.bannerUrl ? (
                    <motion.img
                      src={project.bannerUrl}
                      alt={project.title}
                      className="w-full h-full object-cover object-center opacity-65 group-hover:opacity-85"
                      loading="lazy"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${project.gradient} opacity-80`} />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

                  {/* Top Badge: Number & Year */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="text-xs font-mono font-bold text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 shadow-sm">
                      {project.number}
                    </span>
                    <span className="text-xs font-mono text-cyan-300 bg-cyan-950/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-cyan-500/40 shadow-sm">
                      {project.year}
                    </span>
                  </div>

                  {/* Bottom Overlay Info */}
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <span className="text-[11px] font-mono text-cyan-400 block tracking-wider uppercase drop-shadow-sm font-semibold">
                      {cat}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight drop-shadow-sm">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-zinc-300 line-clamp-3 leading-relaxed mb-4">
                      {desc}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] border border-white/[0.08] text-zinc-300 group-hover:border-white/15 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.02] text-zinc-400">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-400 text-black text-xs font-bold hover:bg-cyan-300 active:scale-95 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                          title={t('work.liveDemo')}
                        >
                          <span>{t('work.liveDemo')}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}

                      {project.sourceUrl === 'private' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.04] text-zinc-400 text-xs font-mono">
                          <Lock className="w-3 h-3" />
                          <span className="hidden sm:inline">{t('work.sourcePrivate')}</span>
                        </span>
                      ) : project.sourceUrl ? (
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs font-mono transition-all hover:border-white/20 border border-transparent"
                          title={t('work.viewSource')}
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Source</span>
                        </a>
                      ) : null}
                    </div>

                    {/* Architecture Details Trigger */}
                    <button
                      onClick={() => onSelectProject(project)}
                      type="button"
                      className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1 text-xs font-mono cursor-pointer"
                      title={t('work.exploreArch')}
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="hidden sm:inline">Details</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
