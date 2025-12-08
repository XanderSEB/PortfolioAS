export type ProjectType = 'youtube' | 'blog' | 'app' | 'website';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string; // Erweiterte Beschreibung für Blog-Posts
  type: ProjectType;
  youtubeUrl?: string;
  blogUrl?: string; // URL für Blog-Post/Subpage
  appUrl?: string; // URL für App-Download oder Demo
  websiteUrl?: string; // URL für Website
  imageUrl?: string;
  tags: string[];
  date: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'YouTube Projekt - React Portfolio Website',
    description: 'Ein detaillierter Blog-Post über die Entwicklung meiner Portfolio-Website. Erfahren Sie mehr über die verwendeten Technologien, Design-Entscheidungen und die Herausforderungen bei der Umsetzung.',
    longDescription: 'In diesem Blog-Post teile ich meine Erfahrungen bei der Entwicklung meiner Portfolio-Website. Ich erkläre, warum ich React und TypeScript gewählt habe, wie ich die scroll-getriebenen Animationen implementiert habe und welche Design-Prinzipien ich befolgt habe. Außerdem zeige ich Code-Beispiele und teile Lessons Learned aus dem Projekt.',
    type: 'blog',
    blogUrl: '/blog/youtube-projekt-react-portfolio',
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    tags: ['React', 'TypeScript', 'Design', 'Video', 'Portfolio'],
    date: '2024-01-15',
    featured: true,
  },
  {
    id: '2',
    title: 'Web Development Best Practices',
    description: 'Ein ausführlicher Blog-Post über Best Practices im Web Development. Lesen Sie mehr über meine Erfahrungen, Erkenntnisse und bewährte Methoden.',
    longDescription: 'Dies ist ein ausführlicher Blog-Post, in dem ich über meine Erfahrungen im Web Development schreibe. Ich teile Best Practices für Code-Organisation, Performance-Optimierung, Accessibility und vieles mehr. Hier finden Sie detaillierte Informationen, Code-Beispiele und praktische Tipps für Ihre eigenen Projekte.',
    type: 'blog',
    blogUrl: '/blog/web-development-best-practices',
    websiteUrl: 'https://example-app.com',
    tags: ['Web Development', 'UI/UX', 'Tutorial', 'Best Practices'],
    date: '2024-02-20',
  },
  {
    id: '3',
    title: 'Mobile App Entwicklung mit React Native',
    description: 'Ein Blog-Post über die Entwicklung einer mobilen App mit React Native. Erfahren Sie mehr über den Entwicklungsprozess, die Herausforderungen und die Lösungen.',
    longDescription: 'In diesem Blog-Post beschreibe ich meinen Weg bei der Entwicklung einer mobilen App mit React Native. Ich teile meine Erfahrungen mit Cross-Platform-Entwicklung, Performance-Optimierung und dem Deployment-Prozess für iOS und Android. Außerdem zeige ich Code-Beispiele und erkläre, wie ich bestimmte Features implementiert habe.',
    type: 'blog',
    blogUrl: '/blog/mobile-app-react-native',
    appUrl: 'https://apps.apple.com/example',
    tags: ['React Native', 'Mobile', 'iOS', 'Android', 'Cross-Platform'],
    date: '2024-03-10',
    featured: true,
  },
  {
    id: '4',
    title: 'Full Stack Web Application - Von der Idee zur Umsetzung',
    description: 'Ein detaillierter Blog-Post über die Entwicklung einer vollständigen Web-Anwendung. Erfahren Sie mehr über Backend-Architektur, API-Design und Frontend-Integration.',
    longDescription: 'Dieser Blog-Post führt Sie durch den kompletten Entwicklungsprozess einer Full Stack Web-Anwendung. Ich erkläre die Architektur-Entscheidungen, zeige wie ich die API entwickelt habe und wie Frontend und Backend zusammenarbeiten. Außerdem teile ich Erfahrungen mit Datenbank-Design, Authentication und Deployment in der Cloud.',
    type: 'blog',
    blogUrl: '/blog/full-stack-web-application',
    websiteUrl: 'https://example-app.com',
    tags: ['Full Stack', 'API', 'Database', 'Cloud', 'Backend'],
    date: '2024-04-05',
  },
  {
    id: '5',
    title: 'TypeScript Advanced Patterns',
    description: 'Ein tiefer Einblick in fortgeschrittene TypeScript-Patterns und Best Practices. Lernen Sie aus meinen Erfahrungen mit komplexen Type-Systemen.',
    longDescription: 'In diesem technischen Blog-Post teile ich meine Erfahrungen mit fortgeschrittenen TypeScript-Patterns. Ich erkläre Generics, Conditional Types, Mapped Types und zeige praktische Anwendungsfälle. Sie finden Code-Beispiele, Best Practices und Tipps, wie Sie TypeScript effektiver in Ihren Projekten einsetzen können.',
    type: 'blog',
    blogUrl: '/blog/typescript-advanced-patterns',
    youtubeUrl: 'https://www.youtube.com/watch?v=example2',
    tags: ['TypeScript', 'Tutorial', 'Code', 'Best Practices', 'Advanced'],
    date: '2024-05-12',
  },
  {
    id: '6',
    title: 'Desktop Applikation mit Electron',
    description: 'Ein Blog-Post über die Entwicklung einer Desktop-Anwendung mit Electron. Erfahren Sie mehr über Cross-Platform-Entwicklung und native Integration.',
    longDescription: 'Dieser Blog-Post beschreibt die Entwicklung einer professionellen Desktop-Anwendung mit Electron. Ich teile meine Erfahrungen mit der Integration von nativen Features, Performance-Optimierung und dem Packaging-Prozess für verschiedene Betriebssysteme. Außerdem zeige ich, wie ich bestimmte Herausforderungen gelöst habe und welche Tools ich verwendet habe.',
    type: 'blog',
    blogUrl: '/blog/desktop-applikation-electron',
    appUrl: 'https://github.com/example/desktop-app',
    websiteUrl: 'https://example-app.com',
    tags: ['Electron', 'Desktop', 'Cross-Platform', 'Professional', 'Native'],
    date: '2024-06-18',
  },
  {
    id: '7',
    title: 'UI/UX Design Prinzipien für moderne Web-Apps',
    description: 'Ein umfassender Blog-Post über UI/UX Design-Prinzipien und wie man benutzerfreundliche Web-Anwendungen erstellt. Lernen Sie aus meinen Erfahrungen im Design-Prozess.',
    longDescription: 'In diesem Blog-Post teile ich meine Erfahrungen mit UI/UX Design für moderne Web-Anwendungen. Ich erkläre wichtige Design-Prinzipien, zeige Beispiele für gute und schlechte UX-Patterns und gebe praktische Tipps für die Umsetzung. Außerdem zeige ich, wie ich Design-Tools verwende und wie ich mit Designern zusammenarbeite.',
    type: 'blog',
    blogUrl: '/blog/ui-ux-design-prinzipien',
    websiteUrl: 'https://example-design.com',
    youtubeUrl: 'https://www.youtube.com/watch?v=example3',
    tags: ['UI/UX', 'Design', 'User Experience', 'Web Design', 'Figma'],
    date: '2024-07-25',
  },
  {
    id: '8',
    title: 'Performance-Optimierung für React-Anwendungen',
    description: 'Ein technischer Blog-Post über Performance-Optimierung in React. Erfahren Sie, wie Sie Ihre React-Anwendungen schneller und effizienter machen.',
    longDescription: 'Dieser Blog-Post behandelt verschiedene Techniken zur Performance-Optimierung von React-Anwendungen. Ich erkläre React.memo, useMemo, useCallback, Code-Splitting, Lazy Loading und viele weitere Optimierungsstrategien. Außerdem zeige ich praktische Beispiele und messe die Performance-Verbesserungen.',
    type: 'blog',
    blogUrl: '/blog/performance-optimierung-react',
    websiteUrl: 'https://example-performance.com',
    tags: ['React', 'Performance', 'Optimization', 'Web Vitals', 'Code Splitting'],
    date: '2024-08-30',
    featured: true,
  },
];


