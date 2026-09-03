import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenRacing: () => void;
  onOpenContactModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRacing }) => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 40);
      setScrollProgress(totalScroll > 0 ? (scrollY / totalScroll) * 100 : 0);

      // Determine active section
      const sections = ['hero', 'metrics', 'about', 'roles', 'work', 'blogs', 'contact'];
      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: t('nav.home'), href: '#hero' },
    { id: 'work', label: t('nav.work'), href: '#work' },
    { id: 'about', label: t('nav.about'), href: '#about' },
    { id: 'roles', label: t('nav.roles'), href: '#roles' },
    { id: 'blogs', label: t('nav.blogs'), href: '#blogs' },
    { id: 'contact', label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center">
      {/* Subtle top reading progress line */}
      <div className="w-full h-[2px] bg-white/5 relative">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-300 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-3 pb-2">
        <nav
          className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? 'bg-black/75 backdrop-blur-xl border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.8)] shadow-cyan-950/20'
              : 'bg-black/40 backdrop-blur-md border-white/10'
          }`}
        >
          {/* Brand Monogram */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group cursor-pointer text-white no-underline"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400/20 to-sky-600/30 border border-cyan-400/40 flex items-center justify-center font-mono font-bold text-xs text-cyan-300 group-hover:border-cyan-400 transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              ML
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                Chab Mongleng
              </span>
              <span className="text-[10px] font-mono text-cyan-400/80 flex items-center gap-1 leading-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE 2026
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-full">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-black bg-white shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Right Controls: Game Easter Egg, CTA */}
          <div className="flex items-center gap-2">
            {/* 🏎️ Retro Racing Arcade Game Button */}
            <button
              onClick={onOpenRacing}
              type="button"
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-full border border-pink-500/40 bg-pink-500/15 hover:bg-pink-500/30 active:scale-95 text-xs transition-all shadow-[0_0_15px_rgba(236,72,153,0.2)] flex items-center gap-1.5 cursor-pointer text-pink-300 font-mono"
              title={t('game.title')}
            >
              <span className="text-sm">🏎️</span>
              <span className="hidden sm:inline font-bold text-[11px] tracking-wider text-pink-200">
                GAME
              </span>
            </button>

            {/* Let's Talk Button (Desktop) */}
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-400 text-black text-xs font-semibold hover:bg-cyan-300 active:scale-95 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <span>{t('nav.talk')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full max-w-md px-4 pb-4">
          <div className="bg-black/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 shadow-2xl space-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 font-semibold'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Actions */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRacing();
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-mono font-bold"
              >
                <span>🏎️</span>
                <span>Arcade Game</span>
              </button>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 text-black text-xs font-bold"
              >
                <span>{t('nav.talk')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
