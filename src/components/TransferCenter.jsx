import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const channels = [
  {
    id: 'email',
    label: 'Direct Line',
    icon: FaEnvelope,
    handle: 'ammhood1602@gmail.com',
    href: 'mailto:ammhood1602@gmail.com',
    accent: 'gold',
    blurb: 'Click to copy!',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: FaLinkedin,
    handle: '/in/ammaar-shareef',
    href: 'https://www.linkedin.com/in/ammaar-shareef-936922313/',
    accent: 'cyan',
    blurb: 'For recruiters, scouts and people who like blue ticks. Proffesional.',
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: FaGithub,
    handle: '@AmmaarShareef',
    href: 'https://github.com/AmmaarShareef',
    accent: 'cyan',
    blurb: 'Where I commit. Often. Sometimes too late at night, and make the mistake of one full push a lot.',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: FaInstagram,
    handle: '@shafeezy_amr',
    href: 'https://www.instagram.com/shafeezy_amr/',
    accent: 'gold',
    blurb: 'Off-pitch life',
  },
];

const TransferCenter = () => {
  const [toast, setToast] = useState('');

  const handleEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('ammhood1602@gmail.com').then(() => {
      setToast('EMAIL COPIED · ammhood1602@gmail.com');
      setTimeout(() => setToast(''), 2400);
    });
  };

  return (
    <section id="contact" className="relative z-10 px-6 py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-head text-[11px] tracking-widestPlus text-gold-200/80">/ 06</span>
          <span className="hud-divider flex-1" />
          <span className="font-head text-[11px] tracking-widestPlus text-white/45">TRANSFER CENTER</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.9]">
              <span className="text-white">OPEN TO </span>
              <span className="text-gradient-gold">OFFERS.</span>
            </h2>
            <p className="mt-6 text-white/65 leading-relaxed max-w-md">
              I’m actively looking for{' '}
              <span className="text-white font-semibold">summer 2026 internships</span>{' '}
              in ML, AI, or anything where I get to ship real software.
              I work hard, I move fast, and I take feedback well.
            </p>

            <div data-glow className="mt-8 rounded-2xl border-gold border bg-gradient-to-br from-gold-300/[0.08] via-transparent to-gold-300/[0.02] p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-head text-[11px] tracking-widestPlus text-gold-200">CONTRACT STATUS</span>
                <span className="px-2.5 py-1 rounded-md font-head text-[10px] tracking-widest border-gold border text-gold-200 bg-gold-300/10">
                  AVAILABLE
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                {[
                  ['Wage',   '$$$'],
                  ['Length', '4 / 8 / 12 mo'],
                  ['Mode',   'On-site · Remote'],
                  ['Region', 'GTA · NA'],
                  ['Notice', 'Immediate'],
                  ['Visa',   'Permanent Resident'],
                ].map(([k,v]) => (
                  <div key={k} className="flex flex-col">
                    <span className="font-head text-[10px] tracking-widest text-white/45">{k.toUpperCase()}</span>
                    <span className="text-sm text-white/90">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {channels.map((c, i) => {
              const Icon = c.icon;
              const gold = c.accent === 'gold';
              return (
                <motion.a
                  key={c.id}
                  data-glow
                  href={c.href}
                  onClick={c.id === 'email' ? handleEmail : undefined}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className={`group relative block rounded-2xl border ${gold ? 'border-gold-300/40' : 'border-cyan2-400/40'} bg-white/[0.025] backdrop-blur-md p-6 transition-all duration-300 ${gold ? 'hover:shadow-glow-gold' : 'hover:shadow-glow-cyan'}`}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-11 h-11 rounded-xl border ${gold ? 'border-gold-300/40 bg-gold-300/10 text-gold-200' : 'border-cyan2-400/40 bg-cyan2-400/10 text-cyan2-400'} flex items-center justify-center text-xl`}>
                      <Icon />
                    </div>
                    <FaArrowRight className="text-white/30 group-hover:text-white/80 group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="font-head text-[10px] tracking-widestPlus text-white/45 mb-1">
                    {c.label.toUpperCase()}
                  </div>
                  <div className={`font-head text-lg ${gold ? 'text-gold-100' : 'text-cyan2-300'} tracking-wide mb-2`}>
                    {c.handle}
                  </div>
                  <p className="text-[13px] text-white/60 leading-relaxed">{c.blurb}</p>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-head tracking-widest text-white/35">
          <span>© AMMAAR SHAREEF · 2025/26</span>
          <span>BUILT WITH REACT · TAILWIND · FRAMER · FIFA-THEMED</span>
          <span>v2.0 · FUT EDITION</span>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-full bg-fut-gold text-ink-950 font-head text-xs tracking-widest shadow-glow-gold"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TransferCenter;
