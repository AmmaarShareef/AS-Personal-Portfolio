import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const groups = [
  {
    head: 'TECHNICAL',
    accent: 'gold',
    items: [
      { k: 'Python',         v: 93 },
      { k: 'TypeScript',     v: 88 },
      { k: 'React',          v: 90 },
      { k: 'C / C++',        v: 78 },
      { k: 'Java',           v: 80 },
      { k: 'SQL',            v: 75 },
    ],
  },
  {
    head: 'AI / DATA',
    accent: 'cyan',
    items: [
      { k: 'PyTorch',        v: 86 },
      { k: 'YOLOv8 / CV',    v: 91 },
      { k: 'OpenCV',         v: 89 },
      { k: 'Scikit-learn',   v: 82 },
      { k: 'NumPy / Pandas', v: 88 },
      { k: 'Prompting',      v: 92 },
    ],
  },
  {
    head: 'BUILDER',
    accent: 'gold',
    items: [
      { k: 'Tailwind CSS',   v: 94 },
      { k: 'Framer Motion',  v: 87 },
      { k: 'Node / Express', v: 84 },
      { k: 'Vite',           v: 86 },
      { k: 'Git / GitHub',   v: 90 },
      { k: 'Figma',          v: 83 },
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
            Self-rated, calibrated against hours logged, projects shipped, and
            the number of times I’ve had to read the same Stack Overflow answer.
            Placeholder, do not represent actual statistics.
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
