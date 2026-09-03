import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BLOG_ARTICLES } from '../data/portfolioData';
import { BlogArticle } from '../types';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';

interface BlogsSectionProps {
  onSelectArticle: (article: BlogArticle) => void;
}

export const BlogsSection: React.FC<BlogsSectionProps> = ({ onSelectArticle }) => {
  const { t, language } = useLanguage();

  return (
    <section id="blogs" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20 relative">
      <div className="mb-12 text-center sm:text-left">
        <span className="inline-block text-xs font-mono font-semibold tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-full mb-3">
          {t('blogs.tag')}
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2">
          {t('blogs.title')}
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          {t('blogs.sub')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BLOG_ARTICLES.map((article) => {
          const title = language === 'km' ? article.titleKm : article.title;
          const summary = language === 'km' ? article.summaryKm : article.summary;

          return (
            <div
              key={article.id}
              className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
                  <span className="text-cyan-400 uppercase">{article.category}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      {article.readTime} {t('blogs.readTime')}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-zinc-400 mb-2">
                  {article.date}
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight mb-3 group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 line-clamp-3 leading-relaxed mb-6">
                  {summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <button
                  onClick={() => onSelectArticle(article)}
                  type="button"
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-cyan-400 hover:text-black text-xs font-semibold text-zinc-200 transition-all cursor-pointer group/btn"
                >
                  <span className="font-mono">{t('blogs.readMore')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
