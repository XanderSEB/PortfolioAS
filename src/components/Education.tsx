import { motion } from 'framer-motion';
import { ScrollAnimations } from './ScrollAnimations';
import { experience, education } from '../data/education';
import { FaGraduationCap, FaCalendarAlt, FaBriefcase } from 'react-icons/fa';

interface EducationItemCardProps {
  item: typeof experience[0];
  index: number;
}

const EducationItemCard = ({ item, index }: EducationItemCardProps) => {
  const isExperience = item.type === 'experience';
  
  return (
    <ScrollAnimations
      key={item.id}
      direction="left"
      delay={index * 0.2}
    >
      <motion.div
        className="glass rounded-2xl p-8 hover:bg-white/10 transition-all"
        whileHover={{ x: 10, scale: 1.02 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-start gap-6">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className={`w-16 h-16 bg-gradient-to-br rounded-full flex items-center justify-center ${
              isExperience 
                ? 'from-orange-500 to-red-500' 
                : 'from-primary-500 to-purple-500'
            }`}>
              {isExperience ? (
                <FaBriefcase size={24} className="text-white" />
              ) : (
                <FaGraduationCap size={24} className="text-white" />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-white mb-2">
              {item.degree}
            </h3>
            <p className="text-xl text-primary-400 mb-2">
              {item.field}
            </p>
            <p className="text-lg text-white/80 mb-4">
              {item.institution}
            </p>

            {/* Date */}
            <div className="flex items-center gap-2 text-white/60 mb-4">
              <FaCalendarAlt size={14} />
              <span>
                {item.startDate} - {item.endDate || 'Heute'}
              </span>
            </div>

            {/* Description */}
            {item.description && (
              <p className="text-white/70 mb-4">{item.description}</p>
            )}

            {/* Achievements */}
            {item.achievements && item.achievements.length > 0 && (
              <div>
                <h4 className="text-white font-semibold mb-2">
                  {isExperience ? 'Aufgaben & Verantwortungen:' : 'Erfolge:'}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-white/70">
                  {item.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </ScrollAnimations>
  );
};

export const Education = () => {
  return (
    <section id="education" className="py-24 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-6">
        <ScrollAnimations direction="fade">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Bildung</span>{' '}
              <span className="text-white">& Ausbildung</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Mein Bildungsweg, akademische Qualifikationen und Berufserfahrung
            </p>
          </div>
        </ScrollAnimations>

        <div className="max-w-4xl mx-auto space-y-16">
          {/* Erfahrung Section */}
          <div>
            <ScrollAnimations direction="fade">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center gap-3">
                <FaBriefcase className="text-orange-400" />
                <span className="gradient-text">Erfahrung</span>
              </h3>
            </ScrollAnimations>
            <div className="space-y-8">
              {experience.map((item, index) => (
                <EducationItemCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>

          {/* Ausbildung Section */}
          <div>
            <ScrollAnimations direction="fade">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center gap-3">
                <FaGraduationCap className="text-primary-400" />
                <span className="gradient-text">Ausbildung</span>
              </h3>
            </ScrollAnimations>
            <div className="space-y-8">
              {education.map((item, index) => (
                <EducationItemCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


