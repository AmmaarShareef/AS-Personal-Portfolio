import PitchBackground from './components/PitchBackground';
import CursorGlow from './components/CursorGlow';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import Dossier from './components/Dossier';
import Stats from './components/Stats';
import Projects from './components/Projects';
import Trophies from './components/Trophies';
import Formation from './components/Formation';
import Training from './components/Training';
import TransferCenter from './components/TransferCenter';

function App() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <PitchBackground />
      <CursorGlow />
      <TopBar />

      <main className="relative z-10">
        <Hero />
        <Dossier />
        <Stats />
        <Formation />
        <Projects />
        <Trophies />
        <Training />
        <TransferCenter />
      </main>
    </div>
  );
}

export default App;
