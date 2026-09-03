export type Language = 'en' | 'km';

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  number: string;
  year: string;
  category: string;
  categoryKm: string;
  title: string;
  description: string;
  descriptionKm: string;
  tags: string[];
  gradient: string;
  accentColor: string;
  bannerUrl?: string;
  liveDemoUrl?: string;
  sourceUrl?: string; // 'private' or URL
  details: {
    overview: string;
    overviewKm: string;
    specs: ProjectSpec[];
    impact: string[];
    impactKm: string[];
    architectureNotes?: string;
  };
}

export interface RoleItem {
  id: string;
  title: string;
  titleKm: string;
  organization: string;
  organizationKm: string;
  period: string;
  type: string;
  description: string;
  descriptionKm: string;
  badge: string;
  link?: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  titleKm: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  summaryKm: string;
  content: string;
  contentKm: string;
  tags: string[];
}

export interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops';
  level: string;
  experience: string;
  featured?: boolean;
}

export interface DeveloperQuote {
  quote: string;
  quoteKm: string;
  author: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

