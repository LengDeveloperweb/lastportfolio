import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ROLES } from '../data/portfolioData';
import { ExternalLink, Briefcase, GraduationCap, Users } from 'lucide-react';

export const RolesSection: React.FC = () => {
  const { t, language } = useLanguage();

  const getRoleIcon = (id: string) => {
    switch (id) {
      case 'lengtool-core':
        return <Briefcase className="w-5 h-5 text-cyan-400" />;
      case 'setec-scholar':
        return <GraduationCap className="w-5 h-5 text-indigo-400" />;
      case 'community-dev':
        return <Users className="w-5 h-5 text-emerald-400" />;
      default:
        return <Briefcase className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="roles" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20 relative">
      <div className="mb-10 text-center sm:text-left">
        <span className="inline-block text-xs font-mono font-semibold tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-full mb-3">
          {t('roles.tag')}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
          {t('roles.title')}
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          {t('roles.sub')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ROLES.map((role) => {
          const title = language === 'km' ? role.titleKm : role.title;
          const org = language === 'km' ? role.organizationKm : role.organization;
          const desc = language === 'km' ? role.descriptionKm : role.description;

          return (
            <div
              key={role.id}
              className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    {getRoleIcon(role.id)}
                  </div>
                  <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-zinc-300">
                    {role.badge}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-cyan-400/80 mb-1">
                  {role.period}
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight mb-1 group-hover:text-cyan-300 transition-colors">
                  {title}
                </h3>

                <div className="text-xs font-medium text-zinc-400 mb-4 flex items-center gap-1.5">
                  <span>{org}</span>
                  {role.link && (
                    <a
                      href={role.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 inline-flex items-center"
                      title="Open website"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {desc}
                </p>
              </div>

              {role.link && (
                <div className="pt-6 mt-6 border-t border-white/[0.06]">
                  <a
                    href={role.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold group/link"
                  >
                    <span>Visit Platform</span>
                    <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
