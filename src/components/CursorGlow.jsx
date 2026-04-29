import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Gold halo that follows the cursor, but only when hovering an
 * element marked with `data-glow` (info cards, panels, etc.).
 */
const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target?.closest?.('[data-glow]');
      setActive(!!target);
    };
    const onLeave = () => setActive(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-[1] mix-blend-screen"
      animate={{
        x: pos.x - 220,
        y: pos.y - 220,
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.85,
      }}
      transition={{
        x: { type: 'tween', ease: 'backOut', duration: 0.18 },
        y: { type: 'tween', ease: 'backOut', duration: 0.18 },
        opacity: { duration: 0.28, ease: 'easeOut' },
        scale: { duration: 0.28, ease: 'easeOut' },
      }}
      style={{
        width: 440,
        height: 440,
        background:
          'radial-gradient(circle, rgba(245,208,97,0.22) 0%, rgba(245,208,97,0.06) 35%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  );
};

export default CursorGlow;
