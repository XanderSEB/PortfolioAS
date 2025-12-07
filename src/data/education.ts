export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
  achievements?: string[];
  type: 'experience' | 'education';
}

export const experience: EducationItem[] = [
  {
    id: 'exp-1',
    institution: 'Audi AG',
    degree: 'A13 Türen Montage',
    field: 'Montage',
    startDate: '06.2025',
    endDate: 'Heute',
    type: 'experience',
  },
  {
    id: 'exp-2',
    institution: 'MeQuEn GmbH',
    degree: 'Werkstudent',
    field: 'Webentwicklung, KI-Inhalte, Google Ads Lead-Generierung',
    startDate: '10.2024',
    endDate: '03.2025',
    type: 'experience',
  },
  {
    id: 'exp-3',
    institution: 'Audi AG',
    degree: 'Werkstudent Technische Entwicklung',
    field: 'Entwicklung von Test-Szenarien für autonomes Fahren',
    startDate: '04.2024',
    endDate: '10.2024',
    type: 'experience',
    achievements: [
      'Nutzung der CarMaker-API zur Simulation in Visual Studio',
      'Implementierung von dynamischen Tests für Vehicle-in-the-Loop Prüfständen',
    ],
  },
  {
    id: 'exp-4',
    institution: 'Audi AG',
    degree: 'Praxissemester Technische Entwicklung',
    field: 'Digitalisierung und Erneuerung der Prozessleittechnik',
    startDate: '09.2023',
    endDate: '03.2024',
    type: 'experience',
    achievements: [
      'Analyse und Visualisierung von Betriebs-, Prozess- und Messdaten',
      'Aufbau von Datenschnittstellen zwischen IT-Systemen',
      'Scrum Master in Entwicklungsteams',
    ],
  },
  {
    id: 'exp-5',
    institution: 'Audi AG',
    degree: 'Montage Neckarsulm & Ingolstadt',
    field: 'Montage',
    startDate: '07.2019',
    endDate: '03.2021',
    type: 'experience',
    achievements: [
      'Türen Montage Neckarsulm',
      'Plattenband B9 Facelift Ingolstadt',
    ],
  },
];

export const education: EducationItem[] = [
  {
    id: 'edu-1',
    institution: 'Hochschule Heilbronn',
    degree: 'Bachelor',
    field: 'Studium Software Engineering',
    startDate: '03.2021',
    endDate: '06.2025',
    type: 'education',
  },
  {
    id: 'edu-2',
    institution: 'Audi AG Neckarsulm',
    degree: 'Berufsausbildung',
    field: 'Fertigungsmechaniker',
    startDate: '06.2016',
    endDate: '09.2019',
    type: 'education',
  },
];


