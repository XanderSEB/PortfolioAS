import { CursorTracker } from '../components/CursorTracker';
import { Header } from '../components/Header';
import { ASAISGroup } from '../components/ASAISGroup';
import { Footer } from '../components/Footer';

export const ASAISGroupPage = () => {
  return (
    <div className="App">
      <CursorTracker />
      <Header />
      <main>
        <ASAISGroup />
      </main>
      <Footer />
    </div>
  );
};

