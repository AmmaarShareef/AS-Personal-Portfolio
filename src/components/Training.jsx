import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { FaCode, FaGithub, FaFire, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';
import { fetchLeetCode, buildMonthGrid, computeStreak } from '../lib/leetcode';
import { fetchGitHub } from '../lib/github';

const LEETCODE_USER = 'ammhood1602';
const LEETCODE_URL  = 'https://leetcode.com/u/ammhood1602/';
const GITHUB_USER   = 'AmmaarShareef';
const GITHUB_URL    = 'https://github.com/AmmaarShareef';

const MONTHS_SHORT = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

/* ------------------------- shared bits ------------------------- */

const Ring = ({ value, total, accent = 'gold', loading, size = 108 }) => {
  const r = size / 2 - 6;
  const c = 2 * Math.PI * r;
  const safeTotal = total > 0 ? total : 1;
  const offset = c * (1 - Math.min(1, value / safeTotal));
  const stroke = accent === 'cyan' ? '#5ee9ff' : '#f5d061';

  return (
    <div className="relative shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90">
        <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="transparent" />
        <motion.circle
          cx={size/2} cy={size/2} r={r}
          stroke={stroke}
          strokeWidth="6"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: loading ? c : offset }}
          transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ filter: `drop-shadow(0 0 6px ${stroke}66)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-display text-[1.85rem] leading-none ${accent === 'cyan' ? 'text-gradient-cyan' : 'text-gradient-gold'}`}>
          {loading ? '—' : value}
        </span>
        <span className="font-head text-[9px] tracking-widest text-white/45 mt-0.5">
          / {loading ? '—' : total}
        </span>
      </div>
    </div>
  );
};

const StatusChip = ({ loading, error, accent = 'gold' }) => {
  const gold = accent === 'gold';
  const base = gold
    ? 'border-gold border'
    : 'border border-cyan2-400/30';
  const live = gold ? 'bg-gold-300/10 text-gold-200' : 'bg-cyan2-400/10 text-cyan2-400';
  const off  = 'text-rose2-400 border-rose2-400/30 bg-rose2-400/10';
  return (
    <span className={`px-2 py-0.5 rounded-md font-head text-[9px] tracking-widest shrink-0 ${
      loading ? `${base} animate-pulse text-white/45` : error ? off : `${base} ${live}`
    }`}>
      {loading ? 'SYNC' : error ? 'OFFLINE' : 'LIVE'}
    </span>
  );
};

/* ------------------------- LeetCode ------------------------- */

const LeetCodeCard = () => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchLeetCode(LEETCODE_USER, { signal: ctrl.signal })
      .then(setData)
      .catch(e => { if (e.name !== 'AbortError') setError(e); })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  const now = useMemo(() => new Date(), []);
  const year = now.getFullYear();
  const month = now.getMonth();

  const monthGrid = useMemo(() => {
    if (data?.submissionCalendar) return buildMonthGrid(data.submissionCalendar, year, month);
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => ({
      day: i + 1, count: 0,
      isToday: now.getDate() === i + 1,
      isFuture: i + 1 > now.getDate(),
    }));
  }, [data, year, month, now]);

  const streak = useMemo(
    () => (data?.submissionCalendar ? computeStreak(data.submissionCalendar) : 0),
    [data]
  );

  const breakdown = [
    { label: 'EASY',   v: data?.easySolved   ?? 0, total: data?.totalEasy   ?? 1, dot: 'bg-emerald-400', bar: 'bg-emerald-400/85' },
    { label: 'MEDIUM', v: data?.mediumSolved ?? 0, total: data?.totalMedium ?? 1, dot: 'bg-gold-300',     bar: 'bg-gold-300/85' },
    { label: 'HARD',   v: data?.hardSolved   ?? 0, total: data?.totalHard   ?? 1, dot: 'bg-rose2-400',    bar: 'bg-rose2-400/85' },
  ];

  return (
    <motion.div
      data-glow
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-2xl bg-white/[0.025] border border-white/10 backdrop-blur-md p-5 overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-300/60 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <a href={LEETCODE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group min-w-0">
          <div className="w-9 h-9 rounded-lg border-gold border bg-gold-300/10 flex items-center justify-center text-gold-200 shrink-0">
            <FaCode className="text-sm" />
          </div>
          <div className="min-w-0">
            <h3 className="font-head text-base text-white tracking-wide flex items-center gap-1.5 leading-none">
              LeetCode
              <FaExternalLinkAlt className="text-[9px] text-white/40 group-hover:text-gold-200 transition-colors" />
            </h3>
            <p className="text-[10px] font-head tracking-widest text-white/45 truncate mt-0.5">
              @{LEETCODE_USER}{data?.ranking ? ` · #${data.ranking.toLocaleString()}` : ''}
            </p>
          </div>
        </a>
        <StatusChip loading={loading} error={error} accent="gold" />
      </div>

      {/* Ring + breakdown */}
      <div className="grid grid-cols-[auto_1fr] gap-5 items-center">
        <Ring value={data?.totalSolved ?? 0} total={data?.totalQuestions ?? 0} accent="gold" loading={loading} size={108} />
        <div className="space-y-2 min-w-0">
          {breakdown.map((b) => (
            <div key={b.label} className="flex items-center gap-2.5">
              <span className={`w-1.5 h-1.5 rounded-full ${b.dot}`} />
              <span className="font-head text-[10px] tracking-widest text-white/55 w-14">{b.label}</span>
              <div className="flex-1 h-[5px] rounded-full bg-white/[0.06] overflow-hidden min-w-0">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: loading ? '0%' : `${Math.min(100, (b.v / b.total) * 100)}%` }}
                  transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
                  className={`h-full rounded-full ${b.bar}`}
                />
              </div>
              <span className="font-head text-[11px] text-white/85 w-14 text-right tabular-nums shrink-0">
                {loading ? '—' : `${b.v}/${b.total}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="hud-divider my-4" />

      {/* Current month activity strip */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-head text-[10px] tracking-widestPlus text-white/55">
          {MONTHS_SHORT[month]} {year}
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-head tracking-widest text-gold-200">
          <FaFire className={`text-[11px] ${streak > 0 ? 'text-rose2-400' : 'text-white/25'}`} /> STREAK · {streak}D
        </span>
      </div>

      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${monthGrid.length}, minmax(0, 1fr))` }}
      >
        {monthGrid.map((d) => {
          let cls = 'bg-white/[0.05]';
          let title = `${MONTHS_SHORT[month]} ${d.day} · no submissions`;
          if (d.isFuture) {
            cls = 'bg-white/[0.025] opacity-40';
            title = `${MONTHS_SHORT[month]} ${d.day}`;
          } else if (d.count > 0) {
            cls =
              d.count >= 5 ? 'bg-emerald-300 shadow-[0_0_6px_rgba(110,231,183,0.7)]' :
              d.count >= 3 ? 'bg-emerald-400/85' :
              d.count >= 2 ? 'bg-emerald-500/75' :
                             'bg-emerald-500/55';
            title = `${MONTHS_SHORT[month]} ${d.day} · ${d.count} submission${d.count > 1 ? 's' : ''}`;
          }
          return (
            <div
              key={d.day}
              title={title}
              className={`aspect-square rounded-[2px] ${cls} ${d.isToday ? 'ring-1 ring-gold-300' : ''}`}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

/* ------------------------- GitHub ------------------------- */

const GitHubCard = () => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchGitHub(GITHUB_USER, { signal: ctrl.signal })
      .then(setData)
      .catch(e => { if (e.name !== 'AbortError') setError(e); })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  const tiles = [
    { k: 'COMMITS · 30D', v: data?.commits30 },
    { k: 'REPOS',         v: data?.repoCount },
    { k: 'STARS',         v: data?.stars     },
    { k: 'FOLLOWERS',     v: data?.user?.followers },
  ];

  const shade = (count) => {
    if (count === 0) return 'bg-white/[0.05]';
    if (count >= 8)  return 'bg-cyan2-300 shadow-[0_0_6px_rgba(94,233,255,0.7)]';
    if (count >= 4)  return 'bg-cyan2-400/85';
    if (count >= 2)  return 'bg-cyan2-500/65';
    return 'bg-cyan2-500/45';
  };

  const topRepos = data?.topRepos?.slice(0, 3) ?? [];

  return (
    <motion.div
      data-glow
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.08 }}
      className="relative rounded-2xl bg-white/[0.025] border border-white/10 backdrop-blur-md p-5 overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan2-400/60 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group min-w-0">
          <div className="w-9 h-9 rounded-lg border border-cyan2-400/40 bg-cyan2-400/10 flex items-center justify-center text-cyan2-400 shrink-0">
            <FaGithub className="text-sm" />
          </div>
          <div className="min-w-0">
            <h3 className="font-head text-base text-white tracking-wide flex items-center gap-1.5 leading-none">
              GitHub
              <FaExternalLinkAlt className="text-[9px] text-white/40 group-hover:text-cyan2-400 transition-colors" />
            </h3>
            <p className="text-[10px] font-head tracking-widest text-white/45 truncate mt-0.5">
              @{GITHUB_USER}
            </p>
          </div>
        </a>
        <StatusChip loading={loading} error={error} accent="cyan" />
      </div>

      {/* 4 stat tiles */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {tiles.map((c) => (
          <div key={c.k} className="rounded-lg border border-white/10 bg-ink-900/40 px-2 py-2 text-center">
            <div className="font-display text-[1.6rem] text-gradient-cyan leading-none tabular-nums">
              {loading ? '—' : (c.v ?? '—')}
            </div>
            <div className="mt-1 font-head text-[8.5px] tracking-widest text-white/45 leading-tight">{c.k}</div>
          </div>
        ))}
      </div>

      {/* 30-day heatmap */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-head text-[10px] tracking-widestPlus text-white/55">LAST 30 DAYS</span>
        <span className="flex items-center gap-1.5 text-[10px] font-head tracking-widest text-cyan2-400">
          <FaFire className={`text-[11px] ${data?.streak ? 'text-rose2-400' : 'text-white/25'}`} /> STREAK · {data?.streak ?? 0}D
        </span>
      </div>
      <div
        className="grid gap-[3px] mb-4"
        style={{ gridTemplateColumns: 'repeat(30, minmax(0, 1fr))' }}
      >
        {(data?.heat ?? Array.from({ length: 30 }, () => ({ count: 0 }))).map((cell, i) => (
          <div
            key={i}
            title={cell.date ? `${cell.date.toDateString()} · ${cell.count} commit${cell.count !== 1 ? 's' : ''}` : ''}
            className={`aspect-square rounded-[2px] ${shade(cell.count || 0)}`}
          />
        ))}
      </div>

      <div className="hud-divider mb-3" />

      {/* Top repos — fills the space */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-head text-[10px] tracking-widestPlus text-white/55">TOP REPOS</span>
        <span className="font-head text-[9px] tracking-widest text-white/35">BY STARS</span>
      </div>
      {loading ? (
        <div className="space-y-1.5">
          {[0,1,2].map(i => (
            <div key={i} className="h-7 rounded-md bg-white/[0.04] animate-pulse" />
          ))}
        </div>
      ) : topRepos.length === 0 ? (
        <div className="text-center text-[11px] text-white/40 py-3">
          {error ? 'GitHub unreachable.' : 'No public repos found.'}
        </div>
      ) : (
        <ul className="space-y-1">
          {topRepos.map((r) => (
            <li key={r.name}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-md border border-transparent hover:border-cyan2-400/25 hover:bg-cyan2-400/[0.04] transition-all"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FaCodeBranch className="text-[10px] text-white/35 shrink-0" />
                  <span className="font-head text-[12px] text-white/90 truncate group-hover:text-cyan2-300 transition-colors">
                    {r.name}
                  </span>
                  {r.lang && (
                    <span className="font-head text-[9px] tracking-widest text-white/40 px-1.5 py-0.5 rounded border border-white/10 shrink-0">
                      {r.lang.toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="flex items-center gap-1 font-head text-[10px] tracking-widest text-gold-200/85 shrink-0">
                  <FaStar className="text-[9px]" /> {r.stars}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

/* ------------------------- Section ------------------------- */

const Training = () => {
  return (
    <section id="training" className="relative z-10 px-6 py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-head text-[11px] tracking-widestPlus text-gold-200/80">/ 05</span>
          <span className="hud-divider flex-1" />
          <span className="font-head text-[11px] tracking-widestPlus text-white/45">TRAINING GROUND · LIVE</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9]">
            <span className="text-white">DAILY </span>
            <span className="text-gradient-gold">REPS.</span>
          </h2>
          <p className="text-white/55 max-w-md text-sm">
            Pulled live from LeetCode and the GitHub API the moment this page loads.
            "Practice makes perfect" - Cristiano Ronaldo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <LeetCodeCard />
          <GitHubCard />
        </div>
      </div>
    </section>
  );
};

export default Training;
