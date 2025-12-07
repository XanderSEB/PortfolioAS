export interface Skill {
  id: string;
  name: string;
  category: 'language' | 'framework' | 'tool' | 'software' | 'technology';
  icon?: string;
  color?: string;
}

export const skills: Skill[] = [
  { id: '1', name: 'React', category: 'framework', color: '#61DAFB' },
  { id: '2', name: 'TypeScript', category: 'language', color: '#3178C6' },
  { id: '3', name: 'JavaScript', category: 'language', color: '#F7DF1E' },
  { id: '4', name: 'Node.js', category: 'framework', color: '#339933' },
  { id: '5', name: 'Python', category: 'language', color: '#3776AB' },
  { id: '6', name: 'Java', category: 'language', color: '#ED8B00' },
  { id: '7', name: 'HTML5', category: 'language', color: '#E34F26' },
  { id: '8', name: 'CSS3', category: 'language', color: '#1572B6' },
  { id: '9', name: 'Tailwind CSS', category: 'framework', color: '#06B6D4' },
  { id: '10', name: 'Vue.js', category: 'framework', color: '#4FC08D' },
  { id: '11', name: 'Git', category: 'tool', color: '#F05032' },
  { id: '12', name: 'Docker', category: 'tool', color: '#2496ED' },
  { id: '13', name: 'MongoDB', category: 'technology', color: '#47A248' },
  { id: '14', name: 'PostgreSQL', category: 'technology', color: '#336791' },
  { id: '15', name: 'Figma', category: 'software', color: '#F24E1E' },
  { id: '16', name: 'VS Code', category: 'software', color: '#007ACC' },
  { id: '17', name: 'AWS', category: 'technology', color: '#232F3E' },
  { id: '18', name: 'Linux', category: 'technology', color: '#FCC624' },
  { id: '19', name: 'Unity', category: 'software', color: '#000000' },
  { id: '20', name: 'CarMaker', category: 'software', color: '#0066CC' },
  { id: '21', name: 'Grafana', category: 'tool', color: '#F46800' },
  { id: '22', name: 'Blender', category: 'software', color: '#F5792A' },
  { id: '23', name: 'Railway', category: 'technology', color: '#0B0D0E' },
  { id: '24', name: 'Supabase', category: 'technology', color: '#3ECF8E' },
  { id: '25', name: 'Django', category: 'framework', color: '#092E20' },
  { id: '26', name: 'Spring', category: 'framework', color: '#6DB33F' },
  { id: '27', name: 'Vite', category: 'tool', color: '#646CFF' },
  { id: '28', name: 'C#', category: 'language', color: '#239120' },
];


