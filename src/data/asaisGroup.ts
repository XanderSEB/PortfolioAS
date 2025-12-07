export interface ASAISGroupInfo {
  name: string;
  description: string;
  services: string[];
  values: string[];
  website?: string;
  contact?: {
    email?: string;
    phone?: string;
  };
}

export const asaisGroupInfo: ASAISGroupInfo = {
  name: 'ASAIS Group',
  description: 'ASAIS Group ist eine innovative Firma, die sich auf [Ihre Branche/Services] spezialisiert hat. Wir bieten maßgeschneiderte Lösungen für unsere Kunden.',
  services: [
    'Service 1',
    'Service 2',
    'Service 3',
  ],
  values: [
    'Innovation',
    'Qualität',
    'Kundenorientierung',
  ],
  website: 'https://www.asaisgroup.com',
  contact: {
    email: 'info@asaisgroup.com',
  },
};


