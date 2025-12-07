import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { skills, Skill } from '../data/skills';

interface FallingSkill extends Skill {
  x: number;
  y: number; // Y-Position (top-left corner)
  rotation: number;
  isDragging: boolean;
  velocity: { x: number; y: number };
}

const CARD_WIDTH = 120;
const CARD_HEIGHT = 60;
const GRAVITY = 1.2; // Einfache Gravitation
const FRICTION = 0.95;

export const Skills = () => {
  const [fallingSkills, setFallingSkills] = useState<FallingSkill[]>([]);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<Set<string>>(new Set());
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.2,
  });

  // Initialisiere Elemente
  useEffect(() => {
    if (hasIntersected && !isActive && containerRef.current) {
      setIsActive(true);
      
      setTimeout(() => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth || 1200;
          
          const newFallingSkills: FallingSkill[] = skills.map((skill, index) => ({
            ...skill,
            x: Math.random() * (containerWidth - CARD_WIDTH),
            y: -CARD_HEIGHT - index * 30, // Startet oben außerhalb
            rotation: 0, // Keine Rotation für jetzt
            isDragging: false,
            velocity: {
              x: 0,
              y: 2 + Math.random() * 2, // Einfache Fallgeschwindigkeit
            },
          }));
          
          setFallingSkills(newFallingSkills);
        }
      }, 200);
    }
  }, [hasIntersected, isActive]);

  // Physik-Loop - EINFACH: Nur Fallen, keine Kollisionen
  useEffect(() => {
    if (!isActive || !containerRef.current || fallingSkills.length === 0) return;

    const containerHeight = containerRef.current.offsetHeight || 600;
    const containerWidth = containerRef.current.offsetWidth || 1200;
    const floorY = containerHeight - CARD_HEIGHT;

    const interval = setInterval(() => {
      setFallingSkills((prev) => {
        return prev.map((skill) => {
          // Überspringe wenn gedraggt wird
          if (isDraggingRef.current.has(skill.id)) {
            return skill;
          }

          // Einfache Physik: Nur Gravitation
          let newVelY = skill.velocity.y + GRAVITY;
          let newY = skill.y + newVelY;

          // Boden-Kollision (einfach)
          if (newY >= floorY) {
            newY = floorY;
            newVelY = 0; // Stoppt am Boden
          }

          // Seiten-Kollisionen (einfach)
          let newX = skill.x;
          let newVelX = skill.velocity.x * FRICTION;

          if (newX < 0) {
            newX = 0;
            newVelX = 0;
          } else if (newX > containerWidth - CARD_WIDTH) {
            newX = containerWidth - CARD_WIDTH;
            newVelX = 0;
          }

          return {
            ...skill,
            x: newX,
            y: newY,
            rotation: 0, // Keine Rotation
            velocity: {
              x: newVelX,
              y: newVelY,
            },
          };
        });
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isActive, fallingSkills.length]);

  // Drag & Drop - vereinfacht
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
      
      fallingSkills.forEach((skill) => {
        if (isDraggingRef.current.has(skill.id)) {
          const rect = containerRef.current!.getBoundingClientRect();
          const containerX = e.clientX - rect.left;
          const containerY = e.clientY - rect.top;

          setFallingSkills((prev) =>
            prev.map((s) =>
              s.id === skill.id
                ? {
                    ...s,
                    x: Math.max(0, Math.min(containerX - CARD_WIDTH / 2, rect.width - CARD_WIDTH)),
                    y: Math.max(0, Math.min(containerY - CARD_HEIGHT / 2, rect.height - CARD_HEIGHT)),
                  }
                : s
            )
          );
        }
      });
    };

    const handleGlobalMouseUp = () => {
      fallingSkills.forEach((skill) => {
        if (isDraggingRef.current.has(skill.id)) {
          isDraggingRef.current.delete(skill.id);
          setFallingSkills((prev) =>
            prev.map((s) =>
              s.id === skill.id
                ? { ...s, isDragging: false, velocity: { x: 0, y: 0 } }
                : s
            )
          );
        }
      });
    };

    if (fallingSkills.some((s) => s.isDragging)) {
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
  return (
    <div
      className={`absolute ${categoryColor} border-2 rounded-lg px-4 py-2 backdrop-blur-md cursor-grab active:cursor-grabbing shadow-lg select-none`}
      style={{
        left: `${skill.x}px`,
        top: `${skill.y}px`,
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`,
        zIndex: skill.isDragging ? 1000 : Math.floor(skill.y),
      }}
      onMouseDown={onMouseDown}
    >
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-sm font-bold text-center whitespace-nowrap">{skill.name}</p>
      </div>
    </div>
  );
};
