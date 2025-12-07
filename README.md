# Portfolio AS

Eine moderne Portfolio-Webseite im Stil von SendPotion, erstellt mit React, TypeScript und Framer Motion.

## Features

- 🎨 **Modernes Design** - Inspiriert von SendPotion mit Glassmorphism-Effekten
- 🖱️ **Custom Cursor** - Interaktiver Cursor-Tracker mit Delay-Effekt
- ✨ **Scroll-Animationen** - Dynamische Animationen beim Scrollen
- 📱 **Responsive Design** - Optimiert für Mobile, Tablet und Desktop
- 🎯 **Interaktive Elemente** - Hover-Effekte und 3D-Transformationen
- 🚀 **Railway Ready** - Vorbereitet für Deployment auf Railway

## Tech Stack

- **React 18** mit TypeScript
- **Vite** - Schneller Build-Tool
- **Framer Motion** - Animationen
- **Tailwind CSS** - Styling
- **React Icons** - Icons

## Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build erstellen
npm run build

# Preview Production Build
npm run preview
```

## Projektstruktur

```
PortfolioAS/
├── src/
│   ├── components/      # React Komponenten
│   ├── hooks/           # Custom Hooks
│   ├── data/            # Datenstrukturen
│   └── styles/          # Globale Styles
├── public/              # Statische Assets
└── railway.json         # Railway Deployment Config
```

## Sektionen

- **Hero** - Hauptbereich mit animiertem Text
- **Projekte** - Portfolio-Projekte mit YouTube-Links
- **Bildung** - Bildungsweg und Qualifikationen
- **ASAIS Group** - Firmeninformationen
- **Kontakt** - Footer mit Social Links

## Daten anpassen

Die Platzhalter-Daten können in folgenden Dateien angepasst werden:

- `src/data/projects.ts` - Projekte
- `src/data/education.ts` - Bildung
- `src/data/asaisGroup.ts` - ASAIS Group Informationen

## Deployment auf Railway

1. Projekt auf GitHub pushen
2. Railway-Projekt erstellen
3. GitHub-Repository verbinden
4. Railway erkennt automatisch die `railway.json` Konfiguration
5. Deployment startet automatisch

## Anpassungen

### Farben
Farben können in `tailwind.config.js` angepasst werden.

### Animationen
Animationen werden mit Framer Motion gesteuert und können in den jeweiligen Komponenten angepasst werden.

### Cursor
Der Custom Cursor wird automatisch auf Touch-Geräten deaktiviert.

## Browser Support

- Chrome (neueste Version)
- Firefox (neueste Version)
- Safari (neueste Version)
- Edge (neueste Version)

## License

Alle Rechte vorbehalten.
