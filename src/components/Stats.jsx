import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * Attribute ratings — calibrated against an audit of:
 *   - public GitHub (21 repos)
 *   - LeetCode (@ammhood1602)
 *   - 1XC3 coursework (C/systems/Linux — A1-A4 + 25 weeks of labs)
 *   - 1XD3 coursework (fullstack PHP/MySQL/JS — HaydenHub + Zip Puzzle)
 *
 * Anchors:
 *   < 75  · touched once, no real depth
 *   75-80 · functional, can ship small things
 *   80-85 · comfortable, multiple shipped projects
 *   85-90 · strong, leans on it daily
 *   90+   · genuine specialty
 */
const groups = [
  {
    head: 'TECHNICAL',
    accent: 'gold',
    items: [
      { k: 'JavaScript',     v: 86 }, // 16/21 GH repos + vanilla-JS classes & AJAX in 1XD3
      { k: 'React',          v: 84 }, // MEC frontend + this site
      { k: 'C / Systems',    v: 82 }, // 1XC3: bit ops, linked lists, file I/O, bash, makefiles
      { k: 'SQL / MySQL',    v: 84 }, // 1XD3: real schemas, FKs, JOINs, aggregates, 16 SQL files
      { k: 'Python',         v: 80 }, // Clash-Royale-Bot + ML pipelines
      { k: 'TypeScript',     v: 78 }, // GoofyRivia + portfolio
    ],
  },
  {
    head: 'AI / DATA',
    accent: 'cyan',
    items: [
      { k: 'Prompting / LLM',v: 86 }, // Gemini API in GoofyRivia
      { k: 'YOLOv8 / CV',    v: 84 }, // custom-trained model
      { k: 'OpenCV',         v: 82 }, // bot pipeline + frame extractor
      { k: 'PyTorch',        v: 78 }, // via YOLOv8 stack
      { k: 'NumPy / Pandas', v: 78 }, // implied by ML work
      { k: 'Scikit-learn',   v: 72 }, // no direct public evidence
    ],
  },
  {
    head: 'BUILDER',
    accent: 'gold',
    items: [
      { k: 'Tailwind CSS',   v: 86 }, // portfolio + frontend work
      { k: 'Git / GitHub',   v: 86 }, // 21 repos + multi-author 1XD3 collab
      { k: 'PHP / Backend',  v: 84 }, // 81 PHP files: PDO, sessions, auth, AJAX
      { k: 'Figma',          v: 84 }, // self-rated (private projects)
      { k: 'Framer Motion',  v: 80 }, // this site’s motion
      { k: 'Node / Express', v: 76 }, // GoofyRivia backend
    ],
  },
];

const Bar = ({ k, v, accent }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const target = v;
    const duration = 900;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setNum(Math.round(start + (target - start) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, v]);

  const gradient =
    accent === 'cyan'
      ? 'from-cyan2-300 via-cyan2-400 to-cyan2-500'
      : 'from-gold-100 via-gold-300 to-gold-500';

  const numClass =
    accent === 'cyan' ? 'text-gradient-cyan' : 'text-gradient-gold';

  return (
    <div ref={ref} className="grid grid-cols-[110px_1fr_auto] items-center gap-4 py-2.5">
      <span className="font-head text-[12px] tracking-widest text-white/65 uppercase truncate">
        {k}
      </span>
      <div className="relative h-[6px] rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${v}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
        />
        <div className="absolute inset-0 gold-shimmer rounded-full opacity-40" />
      </div>
      <span className={`font-display text-2xl leading-none ${numClass} w-9 text-right`}>
        {num}
      </span>
    </div>
  );
};

const Group = ({ head, items, accent, idx }) => (
  <motion.div
    data-glow
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ delay: idx * 0.12 }}
    className="relative rounded-2xl p-6 md:p-7 bg-white/[0.025] border border-white/10 backdrop-blur-md overflow-hidden"
  >
    {/* Top accent line */}
    <div
      className={`absolute top-0 left-0 right-0 h-px ${
        accent === 'cyan' ? 'bg-gradient-to-r from-transparent via-cyan2-400/60 to-transparent'
                          : 'bg-gradient-to-r from-transparent via-gold-300/60 to-transparent'
      }`}
    />
    <div className="flex items-center justify-between mb-4">
      <span className="font-head text-[11px] tracking-widestPlus text-white/55">{head}</span>
      <span className={`font-head text-[11px] tracking-widestPlus ${
        accent === 'cyan' ? 'text-cyan2-400' : 'text-gold-300'
      }`}>
        / {items.length} ATTR
      </span>
    </div>
    <div>
      {items.map((it) => <Bar key={it.k} {...it} accent={accent} />)}
    </div>
  </motion.div>
);

const Stats = () => {
  return (
    <section id="stats" className="relative z-10 px-6 py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-head text-[11px] tracking-widestPlus text-gold-200/80">/ 02</span>
          <span className="hud-divider flex-1" />
          <span className="font-head text-[11px] tracking-widestPlus text-white/45">ATTRIBUTES</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9]">
            <span className="text-white">FULL </span>
            <span className="text-gradient-gold">STAT SHEET</span>
          </h2>
          <p className="text-white/55 max-w-md text-sm">
            Calibrated against an audit of every public repo I own and my LeetCode
            progress. 80 floor = absolute beginner, 99 ceiling = founder-of-tech-giant.
            Conservative where evidence is thin.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {groups.map((g, i) => (
            <Group key={g.head} {...g} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
