import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BlogArticle } from '../types';
import { X, Clock, Calendar, Tag, BookOpen } from 'lucide-react';

interface BlogModalProps {
  article: BlogArticle | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ article, onClose }) => {
  const { t, language } = useLanguage();

  if (!article) return null;

  const title = language === 'km' ? article.titleKm : article.title;
  const content = language === 'km' ? article.contentKm : article.content;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-zinc-950 border border-white/15 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-black/40">
          <div className="min-w-0 pr-4">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-1.5">
              <span className="text-cyan-400 uppercase tracking-wider">{article.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime} {t('blogs.readTime')}
              </span>
              <span>·</span>
              <span>{article.date}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-zinc-200 leading-relaxed text-sm sm:text-base">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 pb-4 border-b border-white/10">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-zinc-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Render formatted markdown-like text */}
          <div className="space-y-4 font-normal">
            {content.split('\n\n').map((block, idx) => {
              if (block.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-lg sm:text-xl font-bold text-white tracking-tight mt-6 mb-2">
                    {block.replace('### ', '')}
                  </h3>
                );
              }
              if (block.startsWith('```')) {
                const lines = block.split('\n');
                const code = lines.slice(1, -1).join('\n');
                return (
                  <pre
                    key={idx}
                    className="p-4 rounded-xl bg-black/80 border border-white/10 overflow-x-auto text-xs sm:text-sm font-mono text-cyan-300 my-3"
                  >
                    <code>{code}</code>
                  </pre>
                );
              }
              if (block.startsWith('- ')) {
                return (
                  <ul key={idx} className="list-disc list-inside space-y-1 pl-2 text-zinc-300 text-sm sm:text-base">
                    {block.split('\n').map((item, i) => (
                      <li key={i}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>
        </div>

        {/* Footer Bar */}
        <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-400">
            Author: Chab Mongleng · Phnom Penh, Cambodia
          </span>
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-mono text-white transition-colors cursor-pointer"
          >
            {t('blogs.closeArticle')}
          </button>
        </div>
      </div>
    </div>
  );
};
