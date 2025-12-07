import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { skills, Skill } from '../data/skills';

interface FallingSkill extends Skill {
  x: number;
  y: number; // Y-Position (top-left corner)
  rotation: number;
  angularVelocity: number; // Rotationsgeschwindigkeit
  isDragging: boolean;
  velocity: { x: number; y: number };
}

const CARD_WIDTH = 100;
const CARD_HEIGHT = 40;
const GRAVITY = 0.001; // Schwächere Gravitation (wie auf dem Mond)
const FRICTION = 7; // Reibung
const AIR_RESISTANCE = 1; // Leichter Luftwiderstand
const MAX_VELOCITY = 1.1; // Maximale Geschwindigkeit (langsam)
const ANGULAR_FRICTION = 0.95; // Reibung für Rotation

export const Skills = () => {
  const [fallingSkills, setFallingSkills] = useState<FallingSkill[]>([]);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<Set<string>>(new Set());
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.2,
  });

  // Initialisiere alle Elemente gleichzeitig
  useEffect(() => {
    if (hasIntersected && !isActive && containerRef.current) {
      setIsActive(true);
      
      setTimeout(() => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth || 1200;
          
          // Verwende alle Elemente
          // Alle Elemente gleichzeitig initialisieren
          const newFallingSkills: FallingSkill[] = skills.map((skill, index) => ({
            ...skill,
            x: Math.random() * (containerWidth - CARD_WIDTH),
            y: -CARD_HEIGHT - index * 40, // Startet oben außerhalb
            rotation: (Math.random() - 0.5) * Math.PI * 2,
            angularVelocity: (Math.random() - 0.5) * 0.1, // Initiale Rotationsgeschwindigkeit
            isDragging: false,
            velocity: {
              x: (Math.random() - 0.5) * 1.5, // Langsamere initiale horizontale Bewegung
              y: 1 + Math.random() * 1, // Initiale Fallgeschwindigkeit (mit Gravitation)
            },
          }));
          
          setFallingSkills(newFallingSkills);
        }
      }, 200);
    }
  }, [hasIntersected, isActive]);

  // Kollisionserkennung zwischen Elementen entfernt - Elemente können sich berühren

  // Physik-Loop mit Gummiball-Animation und Element-zu-Element Kollisionen
  useEffect(() => {
    if (!isActive || !containerRef.current || fallingSkills.length === 0) return;

    const containerHeight = containerRef.current.offsetHeight || 600;
    const containerWidth = containerRef.current.offsetWidth || 1200;
    const floorY = containerHeight - CARD_HEIGHT;
    const ceilingY = 0;

    const interval = setInterval(() => {
      setFallingSkills((prev) => {
        // Erstelle eine Kopie für Kollisionserkennung
        const updatedSkills = prev.map((skill) => {
          // Überspringe wenn gedraggt wird
          if (isDraggingRef.current.has(skill.id)) {
            return skill;
          }

          // Physik: Schwächere Gravitation (wie auf dem Mond)
          let newVelY = skill.velocity.y + GRAVITY; // Gravitation hinzufügen
          newVelY *= AIR_RESISTANCE;
          
          // Begrenze Geschwindigkeit
          if (Math.abs(newVelY) > MAX_VELOCITY) {
            newVelY = newVelY > 0 ? MAX_VELOCITY : -MAX_VELOCITY;
          }
          
          let newY = skill.y + newVelY;

          // Horizontale Bewegung
          let newVelX = skill.velocity.x * FRICTION * AIR_RESISTANCE;
          
          // Begrenze Geschwindigkeit
          if (Math.abs(newVelX) > MAX_VELOCITY) {
            newVelX = newVelX > 0 ? MAX_VELOCITY : -MAX_VELOCITY;
          }
          
          let newX = skill.x + newVelX;

          // Rotation durch Wand-Kollision - wird bei jedem Wandkontakt gesetzt und läuft kontinuierlich
          let newAngularVelocity = skill.angularVelocity;
          let wallHit = false;

          // Seiten-Kollisionen - Elemente fliegen in andere Richtung
          if (newX < 0) {
            newX = 0;
            // Zufällige neue Richtung
            newVelX = (Math.random() - 0.5) * MAX_VELOCITY * 2;
            newVelY = (Math.random() - 0.5) * MAX_VELOCITY * 2;
            // Langsamere kontinuierliche Rotation nach rechts oder links
            newAngularVelocity = (Math.random() > 0.5 ? 1 : -1) * (0.02 + Math.random() * 0.03);
            wallHit = true;
          } else if (newX > containerWidth - CARD_WIDTH) {
            newX = containerWidth - CARD_WIDTH;
            // Zufällige neue Richtung
            newVelX = (Math.random() - 0.5) * MAX_VELOCITY * 2;
            newVelY = (Math.random() - 0.5) * MAX_VELOCITY * 2;
            // Langsamere kontinuierliche Rotation nach rechts oder links
            newAngularVelocity = (Math.random() > 0.5 ? 1 : -1) * (0.02 + Math.random() * 0.03);
            wallHit = true;
          }

          // Boden-Kollision - Elemente fliegen in andere Richtung
          if (newY >= floorY) {
            newY = floorY;
            // Zufällige neue Richtung (mehr nach oben)
            newVelX = (Math.random() - 0.5) * MAX_VELOCITY * 2;
            newVelY = -Math.abs((Math.random() - 0.5) * MAX_VELOCITY * 2); // Nach oben
            // Langsamere kontinuierliche Rotation nach rechts oder links
            newAngularVelocity = (Math.random() > 0.5 ? 1 : -1) * (0.02 + Math.random() * 0.03);
            wallHit = true;
          }

          // Decken-Kollision - Elemente fliegen in andere Richtung
          if (newY <= ceilingY) {
            newY = ceilingY;
            // Zufällige neue Richtung (mehr nach unten)
            newVelX = (Math.random() - 0.5) * MAX_VELOCITY * 2;
            newVelY = Math.abs((Math.random() - 0.5) * MAX_VELOCITY * 2); // Nach unten
            // Langsamere kontinuierliche Rotation nach rechts oder links
            newAngularVelocity = (Math.random() > 0.5 ? 1 : -1) * (0.02 + Math.random() * 0.03);
            wallHit = true;
          }

          // Kontinuierliche Rotation: Wenn keine Wand-Kollision, behalte aktuelle Rotation (verlangsamt durch Reibung)
          if (!wallHit) {
            // Rotation verlangsamt sich langsam durch Reibung, bleibt aber kontinuierlich
            newAngularVelocity = skill.angularVelocity * (ANGULAR_FRICTION + 0.01); // Sehr langsame Verlangsamung
          }
          
          // Wende kontinuierliche Rotation an
          let newRotation = skill.rotation + newAngularVelocity;

          return {
            ...skill,
            x: newX,
            y: newY,
            rotation: newRotation,
            angularVelocity: newAngularVelocity,
            velocity: {
              x: newVelX,
              y: newVelY,
            },
          };
        });

        // Keine Kollisionserkennung zwischen Elementen - Elemente können sich berühren
        return updatedSkills.map((skill) => {
          // Rotation wird weiterhin durch Reibung verlangsamt
          return {
            ...skill,
            rotation: skill.rotation + skill.angularVelocity,
            angularVelocity: skill.angularVelocity * ANGULAR_FRICTION,
          };
        });
      });
    }, 16);

    return () => clearInterval(interval);
  }, [isActive, fallingSkills.length]);

  // Drag & Drop
  const handleMouseDown = (skillId: string, e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current.add(skillId);
    setFallingSkills((prev) =>
      prev.map((skill) =>
        skill.id === skillId ? { ...skill, isDragging: true } : skill
      )
    );
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Finde das Element, das gerade gedraggt wird (sollte nur eines sein)
      const draggedSkillId = Array.from(isDraggingRef.current)[0];
      if (!draggedSkillId) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerX = e.clientX - rect.left;
      const containerY = e.clientY - rect.top;

      // Berechne die Position relativ zur Maus (Maus ist in der Mitte des Elements)
      const newX = Math.max(0, Math.min(containerX - CARD_WIDTH / 2, rect.width - CARD_WIDTH));
      const newY = Math.max(0, Math.min(containerY - CARD_HEIGHT / 2, rect.height - CARD_HEIGHT));

      // Aktualisiere NUR das gedraggte Element - behalte alle anderen Eigenschaften
      setFallingSkills((prev) =>
        prev.map((s) =>
          s.id === draggedSkillId
            ? {
                ...s,
                x: newX,
                y: newY,
                // WICHTIG: Behalte alle anderen Eigenschaften (rotation, velocity, etc.)
              }
            : s // Alle anderen Elemente bleiben unverändert
        )
      );
    };

    const handleGlobalMouseUp = () => {
      // Finde alle gedraggten Elemente und stoppe sie
      const draggedIds = Array.from(isDraggingRef.current);
      
      if (draggedIds.length > 0) {
        draggedIds.forEach((skillId) => {
          isDraggingRef.current.delete(skillId);
        });

        // Setze isDragging auf false und reset velocity, aber behalte Position
        setFallingSkills((prev) =>
          prev.map((s) =>
            draggedIds.includes(s.id)
              ? { 
                  ...s, 
                  isDragging: false, 
                  velocity: { x: 0, y: 0 },
                  // WICHTIG: Behalte x, y, rotation - Element bleibt sichtbar!
                }
              : s
          )
        );
      }
    };

    if (isDraggingRef.current.size > 0) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [fallingSkills]);

  const getCategoryColor = (category: Skill['category']) => {
    switch (category) {
      case 'language':
        return 'bg-blue-500/30 border-blue-400/60 text-blue-200';
      case 'framework':
        return 'bg-purple-500/30 border-purple-400/60 text-purple-200';
      case 'tool':
        return 'bg-green-500/30 border-green-400/60 text-green-200';
      case 'software':
        return 'bg-orange-500/30 border-orange-400/60 text-orange-200';
      case 'technology':
        return 'bg-pink-500/30 border-pink-400/60 text-pink-200';
      default:
        return 'bg-gray-500/30 border-gray-400/60 text-gray-200';
    }
  };

  return (
    <section
      id="skills"
      ref={elementRef as React.RefObject<HTMLElement>}
      className="relative py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, x: -100 }}
          animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Technologien</span>{' '}
            <span className="text-white">& Skills</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Programmiersprachen, Frameworks und Tools, die ich verwendet habe
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative mx-auto bg-slate-900/50 rounded-2xl border-2 border-slate-700/50 overflow-hidden"
          style={{ height: '600px', maxWidth: '1200px', minHeight: '600px' }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

          {fallingSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              categoryColor={getCategoryColor(skill.category)}
              onMouseDown={(e) => handleMouseDown(skill.id, e)}
            />
          ))}
        </div>

        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="glass rounded-2xl p-8 md:p-12 text-center">
            <motion.h3
              className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={hasIntersected ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Meine Tech-Stack
            </motion.h3>
            <motion.p
              className="text-lg md:text-xl text-white/80 leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={hasIntersected ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Über die Jahre habe ich mit einer Vielzahl moderner Technologien gearbeitet.
              Von Programmiersprachen wie <span className="text-primary-400 font-semibold">TypeScript</span> und{' '}
              <span className="text-primary-400 font-semibold">Python</span> bis hin zu
              Frameworks wie <span className="text-purple-400 font-semibold">React</span> und{' '}
              <span className="text-purple-400 font-semibold">Node.js</span>.
            </motion.p>
            <motion.p
              className="text-lg md:text-xl text-white/80 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={hasIntersected ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              Jede Technologie bringt ihre eigenen Herausforderungen und Möglichkeiten mit sich.
              Durch kontinuierliches Lernen und Experimentieren baue ich mein Wissen stetig aus
              und passe mich an die sich schnell entwickelnde Tech-Landschaft an.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              {['Modern', 'Innovativ', 'Skalierbar', 'Performant'].map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-4 py-2 bg-primary-500/20 border border-primary-500/50 rounded-full text-primary-300 text-sm font-semibold"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={hasIntersected ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 1.4 + index * 0.1,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface SkillCardProps {
  skill: FallingSkill;
  categoryColor: string;
  onMouseDown: (e: React.MouseEvent) => void;
}

const SkillCard = ({ skill, categoryColor, onMouseDown }: SkillCardProps) => {
  // Stelle sicher, dass die Position immer gültig ist
  const x = Math.max(0, skill.x);
  const y = Math.max(0, skill.y);

  return (
    <div
      className={`absolute ${categoryColor} border-2 rounded-lg px-4 py-2 backdrop-blur-md cursor-grab active:cursor-grabbing shadow-lg select-none`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`,
        transform: `rotate(${skill.rotation}rad)`,
        transformOrigin: 'center center',
        zIndex: skill.isDragging ? 1000 : Math.floor(skill.y),
        opacity: 1, // Stelle sicher, dass Element immer sichtbar ist
        visibility: 'visible', // Stelle sicher, dass Element immer sichtbar ist
      }}
      onMouseDown={onMouseDown}
    >
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-sm font-bold text-center whitespace-nowrap">{skill.name}</p>
      </div>
    </div>
  );
};
1