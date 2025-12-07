import { motion } from 'framer-motion';
import { ScrollAnimations } from './ScrollAnimations';
import { asaisGroupInfo } from '../data/asaisGroup';
import { FaBuilding, FaEnvelope, FaGlobe, FaCheckCircle } from 'react-icons/fa';

export const ASAISGroup = () => {
  return (
    <section id="asais" className="py-24 bg-slate-800">
      <div className="container mx-auto px-6">
        <ScrollAnimations direction="fade">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">ASAIS</span>{' '}
              <span className="text-white">Group</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Informationen über unsere Firma und unsere Werte
            </p>
          </div>
        </ScrollAnimations>

        <div className="max-w-6xl mx-auto">
          {/* Main Info Card */}
          <ScrollAnimations direction="up">
            <motion.div
              className="glass rounded-2xl p-8 md:p-12 mb-12"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center">
                  <FaBuilding size={28} className="text-white" />
                </div>
                <h3 className="text-4xl font-bold text-white">{asaisGroupInfo.name}</h3>
              </div>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                {asaisGroupInfo.description}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-6">
                {asaisGroupInfo.website && (
                  <motion.a
                    href={asaisGroupInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <FaGlobe size={18} />
                    <span>Website besuchen</span>
                  </motion.a>
                )}
                {asaisGroupInfo.contact?.email && (
                  <motion.a
                    href={`mailto:${asaisGroupInfo.contact.email}`}
                    className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <FaEnvelope size={18} />
                    <span>{asaisGroupInfo.contact.email}</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </ScrollAnimations>

          {/* Services and Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Services */}
            <ScrollAnimations direction="right" delay={0.2}>
              <motion.div
                className="glass rounded-2xl p-8"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-primary-500 rounded-full" />
                  Unsere Services
                </h3>
                <ul className="space-y-4">
                  {asaisGroupInfo.services.map((service, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-3 text-white/80 text-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <FaCheckCircle className="text-primary-400 flex-shrink-0" />
                      <span>{service}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </ScrollAnimations>

            {/* Values */}
            <ScrollAnimations direction="left" delay={0.2}>
              <motion.div
                className="glass rounded-2xl p-8"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-purple-500 rounded-full" />
                  Unsere Werte
                </h3>
                <ul className="space-y-4">
                  {asaisGroupInfo.values.map((value, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-3 text-white/80 text-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <FaCheckCircle className="text-purple-400 flex-shrink-0" />
                      <span>{value}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </ScrollAnimations>
          </div>
        </div>
      </div>
    </section>
  );
};

