import { motion } from 'framer-motion';
import { ScrollAnimations } from './ScrollAnimations';
import { projects } from '../data/projects';
import { FaYoutube, FaExternalLinkAlt } from 'react-icons/fa';

export const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-slate-800">
      <div className="container mx-auto px-6">
        <ScrollAnimations direction="fade">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Meine</span>{' '}
              <span className="text-white">Projekte</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Eine Auswahl meiner besten Projekte und Arbeiten
            </p>
          </div>
        </ScrollAnimations>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ScrollAnimations
              key={project.id}
              direction="up"
              delay={index * 0.1}
            >
              <motion.div
                className="glass rounded-2xl p-6 hover:bg-white/10 transition-all group cursor-pointer"
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (project.youtubeUrl) {
                    window.open(project.youtubeUrl, '_blank');
                  }
                }}
              >
                {/* Project Image Placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative">
                  {project.youtubeUrl ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <FaYoutube size={40} className="text-white" />
                      </motion.div>
                    </div>
                  ) : (
                    <div className="text-white/50 text-4xl">📹</div>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/70 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Date and Link */}
                <div className="flex items-center justify-between text-sm text-white/50">
                  <span>{new Date(project.date).toLocaleDateString('de-DE')}</span>
                  {project.youtubeUrl && (
                    <motion.a
                      href={project.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary-400 hover:text-primary-300"
                      whileHover={{ x: 5 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Ansehen <FaExternalLinkAlt size={12} />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </ScrollAnimations>
          ))}
        </div>
      </div>
    </section>
  );
};

