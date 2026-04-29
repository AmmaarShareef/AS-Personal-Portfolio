import { motion } from 'framer-motion';
import {
  SiReact, SiTypescript, SiTailwindcss, SiPython, SiPytorch, SiOpencv,
  SiNodedotjs, SiFramer, SiVite, SiGit, SiFigma, SiNumpy
} from 'react-icons/si';

/**
 * Tech stack laid out like a 4-3-3 formation on a pitch.
 * Pure decorative + canonical — the squad.
 */

const players = [
  // GK (foundation)
  { row: 0, x: 50, name: 'Vite',        rating: 86, role: 'GK',  icon: SiVite,        accent: 'gold' },
  // Defenders
  { row: 1, x: 18, name: 'Git',         rating: 90, role: 'LB',  icon: SiGit,         accent: 'gold' },
  { row: 1, x: 38, name: 'Node',        rating: 84, role: 'CB',  icon: SiNodedotjs,   accent: 'gold' },
  { row: 1, x: 62, name: 'NumPy',       rating: 88, role: 'CB',  icon: SiNumpy,       accent: 'gold' },
  { row: 1, x: 82, name: 'Figma',       rating: 83, role: 'RB',  icon: SiFigma,       accent: 'gold' },
  // Midfield
  { row: 2, x: 25, name: 'TypeScript',  rating: 88, role: 'CM',  icon: SiTypescript,  accent: 'cyan' },
  { row: 2, x: 50, name: 'Python',      rating: 93, role: 'CAM', icon: SiPython,      accent: 'cyan' },
  { row: 2, x: 75, name: 'Tailwind',    rating: 94, role: 'CM',  icon: SiTailwindcss, accent: 'cyan' },
  // Forwards
  { row: 3, x: 22, name: 'OpenCV',      rating: 89, role: 'LW',  icon: SiOpencv,      accent: 'gold' },
  { row: 3, x: 50, name: 'PyTorch',     rating: 86, role: 'ST',  icon: SiPytorch,     accent: 'gold' },
  { row: 3, x: 78, name: 'React',       rating: 90, role: 'RW',  icon: SiReact,       accent: 'gold' },
];

const Player = ({ p, idx }) => {
  const Icon = p.icon;
  const gold = p.accent === 'gold';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05, duration: 0.5, ease: [0.2,0.8,0.2,1] }}
      whileHover={{ y: -6, scale: 1.04 }}
      className="absolute -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: `${p.x - 3}%`, top: `${[88, 68, 42, 18][p.row] - 5}%` }}
    >
      {/* mini fut card */}
      <div className={`w-[78px] h-[110px] rounded-xl p-[1.5px] ${gold ? 'bg-fut-gold' : 'bg-fut-icon'} shadow-[0_8px_20px_rgba(0,0,0,0.5)] group-hover:shadow-glow-gold transition-shadow`}>
        <div className="relative w-full h-full rounded-[10px] bg-gradient-to-br from-[#1a1407] via-[#0d0c08] to-[#1a1407] flex flex-col items-center pt-2">
          <span className={`font-display text-2xl leading-none ${gold ? 'text-gradient-gold' : 'text-gradient-cyan'}`}>
            {p.rating}
          </span>
          <span className={`font-head text-[10px] tracking-widest ${gold ? 'text-gold-200' : 'text-cyan2-300'}`}>
            {p.role}
          </span>
          <div className="mt-1 mb-1 flex-1 flex items-center justify-center">
            <Icon className={`text-3xl ${gold ? 'text-gold-100' : 'text-cyan2-300'}`} />
          </div>
          <div className="w-full px-1 pb-1.5">
            <div className={`mx-auto h-px w-3/4 ${gold ? 'bg-gold-300/60' : 'bg-cyan2-400/60'}`} />
            <div className="text-center font-head text-[9px] tracking-widest text-white/85 mt-1 truncate">
              {p.name.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Formation = () => {
  return (
    <section id="squad" className="relative z-10 px-6 py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-head text-[11px] tracking-widestPlus text-gold-200/80">/ 07</span>
          <span className="hud-divider flex-1" />
          <span className="font-head text-[11px] tracking-widestPlus text-white/45">SQUAD · 4-3-3</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9]">
            <span className="text-white">MY </span>
            <span className="text-gradient-gold">STARTING XI.</span>
          </h2>
          <p className="text-white/55 max-w-md text-sm">
            The tools I rep daily. Some are veterans, some are fresh signings —
            all of them earn their spot.
          </p>
        </div>

        {/* Pitch */}
        <div data-glow className="relative w-full rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-emerald-900/20 via-emerald-900/10 to-emerald-950/30">
          <div className="relative w-full" style={{ paddingTop: '62%' }}>
            {/* pitch lines */}
            <svg
              viewBox="0 0 1000 620"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <linearGradient id="stripe" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%"   stopColor="rgba(255,255,255,0.0)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
                </linearGradient>
              </defs>
              {/* striped grass */}
              {Array.from({ length: 8 }).map((_, i) => (
                <rect
                  key={i}
                  x="0"
                  y={(620 / 8) * i}
                  width="1000"
                  height={620 / 8}
                  fill={i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'}
                />
              ))}
              {/* outer */}
              <rect x="20" y="20" width="960" height="580" fill="none" stroke="rgba(245,208,97,0.35)" strokeWidth="1.5" />
              {/* halfway */}
              <line x1="20" y1="310" x2="980" y2="310" stroke="rgba(245,208,97,0.3)" strokeWidth="1.2" />
              <circle cx="500" cy="310" r="60" stroke="rgba(245,208,97,0.3)" strokeWidth="1.2" fill="none" />
              <circle cx="500" cy="310" r="3" fill="rgba(245,208,97,0.5)" />
              {/* boxes */}
              <rect x="280" y="20"  width="440" height="100" stroke="rgba(245,208,97,0.3)" strokeWidth="1.2" fill="none" />
              <rect x="380" y="20"  width="240" height="40"  stroke="rgba(245,208,97,0.3)" strokeWidth="1.2" fill="none" />
              <rect x="280" y="500" width="440" height="100" stroke="rgba(245,208,97,0.3)" strokeWidth="1.2" fill="none" />
              <rect x="380" y="560" width="240" height="40"  stroke="rgba(245,208,97,0.3)" strokeWidth="1.2" fill="none" />
              <circle cx="500" cy="80"  r="40" stroke="rgba(245,208,97,0.3)" strokeWidth="1.2" fill="none" />
              <circle cx="500" cy="540" r="40" stroke="rgba(245,208,97,0.3)" strokeWidth="1.2" fill="none" />
            </svg>

            {/* Vignette + glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.65) 100%)' }} />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[60%] h-40 blur-3xl opacity-40 bg-gold-300/30 pointer-events-none" />

            {/* Players */}
            {players.map((p, i) => <Player key={p.name} p={p} idx={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Formation;
