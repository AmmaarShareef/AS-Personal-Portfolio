import { motion } from 'framer-motion';
import PlayerCard from './PlayerCard';
import resume from '../assets/resume.pdf';
import { FaDownload } from 'react-icons/fa';

const personal = [
  { k: 'Full Name', v: 'Ammaar Shareef' },
  { k: 'Born',      v: '2007 · U20' },
  { k: 'Based',     v: 'Mississauga, ON · Canada' },
  { k: 'Club',      v: 'McMaster University' },
  { k: 'Division',  v: 'Computer Science · Year I' },
  { k: 'Specialty', v: 'Machine Learning · Computer Vision' },
  { k: 'Languages', v: 'English · Urdu · Hindi · Arabic (basic)' },
  { k: 'Status',    v: 'Free Agent' },
];

const traits = [
  'Quick Learner',
  'Detail-oriented',
  'Vision Builder',
  'Late-Night Sprinter',
  'Pixel Perfectionist',
  'Calm Under Pressure'
];

const Field = ({ k, v }) => (
  <div className="flex items-baseline justify-between gap-4 py-2.5 border-b border-white/5 last:border-b-0">
    <span className="font-head text-[11px] tracking-widest text-white/45 uppercase shrink-0">
      {k}
    </span>
    <span className="text-sm text-white/90 text-right">{v}</span>
  </div>
);

const Dossier = () => {
  return (
    <section id="dossier" className="relative z-10 px-6 py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Player card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start lg:sticky lg:top-28">
          <PlayerCard />
        </div>

        {/* Bio */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-head text-[11px] tracking-widestPlus text-gold-200/80">/ 01</span>
            <span className="hud-divider flex-1" />
            <span className="font-head text-[11px] tracking-widestPlus text-white/45">DOSSIER</span>
          </div>

          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] mb-6">
            <span className="block text-white">A 19-YEAR-OLD<span className="inline text-gradient-gold"> BUILDER.</span></span>
            <span className="block text-white">WORKS BEST IN EXTRA</span>
            <span className="block text-gradient-gold">TIME 90'</span>
          </h2>

          <div className="space-y-4 text-white/75 text-[15px] leading-relaxed max-w-2xl">
            <p>
              Raised in the UAE, born in India, currently "working" in Mississauga, Canada. I’m a Computer Science undergrad at{' '}
              <span className="text-white font-semibold">McMaster University</span>, but most
              of my real reps come from side projects; bots, vision pipelines, multiplayer games,
              tiny tools that no one asked for.
            </p>
            <p>
              I’m chasing a career in{' '}
              <span className="text-gradient-gold font-semibold">ML, AI and applied research,</span>{' '}
              the stuff at the messy intersection of math, code and human experience. I have an unhealthy obsession
              with the <span className="text-white font-semibold">details</span>. I also care a lot about design too,
              probably more than I should as an engineer.
            </p>
            <p className="text-white/55 italic">
              Off the pitch: burgers, late-night FIFA, and an indefensible attachment
              with football.
            </p>
          </div>

          {/* Personal grid */}
          <div data-glow className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-0 bg-white/[0.025] border border-white/10 rounded-2xl px-6 py-2 backdrop-blur-md">
            {personal.map((row) => (
              <Field key={row.k} k={row.k} v={row.v} />
            ))}
          </div>

          {/* Traits */}
          <div className="mt-8">
            <span className="font-head text-[11px] tracking-widestPlus text-white/50">PLAYSTYLES</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {traits.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-3 py-1.5 rounded-md text-xs font-head tracking-widest border border-gold-300/40 text-gold-200 bg-gold-300/[0.06] hover:bg-gold-300/[0.12] hover:shadow-glow-gold transition-all"
                >
                  {t.toUpperCase()}
                </motion.span>
              ))}
            </div>
          </div>

          {/* CTA row */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={resume}
              download="Ammaar_Shareef_Resume.pdf"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-fut-gold text-ink-950 font-head tracking-widest text-sm shadow-glow-gold hover:shadow-glow-gold-lg transition-all"
            >
              <FaDownload className="text-sm" />
              <span>SIGN ME (RESUME)</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-sm bg-ink-950/15 text-[10px]">.PDF</span>
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/30 font-head tracking-widest text-sm transition-all"
            >
              VIEW PROJECTS →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dossier;
