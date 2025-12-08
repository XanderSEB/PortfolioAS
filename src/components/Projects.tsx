import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { projects, ProjectType } from '../data/projects';
import { FaYoutube, FaExternalLinkAlt, FaCircle, FaBlog, FaMobileAlt, FaGlobe, FaCode } from 'react-icons/fa';

interface TabProps {
  project: typeof projects[0];
  index: number;
  scrollProgress: number;
  isActive: boolean;
  activeIndex: number;
  totalTabs: number;
}

// Helper function to get project icon - alle sind jetzt Blog-Beiträge
const getProjectIcon = (project: typeof projects[0]) => {
  // Alle Projekte sind Blog-Beiträge, aber wir können das Icon basierend auf verfügbaren Links variieren
  let iconConfig = { icon: FaBlog, color: 'bg-purple-600', size: 40 };
  
  // Wenn YouTube-Link vorhanden, zeige YouTube-Icon
  if (project.youtubeUrl && !project.websiteUrl && !project.appUrl) {
    iconConfig = { icon: FaYoutube, color: 'bg-red-600', size: 40 };
  }
  // Wenn App-Link vorhanden (ohne YouTube), zeige App-Icon
  else if (project.appUrl && !project.youtubeUrl) {
    iconConfig = { icon: FaMobileAlt, color: 'bg-green-600', size: 40 };
  }
  // Wenn Website-Link vorhanden (ohne YouTube/App), zeige Website-Icon
  else if (project.websiteUrl && !project.youtubeUrl && !project.appUrl) {
    iconConfig = { icon: FaGlobe, color: 'bg-blue-600', size: 40 };
  }
  // Standard: Blog-Icon
  else {
    iconConfig = { icon: FaBlog, color: 'bg-purple-600', size: 40 };
  }

  const Icon = iconConfig.icon;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className={`w-20 h-20 ${iconConfig.color} rounded-full flex items-center justify-center shadow-lg`}
        whileHover={{ scale: 1.1 }}
      >
        <Icon size={iconConfig.size} className="text-white" />
      </motion.div>
    </div>
  );
};

// Helper function to get action buttons based on project type
const getActionButtons = (project: typeof projects[0]) => {
  const buttons = [];

  if (project.youtubeUrl) {
    buttons.push(
      <motion.a
        key="youtube"
        href={project.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg text-xs border border-red-500/30 transition-colors"
        whileHover={{ scale: 1.05, x: 2 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaYoutube size={12} />
        YouTube
      </motion.a>
    );
  }

  if (project.blogUrl) {
    buttons.push(
      <Link key="blog" to={project.blogUrl}>
        <motion.div
          className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg text-xs border border-purple-500/30 transition-colors cursor-pointer"
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaBlog size={12} />
          Blog lesen
        </motion.div>
      </Link>
    );
  }

  if (project.appUrl) {
    buttons.push(
      <motion.a
        key="app"
        href={project.appUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-300 rounded-lg text-xs border border-green-500/30 transition-colors"
        whileHover={{ scale: 1.05, x: 2 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaMobileAlt size={12} />
        App öffnen
      </motion.a>
    );
  }

  if (project.websiteUrl) {
    buttons.push(
      <motion.a
        key="website"
        href={project.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg text-xs border border-blue-500/30 transition-colors"
        whileHover={{ scale: 1.05, x: 2 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaGlobe size={12} />
        Website
      </motion.a>
    );
  }

  return buttons.length > 0 ? buttons : null;
};

const Tab = ({ project, index, scrollProgress, isActive, activeIndex, totalTabs }: TabProps) => {
  // Berechne Position basierend auf Scroll-Progress
  // Jeder Tab hat einen eigenen Progress-Bereich
  const tabStart = index / totalTabs;
  const tabEnd = (index + 1) / totalTabs;
  const tabProgress = Math.max(0, Math.min(1, (scrollProgress - tabStart) / (tabEnd - tabStart)));
  
  // Smooth Easing Function (ease-in-out cubic)
  const smoothEase = (t: number) => {
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  
  const easedProgress = smoothEase(tabProgress);
  
  const getTabTransform = () => {
    // Berechne, wann dieser Tab von links hineinsliden soll
    // Größerer Bereich für längere Abstände zwischen Slides
    const slideInStart = index * (1.5 / totalTabs); // 1.5x länger für mehr Abstand
    const slideInEnd = slideInStart + (0.8 / totalTabs); // 80% des Bereichs zum Einsliden
    const slideProgress = Math.max(0, Math.min(1, (scrollProgress - slideInStart) / (slideInEnd - slideInStart)));
    
    // X-Position: Startet von links außerhalb (-1200px) und slidet hinein
    // Verwende smooth ease für sehr flüssiges slide-in
    const easedSlideProgress = smoothEase(slideProgress);
    const baseX = -1200 + (easedSlideProgress * 1200); // -1200px → 0px
    const x = Math.max(0, baseX); // Nach dem Einsliden bei 0 bleiben
    
    // Glatte Interpolation für aktiven Index (vermeidet Sprünge)
    // Angepasst für längere Abstände (1.5x)
    const smoothActiveIndex = activeIndex + (scrollProgress * totalTabs / 1.5 - activeIndex) * 0.1;
    const relativePosition = index - smoothActiveIndex;
    
    if (Math.abs(relativePosition) < 0.5) {
      // Aktiver Tab: zentriert, deutlich größer skaliert
      const activeProgress = Math.max(0, Math.min(1, 1 - Math.abs(relativePosition) * 2));
      const scale = 0.85 + (activeProgress * 0.20); // 0.85 → 1.05 (deutlich größer)
      const y = relativePosition * 80; // Mehr Abstand vertikal
      const rotation = relativePosition * 2; // -2° → 0° → 2°
      const zIndex = 100 + Math.floor(activeProgress * 50);
      
      return {
        x,
        y,
        scale,
        rotate: rotation,
        zIndex,
        opacity: Math.min(1, 0.5 + (slideProgress * 0.2) + (activeProgress * 0.3)), // Weniger transparent
      };
    } else if (relativePosition < 0) {
      // Tabs oberhalb des aktiven Tabs - deutlich kleiner und weniger sichtbar
      const offset = Math.abs(relativePosition);
      const y = -80 - (offset * 30); // Mehr Abstand
      const rotation = -2 - (offset * 0.5);
      const scale = 0.70 - (offset * 0.10); // Deutlich kleiner (0.70 → 0.60)
      const opacity = Math.max(0.1, Math.min(0.4, 0.2 + (slideProgress * 0.2) - (offset * 0.15))); // Viel weniger sichtbar
      
      return {
        x,
        y,
        scale,
        rotate: rotation,
        zIndex: 50 - Math.floor(offset * 10),
        opacity,
      };
    } else {
      // Tabs unterhalb des aktiven Tabs - deutlich kleiner und weniger sichtbar
      const offset = relativePosition;
      const y = 80 + (offset * 30); // Mehr Abstand
      const rotation = 2 + (offset * 0.5);
      const scale = 0.70 - (offset * 0.10); // Deutlich kleiner (0.70 → 0.60)
      const opacity = Math.max(0.1, Math.min(0.4, 0.2 + (slideProgress * 0.2) - (offset * 0.15))); // Viel weniger sichtbar
      
      return {
        x,
        y,
        scale,
        rotate: rotation,
        zIndex: 50 - Math.floor(offset * 10),
        opacity,
      };
    }
  };

  const transform = getTabTransform();

  // Verwende useMotionValue und useSpring für ultra-smooth Animationen
  const springConfig = { 
    stiffness: 50,  // Niedriger für smoothere Bewegung
    damping: 30,    // Höher für weniger Wackeln
    mass: 1.2       // Etwas höher für trägere, flüssigere Bewegung
  };

  const xMotion = useMotionValue(transform.x);
  const yMotion = useMotionValue(transform.y);
  const scaleMotion = useMotionValue(transform.scale);
  const rotateMotion = useMotionValue(transform.rotate);
  const opacityMotion = useMotionValue(transform.opacity);

  const x = useSpring(xMotion, springConfig);
  const y = useSpring(yMotion, springConfig);
  const scale = useSpring(scaleMotion, springConfig);
  const rotate = useSpring(rotateMotion, springConfig);
  const opacity = useSpring(opacityMotion, springConfig);

  // Update MotionValues wenn transform sich ändert
  useEffect(() => {
    xMotion.set(transform.x);
    yMotion.set(transform.y);
    scaleMotion.set(transform.scale);
    rotateMotion.set(transform.rotate);
    opacityMotion.set(transform.opacity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transform.x, transform.y, transform.scale, transform.rotate, transform.opacity]);

  return (
    <motion.div
      className="absolute w-full max-w-4xl"
      style={{
        x,
        y,
        scale,
        rotate,
        opacity,
        zIndex: transform.zIndex,
      }}
      whileHover={isActive && transform.x >= 0 ? { 
        y: transform.y - 10, 
        scale: transform.scale * 1.02,
        filter: 'brightness(1.1)',
      } : {}}
      transition={{
        type: 'spring',
        stiffness: 50,
        damping: 30,
        mass: 1.2,
      }}
    >
      {/* macOS Browser Tab Design */}
      <div 
        className="rounded-t-2xl overflow-hidden backdrop-blur-xl border border-white/30 shadow-[0_14px_40px_rgba(0,0,0,0.25)]"
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Top Bar - macOS Style */}
        <div className="bg-gradient-to-r from-slate-800/95 to-slate-700/95 px-4 py-3 flex items-center gap-3 border-b border-white/20">
          {/* Traffic Lights */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-inner" />
          </div>
          
          {/* Tab Bar */}
          <div className="flex-1 flex items-center gap-2 px-4 py-1.5 bg-slate-900/80 rounded-lg border border-white/20">
            {/* Favicon */}
            <div className="w-4 h-4 rounded bg-primary-500/50 flex items-center justify-center">
              <FaCircle className="text-primary-400 text-xs" />
            </div>
            
            {/* Title */}
            <span className="text-white/90 text-sm font-medium truncate flex-1">
              {project.title}
            </span>
            
            {/* Close Button */}
            <div className="w-3 h-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer" />
          </div>
        </div>

        {/* Content Preview */}
        <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 p-6">
          {/* Project Image/Preview */}
          <div className="w-full h-64 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative group">
            {getProjectIcon(project)}
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-white/70 mb-2 text-sm leading-relaxed line-clamp-2">
              {project.description}
            </p>
            {project.longDescription && (
              <p className="text-white/60 text-xs leading-relaxed line-clamp-2">
                {project.longDescription}
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs border border-primary-500/30"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {getActionButtons(project)}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-white/50 pt-4 border-t border-white/10">
            <span>{new Date(project.date).toLocaleDateString('de-DE')}</span>
            {project.featured && (
              <span className="px-2 py-1 bg-primary-500/30 text-primary-300 rounded text-xs">
                Featured
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const smoothProgressRef = useRef(0);

  // Scroll Progress Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transform scroll progress to 0-1 range for tab animation
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const unsubscribe = progress.on('change', (latest) => {
      // Smoothing für flüssigere Übergänge (Lerp)
      smoothProgressRef.current += (latest - smoothProgressRef.current) * 0.15;
      setScrollProgress(smoothProgressRef.current);
      
      // Berechne aktiven Tab basierend auf Scroll-Progress
      // Angepasst für längere Abstände - jeder Tab hat jetzt 1.5x mehr Raum
      const newActiveIndex = Math.min(
        Math.floor(smoothProgressRef.current * projects.length / 1.5),
        projects.length - 1
      );
      setActiveIndex(newActiveIndex);
    });

    return () => unsubscribe();
  }, [progress]);

  return (
    <section 
      id="projects" 
      className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Scroll Container für Animation - längere Abstände */}
      <div 
        ref={containerRef}
        className="relative"
        style={{ height: `${projects.length * 150}vh` }}
      >
        {/* Background with texture - sticky */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.95),rgba(2,6,23,1))] opacity-80" />
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="container mx-auto px-6 relative z-10 h-full flex flex-col">
            {/* Header */}
            <motion.div
              className="text-center pt-24 pb-8"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="gradient-text">Meine</span>{' '}
                <span className="text-white">Projekte</span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Eine Auswahl meiner besten Projekte und Arbeiten
              </p>
              <p className="text-sm text-white/50 mt-4">
                Scrollen Sie, um durch die Projekte zu navigieren
              </p>
            </motion.div>

            {/* Tab Stack Container - zentriert und sticky */}
            <div className="relative flex-1 flex items-center justify-center">
              <div className="relative w-full max-w-4xl h-[600px]">
                {projects.map((project, index) => (
                  <Tab
                    key={project.id}
                    project={project}
                    index={index}
                    scrollProgress={scrollProgress}
                    isActive={index === activeIndex}
                    activeIndex={activeIndex}
                    totalTabs={projects.length}
                  />
                ))}
              </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              className="pb-16 flex justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <motion.div
                  className="w-32 h-1 bg-white/10 rounded-full overflow-hidden"
                  initial={{ opacity: 0.5 }}
                >
                  <motion.div
                    className="h-full bg-primary-500 rounded-full"
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </motion.div>
                <span>{Math.round(scrollProgress * 100)}%</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
