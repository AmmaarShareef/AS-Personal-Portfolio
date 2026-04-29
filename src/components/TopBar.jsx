import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { id: 'profile', label: 'Profile' },
  { id: 'stats', label: 'Stats' },
  { id: 'projects', label: 'Projects' },
  { id: 'trophies', label: 'Trophies' },
  { id: 'training', label: 'Training' },
  { id: 'contact', label: 'Transfers' },
];

const TopBar = () => {
  const [active, setActive] = useState('profile');
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, '0');
      const mm = d.getMinutes().toString().padStart(2, '0');
      setTime(`${hh}:${mm}`);
    };
    tick();
    const i = setInterval(tick, 30_000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navItems
        .map(n => document.getElementById(n.id))
        .filter(Boolean);
      const y = window.scrollY + window.innerHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s.offsetTop <= y) { setActive(s.id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl bg-ink-950/70' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: crest + name */}
        <button
          onClick={() => goTo('profile')}
          className="flex items-center gap-3 group select-none"
        >
          <div className="relative w-9 h-9 rounded-md bg-fut-gold p-[2px]">
            <div className="w-full h-full rounded-[5px] bg-ink-950 flex items-center justify-center">
              <span className="font-display text-gold-300 text-lg leading-none mt-1">AS</span>
            </div>
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-head font-semibold tracking-widest text-[11px] text-white/60">PLAYER</span>
            <span className="font-head font-semibold tracking-wider text-sm text-white">AMMAAR · ID #7</span>
          </div>
        </button>

        {/* Center: nav */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full px-1.5 py-1.5 backdrop-blur-md">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className={`relative px-4 py-1.5 text-[12px] font-head uppercase tracking-widest rounded-full transition-colors ${
                active === item.id
                  ? 'text-ink-950'
                  : 'text-white/65 hover:text-white'
              }`}
            >
              {active === item.id && (
                <motion.span
                  layoutId="navPill"
                  className="absolute inset-0 rounded-full bg-fut-gold shadow-glow-gold"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right: HUD chips */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            <span className="font-head text-[11px] tracking-widest text-white/70">ONLINE · {time}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border-gold border bg-gradient-to-b from-gold-300/15 to-transparent">
            <span className="font-display text-gold-200 text-base leading-none mt-0.5">90</span>
            <span className="font-head text-[10px] tracking-widest text-gold-200/80">OVR</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default TopBar;
