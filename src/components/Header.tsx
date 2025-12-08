import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScrollAnimation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  const navItems = [
    { label: 'Home', href: '#home', route: '/' },
    { label: 'Projekte', href: '#projects', route: '/' },
    { label: 'Skills', href: '#skills', route: '/' },
    { label: 'Bildung', href: '#education', route: '/' },
    { label: 'ASAIS Group', href: '/asais-group', route: '/asais-group', isRoute: true },
    { label: 'Techstack', href: '#techstack', route: '/' },
    { label: 'Kontakt', href: '#contact', route: '/' },
  ];

  const handleNavClick = (href: string, route?: string, isRoute?: boolean) => {
    setIsMobileMenuOpen(false);
    
    if (isRoute && route) {
      navigate(route);
      return;
    }
    
    if (route && location.pathname !== route) {
      navigate(route);
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass bg-slate-900/80 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold gradient-text"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Portfolio AS
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              if (item.isRoute) {
                return (
                  <Link
                  key={item.label}
                  to={item.route}
                  className="text-white/80 hover:text-white transition-colors relative group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.span
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
                  </motion.span>
                </Link>
                );
              }
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors relative group"
                  whileHover={{ y: -2 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.route, item.isRoute);
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isMobileMenuOpen ? 'open' : 'closed'}
              className="w-6 h-6 flex flex-col justify-center space-y-1.5"
            >
              <motion.span
                className="w-full h-0.5 bg-white"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 7 },
                }}
              />
              <motion.span
                className="w-full h-0.5 bg-white"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
              />
              <motion.span
                className="w-full h-0.5 bg-white"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -7 },
                }}
              />
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item) => {
                if (item.isRoute) {
                  return (
                    <Link
                      key={item.label}
                      to={item.route}
                      className="block py-2 text-white/80 hover:text-white transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.span whileHover={{ x: 10 }} className="block">
                        {item.label}
                      </motion.span>
                    </Link>
                  );
                }
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="block py-2 text-white/80 hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href, item.route, item.isRoute);
                    }}
                    whileHover={{ x: 10 }}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

