import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SmokyBackground from './components/SmokyBackground';
import Navigation from './components/Navigation';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import LeetCode from './components/LeetCode';
import Contact from './components/Contact';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden selection:bg-pink-500 selection:text-white">
      <SmokyBackground />

      {/* Cursor glow effect */}
      <motion.div
        className="fixed pointer-events-none z-0 mix-blend-screen"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{
          type: 'tween',
          ease: 'backOut',
          duration: 0.1,
        }}
        style={{
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(255, 0, 255, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <Navigation />

      <main className="relative z-10 flex flex-col gap-0">
        <AboutMe />
        <Projects />
        <LeetCode />
        <Contact />
      </main>
    </div>
  );
}

export default App;
