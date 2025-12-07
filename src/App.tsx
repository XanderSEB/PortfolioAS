import { CursorTracker } from './components/CursorTracker';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { ASAISGroup } from './components/ASAISGroup';
import { Techstack } from './components/Techstack';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="App">
      <CursorTracker />
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Education />
        <ASAISGroup />
        <Techstack />
      </main>
      <Footer />
    </div>
  );
}

export default App;
