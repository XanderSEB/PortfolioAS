import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: '#', label: 'GitHub' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:contact@example.com', label: 'Email' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer id="contact" className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4 gradient-text">Portfolio AS</h3>
            <p className="text-white/70">
              Eine moderne Portfolio-Webseite, die meine Projekte, Bildung und
              die ASAIS Group präsentiert.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Projekte
                </a>
              </li>
              <li>
                <a
                  href="#education"
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#education')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Bildung
                </a>
              </li>
              <li>
                <a
                  href="#asais"
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#asais')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  ASAIS Group
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-semibold mb-4">Social Media</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    aria-label={link.label}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/50">
          <p>&copy; {currentYear} Portfolio AS. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

