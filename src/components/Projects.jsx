import { motion } from 'framer-motion';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import clashRoyaleImg from '../assets/clash-royale.jpg';
import goofyRivia from '../assets/GoofyRivia.png';
import pheonixImg from '../assets/pheonix.png';
import opencvImg from '../assets/opencv.png';

const matches = [
  {
    id: 'clash',
    home: 'AMMAAR FC',
    away: 'CLASH ROYALE',
    score: '4 — 1',
    result: 'W',
    motm: 'YOLOv8',
    title: 'Clash Royale Vision Bot',
    rating: 91,
    season: '2025 · S2',
    venue: 'Solo · Side Project',
    description:
      'Real-time CV pipeline that watches Clash Royale gameplay through MSS screen capture, runs a custom-trained YOLOv8 model on a self-labeled dataset, and outputs elixir tracking, card-cycle timing, and opponent deck prediction live.',
    tags: ['YOLOv8', 'OpenCV', 'Python', 'MSS', 'Custom Dataset'],
    image: clashRoyaleImg,
    github: 'https://github.com/AmmaarShareef/Clash-Royale-Bot',
    accent: 'gold',
  },
  {
    id: 'goofy',
    home: 'AMMAAR FC',
    away: 'GOOFYRIVIA',
    score: '3 — 2',
    result: 'W',
    motm: 'WEBSOCKETS',
    title: 'GoofyRivia · Local Multiplayer Trivia',
    rating: 87,
    season: '2025 · S1',
    venue: 'Team · 4 players',
    description:
      'A Jackbox-style murder-mystery trivia game. React + TypeScript on the front, Node/Express + WebSockets on the back. Hosts a local lobby on your LAN — phones become controllers, the laptop is the screen.',
    tags: ['React', 'TypeScript', 'Node', 'Express', 'WebSockets'],
    image: goofyRivia,
    github: 'https://github.com/AmmaarShareef/GoofyRivia',
    accent: 'cyan',
  },
  {
    id: 'pheonix',
    home: 'AMMAAR FC',
    away: 'WILDFIRE',
    score: '2 — 0',
    result: 'W',
    motm: 'UI/UX',
    title: 'Pheonix AID · Wildfire Response',
    rating: 84,
    season: '2025 · MEC',
    venue: 'McMaster Engineering Comp.',
    description:
      'Frontend for a wildfire precaution and response platform — real-time alerts, evac maps, and resource coordination for first responders and affected communities. Designed and built under hackathon pressure.',
    tags: ['React', 'Frontend', 'UI/UX', 'Hackathon'],
    image: pheonixImg,
    github: 'https://github.com/AmmaarShareef/MEC-2025-Frontend',
    accent: 'gold',
  },
  {
    id: 'cv-extractor',
    home: 'AMMAAR FC',
    away: 'OPENCV LAB',
    score: '5 — 0',
    result: 'W',
    motm: 'PYTHON',
    title: 'OpenCV Frame Extractor',
    rating: 80,
    season: '2024 · WTR',
    venue: 'Tooling · CLI',
    description:
      'A small but battle-tested utility I keep coming back to: extracts clean, deduplicated frames from videos for ML dataset prep. Configurable sample rate, motion threshold, and output format. Powers my own training pipelines.',
    tags: ['Python', 'OpenCV', 'CLI', 'ML Tooling'],
    image: opencvImg,
    github: null,
    accent: 'cyan',
  },
];

const MatchCard = ({ m, idx }) => {
  const accentBorder = m.accent === 'cyan'
    ? 'hover:border-cyan2-400/50 hover:shadow-glow-cyan'
    : 'hover:border-gold-300/60 hover:shadow-glow-gold';
  const accentText = m.accent === 'cyan' ? 'text-gradient-cyan' : 'text-gradient-gold';
  const accentDot  = m.accent === 'cyan' ? 'bg-cyan2-400' : 'bg-gold-300';

  return (
    <motion.article
      data-glow
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: idx * 0.08, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className={`group relative rounded-2xl bg-ink-900/60 backdrop-blur-md border border-white/10 ${accentBorder} transition-all duration-500 overflow-hidden`}
    >
      {/* Top scoreboard strip */}
      <div className="relative h-[58px] flex items-center justify-between px-5 border-b border-white/10 bg-gradient-to-r from-ink-800/60 via-ink-900/60 to-ink-800/60">
        <div className="flex items-center gap-3 min-w-0">
          <span className={`w-1.5 h-1.5 rounded-full ${accentDot} shadow-[0_0_8px_currentColor]`} />
          <span className="font-head text-xs tracking-widest text-white/85 truncate">{m.home}</span>
        </div>
        <div className={`font-display text-2xl ${accentText} leading-none`}>{m.score}</div>
        <div className="flex items-center gap-3 min-w-0 justify-end">
          <span className="font-head text-xs tracking-widest text-white/60 truncate">{m.away}</span>
          <span className={`px-2 py-0.5 rounded-md font-head text-[10px] tracking-widest ${
            m.result === 'W'
              ? 'bg-emerald-400/15 text-emerald-300 border border-emerald-400/30'
              : 'bg-rose2-400/15 text-rose2-400 border border-rose2-400/30'
          }`}>{m.result}</span>
        </div>
      </div>

      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={m.image}
          alt={m.title}
          className="w-full h-full object-cover transform group-hover:scale-[1.06] transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
        {/* OVR badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-md bg-ink-950/80 border-gold border backdrop-blur-md">
            <span className="font-display text-gold-200 text-xl leading-none">{m.rating}</span>
          </div>
          <div className="px-2 py-1 rounded-md bg-ink-950/70 border border-white/10 font-head text-[10px] tracking-widest text-white/70">
            MOTM · {m.motm}
          </div>
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-ink-950/70 border border-white/10 font-head text-[10px] tracking-widest text-white/70">
          {m.season}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-head text-[10px] tracking-widest text-white/45">{m.venue}</span>
        </div>

        <h3 className="font-head text-xl text-white tracking-wide mb-3">
          {m.title}
        </h3>

        <p className="text-sm text-white/65 leading-relaxed mb-5 line-clamp-4">
          {m.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {m.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] font-head tracking-widest px-2 py-1 rounded border border-white/10 bg-white/[0.03] text-white/65"
            >
              {t}
            </span>
          ))}
        </div>

        {m.github && (
          <a
            href={m.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-head text-[11px] tracking-widest text-white/75 hover:text-gold-200 transition-colors"
          >
            <FaGithub /> VIEW MATCH REPORT <FaArrowRight className="text-[10px] -mb-px" />
          </a>
        )}
      </div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative z-10 px-6 py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-head text-[11px] tracking-widestPlus text-gold-200/80">/ 03</span>
          <span className="hud-divider flex-1" />
          <span className="font-head text-[11px] tracking-widestPlus text-white/45">PROJECTS · MATCH HISTORY</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9]">
            <span className="text-white">RECENT </span>
            <span className="text-gradient-gold">FIXTURES</span>
          </h2>
          <div className="flex items-center gap-4 text-sm text-white/55">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
              4 wins · 0 losses
            </div>
            <span className="hidden md:inline-block w-px h-4 bg-white/15" />
            <span className="hidden md:inline">Form: W&nbsp;W&nbsp;W&nbsp;W</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {matches.map((m, i) => (
            <MatchCard key={m.id} m={m} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
