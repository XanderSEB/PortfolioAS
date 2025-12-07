export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
  achievements?: string[];
}

export const education: EducationItem[] = [
  {
    id: '1',
    institution: 'Universität / Hochschule',
    degree: 'Bachelor / Master',
    field: 'Fachrichtung',
    startDate: '2020',
    endDate: '2024',
    description: 'Beschreibung der Ausbildung',
    achievements: [
      'Erfolg 1',
      'Erfolg 2',
      'Erfolg 3',
    ],
  },
];

