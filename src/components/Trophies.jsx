import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaStar, FaCrown, FaBolt, FaShieldAlt } from 'react-icons/fa';

const trophies = [
  {
    icon: FaTrophy,
    tier: 'gold',
    title: 'McMaster Eng. Competition',
    sub: 'Pheonix AID · Wildfire Frontend',
    year: '2025',
    note: 'Competed · Programming track',
  },
  {
    icon: FaCrown,
    tier: 'silver',
    title: 'Ontario Scholar',
    sub: '80% or higher top 6 avg',
    year: '2025',
    note: 'Mississauga · ON',
  },
  {
    icon: FaStar,
    tier: 'cyan',
    title: '150+ GitHub Commits',
    sub: 'Across personal projects',
    year: '2025',
    note: 'And counting',
  },
  {
    icon: FaBolt,
    tier: 'silver',
    title: 'Hackathon Streak',
    sub: '3 hackathons shipped end-to-end',
    year: '2025–26',
    note: 'Including MEC + DeltaHacks',
  },
  {
    icon: FaShieldAlt,
    tier: 'gold',
    title: 'Self-Trained YOLOv8',
    sub: 'Custom dataset · 90+ images',
    year: '2025',
    note: 'mAP@0.5:0.95 = 0.65',
  },
];

const tierStyles = {
  gold: {
    border: 'border-gold-300/40',
    bg: 'from-gold-300/10 via-transparent to-gold-300/[0.03]',
    icon: 'text-gold-200',
    glow: 'group-hover:shadow-glow-gold',
    chip: 'bg-gold-300/10 text-gold-200 border-gold-300/30',
  },
  silver: {
    border: 'border-white/15',
    bg: 'from-white/[0.06] via-transparent to-white/[0.02]',
    icon: 'text-white/85',
    glow: 'group-hover:shadow-[0_0_30px_rgba(255,255,255,0.18)]',
    chip: 'bg-white/[0.06] text-white/80 border-white/15',
  },
  cyan: {
    border: 'border-cyan2-400/35',
    bg: 'from-cyan2-400/10 via-transparent to-cyan2-400/[0.03]',
    icon: 'text-cyan2-400',
    glow: 'group-hover:shadow-glow-cyan',
    chip: 'bg-cyan2-400/10 text-cyan2-400 border-cyan2-400/30',
  },
};

const Trophies = () => {
  return (
    <section id="trophies" className="relative z-10 px-6 py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-head text-[11px] tracking-widestPlus text-gold-200/80">/ 04</span>
          <span className="hud-divider flex-1" />
          <span className="font-head text-[11px] tracking-widestPlus text-white/45">TROPHY CABINET</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9]">
            <span className="text-white">ON THE </span>
            <span className="text-gradient-gold">SHELF.</span>
          </h2>
          <p className="text-white/55 max-w-md text-sm">
            Wins, near-wins and the occasional certificate. Mostly here to remind
            myself that the late nights paid off.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trophies.map((t, i) => {
            const s = tierStyles[t.tier];
            const Icon = t.icon;
            return (
              <motion.div
                key={t.title}
                data-glow
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.06 }}
                className={`group relative rounded-2xl border ${s.border} bg-gradient-to-br ${s.bg} backdrop-blur-md p-6 transition-all duration-500 ${s.glow}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl border ${s.border} bg-ink-900/70 flex items-center justify-center ${s.icon} text-xl`}>
                    <Icon />
                  </div>
                  <span className={`px-2.5 py-1 rounded-md font-head text-[10px] tracking-widest border ${s.chip}`}>
                    {t.year}
                  </span>
                </div>
                <h3 className="font-head text-lg text-white tracking-wide leading-snug mb-1">
                  {t.title}
                </h3>
                <p className="text-sm text-white/60 mb-4">{t.sub}</p>
                <div className="hud-divider mb-3" />
                <p className="text-[11px] font-head tracking-widest text-white/45 uppercase">
                  {t.note}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Trophies;
