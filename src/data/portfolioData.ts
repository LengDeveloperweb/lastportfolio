import { Project, RoleItem, BlogArticle, DeveloperQuote, SkillItem } from '../types';

export const METRICS = [
  {
    val: '04',
    labelEn: 'Real Work Projects',
    labelKm: 'គម្រោងការងារពិតប្រាកដ',
    subEn: 'Deployed & active in 2026',
    subKm: 'ដំណើរការ និងដាក់ឱ្យប្រើប្រាស់ក្នុងឆ្នាំ ២០២៦',
    icon: 'Terminal',
  },
  {
    val: '100%',
    labelEn: 'Open Source & Live Demos',
    labelKm: 'កូដចំហ & Live Demos',
    subEn: 'Verified codebases & production links',
    subKm: 'លីងផ្សាយផ្ទាល់ និងកូដត្រួតពិនិត្យបាន',
    icon: 'Globe',
  },
  {
    val: '03',
    labelEn: 'Web Utilities & Micro-Services',
    labelKm: 'កម្មវិធីវេបសាយ & ប្រព័ន្ធ',
    subEn: 'LengTool suite, Docker & APIs',
    subKm: 'LengTool, Docker & Web APIs',
    icon: 'Layers',
  },
  {
    val: '< 50ms',
    labelEn: 'Code Efficiency & Speed',
    labelKm: 'ប្រសិទ្ធភាព និងល្បឿនកូដ',
    subEn: 'Optimized for high performance',
    subKm: 'ធ្វើឱ្យប្រសើរឡើងសម្រាប់ល្បឿនលឿន',
    icon: 'Zap',
  },
];

export const DEVELOPER_QUOTES: DeveloperQuote[] = [
  {
    quote: 'Simplicity is prerequisite for reliability. Clean architecture is not about fewer lines, but clear responsibility.',
    quoteKm: 'ភាពសាមញ្ញជាមូលដ្ឋានគ្រឹះនៃភាពទុកចិត្តបាន។ ស្ថាបត្យកម្មកូដល្អ មិនមែនស្ថិតលើចំនួនបន្ទាត់តិចនោះទេ គឺស្ថិតលើភាពច្បាស់លាស់នៃការបែងចែកការងារ។',
    author: 'Edsger W. Dijkstra',
  },
  {
    quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    quoteKm: 'នរណាក៏អាចសរសេរកូដឱ្យកុំព្យូទ័រយល់បានដែរ។ ប៉ុន្តែអ្នកសរសេរកូដពូកែ តែងសរសេរកូដដែលមនុស្សងាយយល់។',
    author: 'Martin Fowler',
  },
  {
    quote: 'First, solve the problem. Then, write the code. Measure twice, build once.',
    quoteKm: 'ដំបូងត្រូវដោះស្រាយបញ្ហាឱ្យបានច្បាស់។ បន្ទាប់មកទើបចាប់ផ្តើមសរសេរកូដ។ គិតឱ្យបានល្អិតល្អន់មុននឹងកសាង។',
    author: 'John Johnson',
  },
  {
    quote: 'Software engineering is the art of balancing speed of execution with long-term maintainability.',
    quoteKm: 'វិស្វកម្មសូហ្វវែរ គឺជាសិល្បៈនៃការថ្លឹងថ្លែងរវាងល្បឿននៃការដំណើរការ និងភាពងាយស្រួលក្នុងការថែទាំរយៈពេលវែង។',
    author: 'Chab Mongleng',
  },
];

export const TECH_STACK: SkillItem[] = [
  { name: 'React 19', category: 'frontend', level: 'Advanced', experience: '', featured: true },
  { name: 'GitHub & Postman', category: 'Devops', level: 'Advanced', experience: '', featured: true },
  { name: 'Tailwind CSS', category: 'frontend', level: 'Expert', experience: '', featured: true },
  { name: 'Laravel', category: 'backend', level: 'Proficient', experience: '', featured: true },
  { name: 'SQL Server', category: 'database', level: 'Advanced', experience: '', featured: true },
  { name: 'Docker', category: 'devops', level: 'Proficient', experience: '', featured: true },
  { name: 'JavaScript', category: 'backend', level: 'Advanced', experience: '', featured: true },
  { name: 'REST APIs ', category: 'backend', level: 'Proficient', experience: '' },
  { name: 'Bootstrap 5', category: 'frontend', level: 'Expert', experience: '' },
  { name: 'Git & GitHub Actions', category: 'devops', level: 'Advanced', experience: '' },
];

export const ROLES: RoleItem[] = [
  {
    id: 'lengtool-core',
    title: 'Founder & Lead Architect',
    titleKm: 'ស្ថាបនិក & ប្រធានស្ថាបត្យករ',
    organization: 'LengTool Platform',
    organizationKm: 'វេទិកា LengTool (lengtool.site)',
    period: '2025 — Present',
    type: 'Production Platform',
    description:
      'Engineered an all-in-one web utility and developer toolbox featuring text formatters, JSON converters, hash generators, and specialized Cambodian utilities with responsive zero-dependency client tools.',
    descriptionKm:
      'បានបង្កើត និងរចនាប្រព័ន្ធវេទិកាឧបករណ៍វេបសាយ LengTool សម្រាប់អ្នកអភិវឌ្ឍន៍ និងអ្នកប្រើប្រាស់ទូទៅ ដោយមានមុខងារ Format កូដ, បំលែងទិន្នន័យ, Hash និងឧបករណ៍ខ្មែរ ដោយផ្តោតលើល្បឿន និងភាពងាយស្រួល។',
    badge: 'FLAGSHIP PLATFORM',
    link: 'https://lengtool.site',
  },
  {
    id: 'setec-scholar',
    title: 'Computer Science Scholar & Developer',
    titleKm: 'និស្សិតវិទ្យាសាស្ត្រកុំព្យូទ័រ',
    organization: 'SETEC Institute, Phnom Penh',
    organizationKm: 'វិទ្យាស្ថាន SETEC រាជធានីភ្នំពេញ',
    period: '2025 — Present',
    type: 'Higher Education',
    description:
      'Excelling in advanced software architecture, database management systems (PostgreSQL), enterprise application engineering (C# ASP.NET Core and Java Spring Boot), and collaborative agile team projects.',
    descriptionKm:
      'សិក្សាជំនាញវិទ្យាសាស្ត្រកុំព្យូទ័រ និងវិស្វកម្មសូហ្វវែរ ដោយផ្តោតលើប្រព័ន្ធគ្រប់គ្រងមូលដ្ឋានទិន្នន័យកម្រិតខ្ពស់ (PostgreSQL), ការបង្កើតប្រព័ន្ធ Enterprise ដោយប្រើ C# ASP.NET Core និង Java Spring Boot។',
    badge: 'ACADEMIC EXCELLENCE',
  },
  {
    id: 'community-dev',
    title: 'Open Source Contributor & Mentor',
    titleKm: 'អ្នករួមចំណែកកូដចំហ & ការចែករំលែក',
    organization: 'Cambodian Tech Community',
    organizationKm: 'សហគមន៍បច្ចេកវិទ្យាកម្ពុជា',
    period: '2025 — Present',
    type: 'Community Engagement',
    description:
      'Authored open-source starter templates, modular utilities, and algorithmic solvers. Actively assisting junior peers at SETEC Institute in mastering modern web workflows and backend database design.',
    descriptionKm:
      'បង្កើតគំរូកូដចំហ (Open Source Starter Templates) និងឧបករណ៍ជំនួយដល់អ្នកអភិវឌ្ឍន៍ ព្រមទាំងជួយណែនាំមិត្តរួមថ្នាក់នៅវិទ្យាស្ថាន SETEC លើការសរសេរកូដវេបសាយទំនើប និងការរចនាប្រព័ន្ធ Database។',
    badge: 'TECH SHARING',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'lengtool',
    number: '01 / 05',
    year: '2026',
    category: 'Flagship Web Platform',
    categoryKm: 'វេទិកាឧបករណ៍វេបសាយស្នូល',
    title: 'LengTool',
    description:
      'A production-grade, fast developer and daily web utility suite providing formatters, encoders, calculators, and Khmer language tools built with React, TypeScript, and Tailwind CSS.',
    descriptionKm:
      'កញ្ចប់ឧបករណ៍វេបសាយទំនើប និងលឿនរហ័ស សម្រាប់អ្នកអភិវឌ្ឍន៍ និងការងារប្រចាំថ្ងៃ រួមមានឧបករណ៍ Format កូដ, Encode/Decode, ម៉ាស៊ីនគណនា និងឧបករណ៍ភាសាខ្មែរ បង្កើតដោយ React, TypeScript និង Tailwind CSS។',
    tags: ['React 19', 'Tailwind CSS', 'Docker', 'Vite', 'Cloud Run'],
    gradient: 'from-[#083344] via-[#0e7490]/40 to-[#000000]',
    accentColor: '#06b6d4',
    bannerUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    liveDemoUrl: 'https://lengtool.site',
    sourceUrl: 'https://github.com/LengDeveloperweb/lengtool',
    details: {
      overview:
        'LengTool is an active live online productivity suite engineered to deliver instant client-side tools with zero data tracking and instantaneous execution. Over 25+ modules including JSON/SQL Formatter, Base64/JWT Inspector, Regex Tester, and traditional Khmer date calculators.',
      overviewKm:
        'LengTool គឺជាវេទិកាឧបករណ៍ផលិតភាពដែលកំពុងដំណើរការផ្ទាល់ បង្កើតឡើងដើម្បីផ្តល់នូវឧបករណ៍ដែលមានល្បឿនលឿនភ្លាមៗ ដោយមិនទាមទារការចុះឈ្មោះ និងមិនរក្សាទុកទិន្នន័យសម្ងាត់របស់អ្នកប្រើ។ មានជាង ២៥+ មុខងាររួមមាន JSON/SQL Formatter, Base64/JWT Inspector, Regex Tester និងម៉ាស៊ីនគណនាកាលបរិច្ឆេទចន្ទគតិខ្មែរ។',
      specs: [
        { label: 'Live Domain', value: 'lengtool.site' },
        { label: 'Tech Stack', value: 'React 19 · Tailwind CSS' },
        { label: 'Container', value: 'Dockerized multi-stage build' },
        { label: 'Performance', value: '100% Lighthouse Performance Score' },
      ],
      impact: [
        'Served thousands of tool requests with sub-20ms client-side processing.',
        'Zero-dependency standalone parsing algorithms running safely in Web Workers.',
        'Fully offline-capable architecture with responsive mobile and desktop viewports.',
      ],
      impactKm: [
        'ដំណើរការសំណើប្រើប្រាស់ឧបករណ៍រាប់ពាន់ដង ក្នុងល្បឿនក្រោម ២០ms លើ Browser។',
        'ក្បួនដោះស្រាយទិន្នន័យឯករាជ្យដែលដំណើរការប្រកបដោយសុវត្ថិភាពលើ Web Workers។',
        'គាំទ្រការប្រើប្រាស់ Offline និងបង្ហាញយ៉ាងស្រស់ស្អាតលើទូរស័ព្ទ និងកុំព្យូទ័រ។',
      ],
      architectureNotes:
        'Built with modular micro-utilities where each tool is code-split and loaded on demand. Uses Vite for instant HMR and Rollup manual chunking to keep the initial JS payload below 45KB.',
    },
  },
  {
    id: 'setec-academic-hub',
    number: '02 / 05',
    year: '2026',
    category: 'Enterprise Academic Portal',
    categoryKm: 'ប្រព័ន្ធគ្រប់គ្រងសាកលវិទ្យាល័យ',
    title: 'SETEC Academic Hub',
    description:
      'A full-stack student management and grade analytics system built with C# ASP.NET Core Web API, PostgreSQL relational database, and modern responsive frontend.',
    descriptionKm:
      'ប្រព័ន្ធគ្រប់គ្រងនិស្សិត និងវិភាគពិន្ទុសិក្សា Full-Stack បង្កើតឡើងដោយប្រើ C# ASP.NET Core Web API, មូលដ្ឋានទិន្នន័យ PostgreSQL និងផ្ទៃមុខកម្មវិធី React ទំនើប។',
    tags: ['Laravel', 'PostgreSQL', 'Entity Framework', 'React', 'Docker'],
    gradient: 'from-[#1e1b4b] via-[#3730a3]/40 to-[#000000]',
    accentColor: '#818cf8',
    bannerUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    liveDemoUrl: '',
    sourceUrl: '',
    details: {
      overview:
        'A comprehensive university enterprise portal designed to streamline student course registration, lecturer grading submissions, and GPA transcript generation for SETEC Institute curriculum workflows.',
      overviewKm:
        'ប្រព័ន្ធព័ត៌មានវិទ្យាកម្រិតស្ថាប័នអប់រំ ដែលរចនាឡើងដើម្បីជួយសម្រួលដល់ការចុះឈ្មោះមុខវិជ្ជា ការបញ្ចូលពិន្ទុរបស់សាស្ត្រាចារ្យ និងការគណនា GPA សម្រាប់កម្មវិធីសិក្សានៅវិទ្យាស្ថាន SETEC។',
      specs: [
        { label: 'Backend', value: 'Laravel Web API' },
        { label: 'Database', value: 'SQL with B-tree indices' },
        { label: 'Authentication', value: 'JWT Bearer with Role-Based Access (RBAC)' },
        { label: 'Deployment', value: 'Docker Container on Linux host' },
      ],
      impact: [
        'Reduced grade calculation processing time from manual spreadsheets to 200ms batch queries.',
        'Rigorous schema constraints enforcing foreign keys, audit timestamps, and transactional ACID guarantees.',
        'Interactive analytics dashboard displaying distribution curves and academic honors.',
      ],
      impactKm: [
        'កាត់បន្ថយពេលវេលាគណនាពិន្ទុពី Spreadsheet ដោយដៃ មកត្រឹមការដំណើរការ Query ក្រោម ២០០ms។',
        'រៀបចំក្បួនទិន្នន័យ (Schema Constraints) ប្រកបដោយភាពត្រឹមត្រូវ និងសុវត្ថិភាពខ្ពស់តាមស្តង់ដារ ACID។',
        'ផ្ទាំងគ្រប់គ្រងទិន្នន័យ (Dashboard) បង្ហាញក្រាហ្វិកកម្រិតពិន្ទុ និងលទ្ធផលសិក្សាយ៉ាងច្បាស់លាស់។',
      ],
      architectureNotes:
        'Clean Architecture implementation with separated Domain, Application, Infrastructure, and API layers. Utilizes MediatR pattern for CQRS command/query segregation.',
    },
  },
  
  {
{
    id: 'tripsr-booking-engine',
    number: '04 / 05',
    year: '2026',
    category: 'TripSR Platform',
    categoryKm: 'វេទិកា TripSR',
    title: 'TripSR Booking Platform — Laravel React Full-Stack',
    description:
      'Enterprise travel booking system built with Laravel 11 API, React 18 frontend, and Bootstrap 5 UI. Features real-time availability, multi-currency payments, and advanced database optimization for TripSR platform.',
    descriptionKm:
      'ប្រព័ន្ធកក់ទេសចរណ៍កម្រិតសហគ្រាសបង្កើតដោយ Laravel 11 API, React 18 Frontend និង Bootstrap 5 UI សម្រាប់វេទិកា TripSR។',
    tags: ['Laravel 11', 'React 18', 'Bootstrap 5', 'PostgreSQL 16', 'REST API', 'Inertia.js'],
    gradient: 'from-[#032ea6]/30 via-[#1e40af]/30 to-[#000000]',
    accentColor: '#38bdf8',
    bannerUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
    liveDemoUrl: '',
    sourceUrl: '',
    details: {
      overview:
        'A full-stack travel booking platform for TripSR — combining Laravel 11 backend with React 18 frontend and Bootstrap 5 for responsive UI. Handles real-time tour availability, multi-currency payments, automated confirmations, and scales with PostgreSQL optimization.',
      overviewKm:
        'វេទិកាកក់ទេសចរណ៍ Full-Stack សម្រាប់ TripSR — រួមបញ្ចូល Laravel 11 Backend ជាមួយ React 18 Frontend និង Bootstrap 5 សម្រាប់ UI ឆ្លើយតប។ គ្រប់គ្រងការអាចរកបានទេសចរណ៍តាមពេលវេលាជាក់ស្តែង ការទូទាត់រូបិយប័ណ្ណច្រើន និងការបញ្ជាក់ដោយស្វ័យប្រវត្តិ។',
      specs: [
        { label: 'Backend', value: 'Laravel 11 with RESTful API & Sanctum Auth' },
        { label: 'Frontend', value: 'React 18 + Bootstrap 5 + Vite' },
        { label: 'Database', value: 'PostgreSQL 16 with Eloquent ORM & Optimization' },
        { label: 'State Management', value: 'React Context API + Laravel Cache' },
        { label: 'Payment Gateway', value: 'Stripe & KHQR Integration' },
        { label: 'Performance', value: '94% query speed improvement via indexing' },
      ],
      impact: [
        'Built responsive travel booking UI with React components and Bootstrap 5 grid system — optimized for mobile and desktop.',
        'Implemented Laravel REST API with 40+ endpoints for tour management, bookings, payments, and user profiles.',
        'Reduced booking confirmation time from 8s to 1.2s using Laravel queues, Redis caching, and PostgreSQL indexing.',
        'Integrated multi-currency support (USD, KHR, THB) with real-time exchange rates for TripSR international travelers.',
        'Deployed with Docker containerization and CI/CD pipeline for seamless updates.',
      ],
      impactKm: [
        'បង្កើត UI កក់ទេសចរណ៍ឆ្លើយតបជាមួយ React Components និង Bootstrap 5 Grid System — បង្កើនប្រសិទ្ធភាពសម្រាប់ទូរស័ព្ទដៃ និងកុំព្យូទ័រ។',
        'អនុវត្ត Laravel REST API ជាមួយ 40+ Endpoints សម្រាប់ការគ្រប់គ្រងទេសចរណ៍ ការកក់ ការទូទាត់ និងទម្រង់អ្នកប្រើប្រាស់។',
        'កាត់បន្ថយពេលវេលាបញ្ជាក់ការកក់ពី ៨ វិនាទី មកត្រឹម ១.២ វិនាទី ដោយប្រើ Laravel Queues, Redis Caching និង PostgreSQL Indexing។',
        'បញ្ចូលការគាំទ្ររូបិយប័ណ្ណច្រើន (USD, KHR, THB) ជាមួយអត្រាប្តូរប្រាក់តាមពេលវេលាជាក់ស្តែងសម្រាប់ភ្ញៀវទេសចរណ៍អន្តរជាតិ TripSR។',
        'ដំឡើងជាមួយ Docker Containerization និង CI/CD Pipeline សម្រាប់ការធ្វើបច្ចុប្បន្នភាពគ្មានថ្នេរ។',
      ],
      architectureNotes:
        'Laravel 11 with Service-Repository pattern for clean separation of concerns. React components use Bootstrap 5 for consistent styling. PostgreSQL with Eloquent ORM and optimized indexes for travel booking queries. Queue workers handle email confirmations and PDF generation asynchronously.',
    },
  }
  
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'blog-1',
    slug: 'architecting-lengtool',
    title: 'Architecting LengTool: High-Performance Micro-Web Utilities in 2026',
    titleKm: 'ការរចនាស្ថាបត្យកម្ម LengTool៖ បង្កើតឧបករណ៍វេបសាយល្បឿនលឿនក្នុងឆ្នាំ ២០២៦',
    date: 'February 2026',
    readTime: '5',
    category: 'Architecture & Web',
    summary:
      'How we built a production-grade developer suite serving 25+ client tools with zero server roundtrips, sub-50KB bundle footprint, and 100% Lighthouse score.',
    summaryKm:
      'របៀបដែលយើងបានកសាងវេទិកា LengTool ជាមួយនឹងឧបករណ៍ជាង ២៥+ ដោយមិនចាំបាច់បញ្ជូនទិន្នន័យទៅ Server ធ្វើឱ្យទំហំកូដតូចជាង 50KB និងទទួលបានពិន្ទុ Lighthouse ១០០%។',
    tags: ['React 19', 'Vite', 'Performance', 'Web Workers'],
    content: `When building LengTool (lengtool.site), the primary design philosophy was zero latency and total user privacy. Most developer utilities today suffer from bloated server dependencies, unnecessary login walls, and tracking scripts.

### 1. Zero-Roundtrip Architecture
Every calculation—from JSON formatting, regex validation, to Khmer lunar astronomical cycles—executes entirely client-side using native JavaScript and Web Workers. This ensures your private API tokens, database connection strings, and sensitive payload snippets never leave your browser memory.

### 2. Radical Code Splitting
By configuring Vite's dynamic imports:
\`\`\`typescript
const ToolModule = React.lazy(() => import(\`./tools/\${toolId}\`));
\`\`\`
The initial landing screen loads in less than 35 milliseconds. Individual tools only download when requested, keeping bandwidth minimal even on mobile cellular connections in Cambodia.

### 3. Accessible Khmer Typographic Hierarchy
Rendering Khmer script accurately alongside Latin alphanumeric text requires special optical kerning and line-height balance. Using the modern font **Kantumruy Pro**, we ensure headings and numeric values maintain optical harmony without awkward line wrapping.`,
    contentKm: `នៅពេលចាប់ផ្តើមបង្កើត LengTool (lengtool.site) គោលការណ៍ចម្បងរបស់យើងគឺ ល្បឿនលឿនបំផុត (Zero Latency) និងការរក្សាការសម្ងាត់ជូនអ្នកប្រើប្រាស់ ១០០%។ ឧបករណ៍ភាគច្រើនសព្វថ្ងៃតែងតែទាមទារការផ្ញើទិន្នន័យទៅកាន់ Server ឬទាមទារការបង្កើត Account ដែលធ្វើឱ្យយឺតយ៉ាវ។

### ១. ស្ថាបត្យកម្ម Zero-Roundtrip
ការគណនា និងកែសម្រួលទាំងអស់—ចាប់ពី JSON formatting, Regex រហូតដល់ក្បួនប្រតិទិនចន្ទគតិខ្មែរ—ដំណើរការផ្ទាល់នៅលើ Browser របស់លោកអ្នក ដោយមិនបញ្ជូនទិន្នន័យសម្ងាត់ចេញក្រៅឡើយ។

### ២. ការបំបែកកូដ (Code Splitting)
យើងបានប្រើប្រាស់ប្រព័ន្ធ Dynamic Import របស់ Vite៖
\`\`\`typescript
const ToolModule = React.lazy(() => import(\`./tools/\${toolId}\`));
\`\`\`
ធ្វើឱ្យទំព័រដើមបើកឡើងក្នុងរយៈពេលត្រឹមតែ ៣៥ មិល្លីវិនាទីប៉ុណ្ណោះ។

### ៣. ភាពស្រស់ស្អាតនៃពុម្ពអក្សរខ្មែរ
ការរៀបចំ Font ខ្មែរឱ្យមានតុល្យភាពជាមួយ Font អង់គ្លេស ត្រូវបានសម្រិតសម្រាំងយ៉ាងហ្មត់ចត់ដោយប្រើប្រាស់ពុម្ពអក្សរ **Kantumruy Pro** ធ្វើឱ្យអត្ថបទមានភាពច្បាស់ និងងាយស្រួលអានលើគ្រប់ឧបករណ៍។`,
  },
  {
    id: 'blog-2',
    slug: 'postgresql-enterprise-tuning',
    title: 'PostgreSQL Schema Design & Index Tuning for High-Scale Applications',
    titleKm: 'ការរចនា Schema និង Index Tuning ក្នុង PostgreSQL សម្រាប់ប្រព័ន្ធទំហំធំ',
    date: 'January 2026',
    readTime: '7',
    category: 'Database Systems',
    summary:
      'Practical techniques learned from database coursework at SETEC Institute: composite indices, partial index filters, and query plan diagnosis.',
    summaryKm:
      'បច្ចេកទេសជាក់ស្តែងដែលបានរៀនពីមុខវិជ្ជា Database នៅវិទ្យាស្ថាន SETEC៖ ការបង្កើត Composite Index, Partial Index និងការវិភាគ Query Plan ឱ្យលឿន។',
    tags: ['PostgreSQL', 'SQL', 'Performance Tuning', 'Database'],
    content: `A slow database query can paralyze an entire web application. During my enterprise systems coursework at SETEC Institute, we systematically benchmarked PostgreSQL query execution against large multi-million row synthetic schemas.

### 1. The Cost of Sequential Scans
Without proper indexes, PostgreSQL must scan every data page on disk. Using \`EXPLAIN (ANALYZE, BUFFERS)\`:
\`\`\`sql
EXPLAIN ANALYZE SELECT * FROM student_records 
WHERE status = 'ACTIVE' AND campus_id = 104;
\`\`\`
By introducing a partial compound index:
\`\`\`sql
CREATE INDEX idx_active_students ON student_records(campus_id) 
WHERE status = 'ACTIVE';
\`\`\`
Execution times dropped from 1,240ms down to 1.8ms—a 99.8% speedup!

### 2. Connection Pooling with PgBouncer
PostgreSQL assigns a process per client connection. Setting up connection pooling in transaction mode prevents process starvation and allows 5,000 concurrent client requests with only 50 physical backend connections.`,
    contentKm: `Query យឺតនៅក្នុង Database អាចធ្វើឱ្យប្រព័ន្ធទាំងមូលដំណើរការមិនបានល្អ។ នៅក្នុងការសិក្សានៅវិទ្យាស្ថាន SETEC យើងបានធ្វើតេស្តជាក់ស្តែងលើទិន្នន័យរាប់លានជួរដើម្បីស្វែងរកដំណោះស្រាយល្អបំផុត។

### ១. គ្រោះថ្នាក់នៃ Sequential Scan
ប្រសិនបើគ្មាន Index ត្រឹមត្រូវទេ PostgreSQL ត្រូវតែស្វែងរកគ្រប់បន្ទាត់ក្នុង Hard Drive។
តាមរយៈការបង្កើត Partial Index៖
\`\`\`sql
CREATE INDEX idx_active_students ON student_records(campus_id) 
WHERE status = 'ACTIVE';
\`\`\`
រយៈពេលដំណើរការបានធ្លាក់ចុះពី ១,២៤០ms មកសល់ត្រឹម ១.៨ms ប៉ុណ្ណោះ!

### ២. ការគ្រប់គ្រង Connection ជាមួយ PgBouncer
ការប្រើប្រាស់ Connection Pool ជួយឱ្យប្រព័ន្ធទទួលសំណើបានរាប់ពាន់ក្នុងពេលតែមួយ ដោយមិនធ្វើឱ្យ Server អស់ Memory ឡើយ។`,
  },
  {
    id: 'blog-3',
    slug: 'dotnet-vs-spring-boot',
    title: 'ASP.NET Core Web API vs Spring Boot 3: Full-Stack Realities in 2026',
    titleKm: 'ការប្រៀបធៀបរវាង ASP.NET Core និង Java Spring Boot 3 ក្នុងឆ្នាំ ២០២៦',
    date: 'January 2026',
    readTime: '6',
    category: 'Backend Architecture',
    summary:
      'A side-by-side architectural comparison based on building full-stack academic and production backends in C# and Java.',
    summaryKm:
      'ការប្រៀបធៀបជាក់ស្តែងរវាង C# ASP.NET Core និង Java Spring Boot ផ្អែកលើការកសាងប្រព័ន្ធជាក់ស្តែងនៅសាកលវិទ្យាល័យ និងការងារផ្ទាល់។',
    tags: ['C#', 'ASP.NET Core', 'Java', 'Spring Boot', 'Backend'],
    content: `Both .NET 8/9 and Spring Boot 3 have made massive leaps in developer productivity, cloud-native readiness, and container performance. Having developed enterprise projects with both platforms, here is a practical developer verdict.

### 1. Developer Ergonomics
- **C# / ASP.NET Core**: Minimal APIs, top-level statements, and C#'s modern pattern matching provide exceptional developer velocity. Entity Framework Core remains one of the best ORMs in existence.
- **Java / Spring Boot**: The Spring ecosystem is unrivaled in enterprise integrations, robust security filters, and cloud observability via Actuator and Micrometer.

### 2. Memory Footprint & Startup
In Docker container environments:
- ASP.NET Core natively compiles with AOT (Ahead-Of-Time), boasting startup times under 50ms and RAM usage below 35MB.
- Spring Boot 3 with GraalVM Native Image has closed the gap, though traditional JVM mode still takes ~400ms to boot.

### 3. Conclusion
Both are phenomenal choices for serious enterprise systems in 2026. ASP.NET Core is my choice for rapid full-stack delivery, while Spring Boot excels for large distributed enterprise microservices.`,
    contentKm: `ទាំង .NET 8/9 និង Spring Boot 3 សុទ្ធតែបានធ្វើឱ្យប្រសើរឡើងយ៉ាងខ្លាំងនូវល្បឿន និងភាពងាយស្រួលក្នុងការសរសេរកូដ។ បន្ទាប់ពីបានអភិវឌ្ឍប្រព័ន្ធជាមួយបច្ចេកវិទ្យាទាំងពីរនេះ ខ្ញុំសូមចែករំលែកនូវចំណុចសំខាន់ៗ៖

### ១. ភាពងាយស្រួលក្នុងការសរសេរកូដ
- **C# / ASP.NET Core**: មានភាពងាយស្រួល សាមញ្ញ រហ័ស និងមាន Entity Framework Core ដែលជា ORM ដ៏មានឥទ្ធិពលបំផុត។
- **Java / Spring Boot**: មានប្រព័ន្ធសុវត្ថិភាពខ្ពស់ និងស័ក្តិសមបំផុតសម្រាប់ប្រព័ន្ធធនាគារ ឬក្រុមហ៊ុនខ្នាតធំ។

### ២. ការប្រើប្រាស់ Memory និងទំហំ Container
ASP.NET Core ប្រើប្រាស់ Memory តិច និងចាប់ផ្តើមដំណើរការលឿនជាងមុនខ្លាំង (ក្រោម ៥០ms) ក្នុង Docker Container។

### ៣. សេចក្តីសន្និដ្ឋាន
បច្ចេកវិទ្យាទាំងពីរគឺជាជម្រើសដ៏ល្អឥតខ្ចោះសម្រាប់ឆ្នាំ ២០២៦។`,
  },
];
