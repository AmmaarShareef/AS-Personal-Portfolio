import { motion } from 'framer-motion';
import pfp from '../assets/pfp.jpeg';

/**
 * FUT-style Ultimate Team card.
 * Stats reinterpreted as developer attributes.
 */
const stats = [
  { key: 'PRG', label: 'Programming', value: 92 },
  { key: 'AI',  label: 'ML / AI',     value: 89 },
  { key: 'DSA', label: 'Algorithms',  value: 86 },
  { key: 'DSN', label: 'Design / UX', value: 90 },
  { key: 'GRT', label: 'Grit',        value: 95 },
  { key: 'CRE', label: 'Creativity',  value: 93 },
];

const PlayerCard = () => {
  return (
    <motion.div
      data-glow
      initial={{ opacity: 0, y: 40, rotateY: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ rotateY: 6, rotateX: -3, translateY: -6 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className="relative w-[320px] h-[480px] mx-auto"
    >
      {/* Outer ambient glow */}
      <div className="absolute -inset-6 rounded-[36px] blur-3xl opacity-70 bg-gradient-to-br from-gold-300/40 via-transparent to-cyan2-400/30 pointer-events-none" />

      {/* Card frame */}
      <div className="relative w-full h-full rounded-[28px] p-[2px] bg-fut-gold shadow-glow-gold-lg">
        {/* shimmer */}
        <div className="absolute inset-0 rounded-[28px] gold-shimmer pointer-events-none" />

        <div className="relative w-full h-full rounded-[26px] bg-gradient-to-br from-[#1a1407] via-[#0d0c08] to-[#1a1407] overflow-hidden">
          {/* Faint pattern */}
          <div className="absolute inset-0 opacity-30 pitch-grid" />

          {/* Top-left: rating + position */}
          <div className="absolute top-4 left-5 flex flex-col items-center">
            <span className="font-display text-gradient-gold text-[2.75rem] leading-none">87</span>
            <span className="font-head text-gold-200 tracking-widest text-sm mt-0.5">CS</span>
            <div className="mt-1.5 w-7 h-[1.5px] bg-gold-300/70" />
            <div className="mt-1.5 flex flex-col gap-0.5 items-center">
              <span className="text-[9px] font-head tracking-widest text-gold-200/80">DEV</span>
              <span className="text-[9px] font-head tracking-widest text-gold-200/80">ICON</span>
            </div>
          </div>

          {/* Top-right: nation/club crests (decorative) */}
          <div className="absolute top-4 right-5 flex flex-col items-center gap-1.5">
            <div className="w-7 h-7 rounded-full border-gold border bg-ink-900/70 flex items-center justify-center text-[8px] font-head text-gold-200">
              UAE
            </div>
            <div className="w-7 h-7 rounded-full border-gold border bg-ink-900/70 flex items-center justify-center text-[8px] font-head text-gold-200">
              CAN
            </div>
            <div className="w-7 h-7 rounded-full border-gold border bg-ink-900/70 flex items-center justify-center text-[8px] font-head text-gold-200">
              MAC
            </div>
          </div>

          {/* Portrait — shrunk so it doesn't collide with side chips */}
          <div className="absolute top-7 left-1/2 -translate-x-1/2 w-[140px] h-[140px]">
            <div className="absolute inset-0 rounded-full bg-gold-300/20 blur-2xl" />
            <img
              src={pfp}
              alt="Ammaar"
              className="relative w-full h-full object-cover rounded-full border-2 border-gold-300/70 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* Name plate */}
          <div className="absolute top-[182px] left-0 right-0 text-center">
            <div className="mx-6 hud-divider mb-1.5" />
            <h3 className="font-display text-gradient-gold text-[1.65rem] tracking-wide">
              AMMAAR SHAREEF
            </h3>
            <div className="mx-6 hud-divider mt-1.5" />
          </div>

          {/* Stats grid — moved up to close the gap */}
          <div className="absolute top-[238px] bottom-5 left-6 right-6 grid grid-cols-2 gap-x-6 content-start">
            {stats.map((s) => (
              <div key={s.key} className="flex items-baseline justify-between text-gold-100 py-[7px]">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-[1.5rem] text-gradient-gold leading-none">
                    {s.value}
                  </span>
                  <span className="font-head text-[11px] tracking-widest text-gold-200/85">
                    {s.key}
                  </span>
                </div>
                <span className="font-head text-[9px] tracking-widest text-white/35">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom edge glow */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold-300 to-transparent opacity-60" />
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerCard;
