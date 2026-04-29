import { motion } from 'framer-motion';
import meImg from '../assets/me1.png';

const HUDStat = ({ label, value, accent = 'gold' }) => (
  <div className="flex flex-col items-center min-w-[58px]">
    <span
      className={`font-display text-3xl md:text-4xl leading-none ${
        accent === 'gold' ? 'text-gradient-gold' : 'text-gradient-cyan'
      }`}
    >
      {value}
    </span>
    <span className="mt-1 font-head text-[10px] md:text-[11px] tracking-widest text-white/55">
      {label}
    </span>
  </div>
);

const Hero = () => {
  return (
    <section
      id="profile"
      className="relative w-full"
    >
      {/* Banner image — banner-cropped with object-cover (no vertical stretch) */}
      <div className="relative w-full overflow-hidden bg-ink-950 aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9]">
        {/* The image is lifted slightly via object-position so some of the
            torso/lower body gets pulled up into view while the head stays framed. */}
        <motion.img
          src={meImg}
          alt="Ammaar Shareef"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{ objectPosition: 'center 32%' }}
          draggable="false"
        />

        {/* Top dark fade — restored, classic shape */}
        <div
          className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(6,7,10,1) 0%, rgba(6,7,10,0.85) 30%, rgba(6,7,10,0.45) 65%, rgba(6,7,10,0) 100%)',
          }}
        />
        {/* Bottom dark fade — heavier so it merges into the page */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[55%] pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(6,7,10,1) 0%, rgba(6,7,10,0.95) 22%, rgba(6,7,10,0.6) 55%, rgba(6,7,10,0) 100%)',
          }}
        />
        {/* Side soft vignettes */}
        <div className="absolute inset-y-0 left-0 w-[18%] pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(6,7,10,0.85), transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-[18%] pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgba(6,7,10,0.85), transparent)' }} />

        {/* HUD ticker — fixed near the top of the section */}
        <div className="absolute top-[68px] md:top-[78px] left-0 right-0 px-6 z-10">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between text-[10px] md:text-[11px] font-head tracking-widest text-white/50">
            <span>MATCHDAY · {new Date().toLocaleDateString('en-CA', { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase()}</span>
            <span className="hidden sm:flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose2-400 animate-pulseGlow" />
              LIVE · BUILDING
            </span>
            <span className="hidden md:inline">SEASON · 2025/26</span>
          </div>
        </div>
      </div>

      {/* Floating identity block — overlaps banner bottom */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 -mt-24 md:-mt-40 lg:-mt-48 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex flex-col items-center text-center"
        >
          {/* Position chips */}
          <div className="flex items-center gap-2 mb-5">
            {['SWE', 'ML', 'AI'].map((p, i) => (
              <div
                key={p}
                className={`px-3 py-1 rounded-md font-head text-[11px] tracking-widest border ${
                  i === 0
                    ? 'border-gold text-gold-200 bg-gold-300/10 shadow-glow-gold'
                    : 'border-white/15 text-white/70 bg-white/[0.03]'
                }`}
              >
                {p}
              </div>
            ))}
          </div>

          {/* Name — huge condensed display */}
          <h1 className="font-display tracking-tight leading-[0.85] text-white">
            <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-[8.5rem]">
              AMMAAR
            </span>
            <span className="block text-gradient-gold text-5xl sm:text-6xl md:text-8xl lg:text-[8.5rem] -mt-1">
              SHAREEF
            </span>
          </h1>

          <div className="mt-4 flex items-center gap-3 text-[11px] md:text-xs font-head tracking-widest text-white/60 uppercase">
            <span>McMaster Univ.</span>
            <span className="w-1 h-1 rounded-full bg-gold-300/70" />
            <span>Mississauga, ON</span>
            <span className="w-1 h-1 rounded-full bg-gold-300/70" />
            <span>Right-footed dev</span>
          </div>

          {/* HUD stat row */}
          <div className="mt-8 w-full max-w-3xl">
            <div className="hud-divider mb-5" />
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-y-5">
              <HUDStat label="OVERALL" value="87" />
              <HUDStat label="POTENTIAL" value="98" accent="cyan" />
              <HUDStat label="AGE" value="19" />
              <HUDStat label="HEIGHT" value="5'9" />
              <HUDStat label="FOOT" value="R" />
              <HUDStat label="LEAGUE" value="CS" accent="cyan" />
            </div>
            <div className="hud-divider mt-5" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
