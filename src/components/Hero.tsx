import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowDown, Code2, Sparkles, Terminal, ExternalLink } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Typewriter effect state
  const TYPING_PHRASES = [
    'Full Stack Web Developer',
    'CS Scholar @ SETEC Institute',
    'Founder & Creator of LengTool',
    'React 19 & TypeScript Architect',
    'C# ASP.NET & Spring Boot Engineer',
    'Crafting High-Performance Web Systems',
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && charIndex < currentPhrase.length) {
      // Typing forward
      timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 70);
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at full word before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1900);
    } else if (isDeleting && charIndex > 0) {
      // Deleting back
      timer = setTimeout(() => {
        setCharIndex((prev) => prev - 1);
      }, 35);
    } else if (isDeleting && charIndex === 0) {
      // Pause after deleting before next word
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

  const currentTypedText = TYPING_PHRASES[phraseIndex].substring(0, charIndex);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxStyle = (factor: number) => ({
    transform: `translate(${mousePos.x * factor * 25}px, ${mousePos.y * factor * 25}px)`,
    transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black text-white"
    >
      {/* High-tech ambient background glow & mesh grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial cyan glowing gradient */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-sky-500/15 to-transparent blur-[120px] animate-pulse-glow"
        />
        {/* Subtle cyber coordinate grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)`,
            backgroundSize: '40px 40px, 80px 80px, 80px 80px',
          }}
        />
      </div>

      {/* Floating 3D Crystal Center Behind Text (Like reference website) */}
      <div
        className="absolute top-[22%] sm:top-[26%] left-1/2 -translate-x-1/2 pointer-events-none z-0 opacity-40 sm:opacity-55"
        style={parallaxStyle(0.04)}
      >
        <div className="animate-crystal-bob drop-shadow-[0_0_40px_rgba(6,182,212,0.45)]">
          <img
            src="https://i.imgur.com/R5NbN8q.png"
            alt="Center Crystal"
            className="w-[180px] sm:w-[240px] md:w-[300px] h-auto object-contain filter drop-shadow-[0_0_35px_rgba(6,182,212,0.5)] select-none pointer-events-none"
          />
        </div>
      </div>

      {/* Floating Side Crystals with Parallax (Left & Right) */}
      <div
        className="hidden lg:block absolute top-[28%] left-[6%] xl:left-[10%] pointer-events-none z-10 opacity-70"
        style={parallaxStyle(0.07)}
      >
        <div className="animate-crystal-bob drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
          <img
            src="https://i.imgur.com/R5NbN8q.png"
            alt="Floating Crystal Left"
            className="w-[110px] xl:w-[130px] h-auto object-contain select-none"
          />
        </div>
      </div>

      <div
        className="hidden lg:block absolute top-[24%] right-[6%] xl:right-[10%] pointer-events-none z-10 opacity-70"
        style={parallaxStyle(0.06)}
      >
        <div className="animate-crystal-bob-delayed drop-shadow-[0_0_25px_rgba(6,182,212,0.3)]">
          <img
            src="https://i.imgur.com/R5NbN8q.png"
            alt="Floating Crystal Right"
            className="w-[120px] xl:w-[140px] h-auto object-contain scale-x-[-1] select-none"
          />
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* High-tech developer badge pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md text-xs font-mono tracking-widest text-zinc-300 mb-6 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-semibold text-cyan-300">{t('hero.badge')}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4 leading-[1.08] select-none">
          {t('hero.title')}
        </h1>

        {/* Dynamic Typewriter Terminal Line */}
        <div className="h-11 sm:h-12 flex items-center justify-center mb-6 max-w-full px-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950/85 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.2)] max-w-full">
            <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-xs sm:text-sm font-mono text-cyan-400/80 select-none">&gt;</span>
            <span className="text-xs sm:text-sm md:text-base font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 tracking-tight whitespace-nowrap">
              {currentTypedText}
            </span>
            <span className="w-2 h-4 sm:h-5 bg-cyan-400 shrink-0 inline-block animate-[pulse_0.75s_infinite] shadow-[0_0_8px_#22d3ee]" />
          </div>
        </div>

        {/* Hero Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-zinc-400 font-normal leading-relaxed mb-10 px-2">
          {t('hero.subtitle')}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#work"
            className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-cyan-400 text-black font-semibold text-sm hover:bg-cyan-300 active:scale-95 transition-all shadow-[0_0_30px_rgba(6,182,212,0.5)] cursor-pointer"
          >
            <span>{t('hero.btn.work')}</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#about"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.1] active:scale-95 text-white font-medium text-sm backdrop-blur-md transition-all cursor-pointer shadow-sm"
          >
            <span>{t('hero.btn.about')}</span>
          </a>
        </div>

        {/* Quick Tech Stack Pill Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-white/10 max-w-2xl">
          {['REACT 19', 'TYPESCRIPT', 'TAILWIND CSS', 'C# ASP.NET', 'SPRING BOOT', 'POSTGRESQL', 'DOCKER'].map(
            (tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.07] text-[11px] font-mono text-zinc-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
};
