import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MetricsBar } from './components/MetricsBar';
import { AboutSection } from './components/AboutSection';
import { RolesSection } from './components/RolesSection';
import { WorkSection } from './components/WorkSection';
import { BlogsSection } from './components/BlogsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { RetroRacingModal } from './components/RetroRacingModal';
import { ProjectModal } from './components/ProjectModal';
import { BlogModal } from './components/BlogModal';
import { FavoriteSongPlayer } from './components/FavoriteSongPlayer';
import { Project, BlogArticle } from './types';

export default function App() {
  const [isRacingOpen, setIsRacingOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col font-sans relative overflow-x-hidden">
        {/* Floating Capsule Navbar */}
        <Navbar onOpenRacing={() => setIsRacingOpen(true)} />

        {/* Main Content Flow */}
        <main className="flex-1 w-full">
          {/* Hero Section with Parallax 3D Crystals */}
          <Hero />

          {/* 2026 Metrics & Highlights Bar */}
          <MetricsBar />

          {/* Selected Work (Real Projects) */}
          <WorkSection onSelectProject={(proj) => setSelectedProject(proj)} />

          {/* Our Story (About Me, Developer Quotes & Skills) */}
          <AboutSection />

          {/* Leadership & Current Roles */}
          <RolesSection />

          {/* Blogs & Engineering Articles */}
          <BlogsSection onSelectArticle={(art) => setSelectedArticle(art)} />

          {/* Contact & Collaboration */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* 🏎️ Retro 80s Synthwave Racing Arcade Minigame Modal */}
        <RetroRacingModal
          isOpen={isRacingOpen}
          onClose={() => setIsRacingOpen(false)}
        />

        {/* Project Architecture & Details Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {/* Full Blog Article Reader Modal */}
        <BlogModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />

        {/* 🎵 Chab Mongleng's Favorite Song Player (ចំប៉ីសៀមរាប - Sin Sisamuth) */}
        <FavoriteSongPlayer />
      </div>
    </LanguageProvider>
  );
}
