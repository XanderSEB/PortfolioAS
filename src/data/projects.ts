export interface Project {
  id: string;
  title: string;
  description: string;
  youtubeUrl?: string;
  imageUrl?: string;
  tags: string[];
  date: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Projekt 1',
    description: 'Beschreibung des ersten Projekts. Dies ist ein Platzhalter, der später durch echte Projekte ersetzt wird.',
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    tags: ['React', 'TypeScript', 'Design'],
    date: '2024-01-01',
  },
  {
    id: '2',
    title: 'Projekt 2',
    description: 'Beschreibung des zweiten Projekts. Dies ist ein Platzhalter, der später durch echte Projekte ersetzt wird.',
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    tags: ['Web Development', 'UI/UX'],
    date: '2024-02-01',
  },
  {
    id: '3',
    title: 'Projekt 3',
    description: 'Beschreibung des dritten Projekts. Dies ist ein Platzhalter, der später durch echte Projekte ersetzt wird.',
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    tags: ['Full Stack', 'API'],
    date: '2024-03-01',
  },
];

