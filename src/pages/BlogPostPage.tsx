import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CursorTracker } from '../components/CursorTracker';
import { FaArrowLeft, FaCalendarAlt, FaTag, FaYoutube, FaGlobe, FaMobileAlt } from 'react-icons/fa';

export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Finde das Projekt basierend auf dem Slug
  const project = projects.find((p) => {
    if (p.blogUrl) {
      const urlSlug = p.blogUrl.split('/').pop();
      return urlSlug === slug;
    }
    return false;
  });

  if (!project) {
    return (
      <div className="App">
        <CursorTracker />
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Blog-Post nicht gefunden</h1>
            <Link to="/" className="text-primary-400 hover:text-primary-300">
              Zurück zur Startseite
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <CursorTracker />
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.8),rgba(2,6,23,1))] opacity-50" />
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Back Button */}
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
              >
                <FaArrowLeft size={14} />
                <span>Zurück zu Projekten</span>
              </Link>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">{project.title}</span>
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-white/60 mb-8">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt size={14} />
                  <span>{new Date(project.date).toLocaleDateString('de-DE', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaTag size={14} />
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs border border-primary-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.article
              className="glass rounded-2xl p-8 md:p-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Description */}
              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-xl text-white/80 leading-relaxed mb-6">
                  {project.description}
                </p>
                
                {project.longDescription && (
                  <div className="text-white/70 leading-relaxed space-y-4">
                    <p>{project.longDescription}</p>
                    
                    {/* Beispiel Content - kann später durch echten Content ersetzt werden */}
                    <div className="mt-8 p-6 bg-slate-800/50 rounded-xl border border-white/10">
                      <h2 className="text-2xl font-bold text-white mb-4">Weitere Details</h2>
                      <p className="text-white/70 mb-4">
                        Hier können Sie später detaillierte Informationen, Code-Beispiele, 
                        Screenshots oder andere relevante Inhalte hinzufügen.
                      </p>
                      <p className="text-white/70">
                        Dieser Bereich ist vollständig anpassbar und kann mit Markdown, 
                        Code-Highlighting, Bildern und mehr erweitert werden.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Call to Action - Links Section */}
              {(project.youtubeUrl || project.websiteUrl || project.appUrl) && (
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">Verwandte Links</h3>
                  <div className="flex flex-wrap gap-4">
                    {project.youtubeUrl && (
                      <motion.a
                        href={project.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg border border-red-500/30 transition-colors inline-flex items-center gap-2 font-semibold"
                        whileHover={{ scale: 1.05, x: 2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaYoutube size={16} />
                        YouTube Video ansehen
                      </motion.a>
                    )}
                    {project.websiteUrl && (
                      <motion.a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg border border-blue-500/30 transition-colors inline-flex items-center gap-2 font-semibold"
                        whileHover={{ scale: 1.05, x: 2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGlobe size={16} />
                        Website besuchen
                      </motion.a>
                    )}
                    {project.appUrl && (
                      <motion.a
                        href={project.appUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-green-600/20 hover:bg-green-600/30 text-green-300 rounded-lg border border-green-500/30 transition-colors inline-flex items-center gap-2 font-semibold"
                        whileHover={{ scale: 1.05, x: 2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaMobileAlt size={16} />
                        App öffnen
                      </motion.a>
                    )}
                  </div>
                </div>
              )}
            </motion.article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

