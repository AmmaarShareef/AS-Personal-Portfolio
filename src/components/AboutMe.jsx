import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import resume from '../assets/resume.pdf';

const AboutMe = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const titleRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center px-6 py-10 relative z-10">

      {/* Name Title with Flashlight Effect */}
      <div
        ref={titleRef}
        className="relative mb-12 cursor-default select-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Blurred Layer (Always visible, blends with bg) */}
        <h1 className="text-5xl md:text-7xl font-bold text-center text-white/20 tracking-tight blur-[4px] transition-all duration-500">
          AMMAAR SHAREEF
        </h1>

        {/* Sharp Layer (Revealed by mask) */}
        <motion.h1
          className="absolute inset-0 text-5xl md:text-7xl font-bold text-center text-white tracking-tight"
          animate={{
            WebkitMaskImage: isHovering
              ? `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
              : `radial-gradient(circle 0px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
        >
          AMMAAR SHAREEF
        </motion.h1>
      </div>

      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative gradient blob */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-4xl md:text-6xl font-bold mb-8 cursor-default inline-block">
            About Me
          </h2>

          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              I am a <span className="text-white font-semibold">Computer Science undergrad</span> at McMaster University,
              currently focusing on improving my problem-solving skills, specifically in programming.
            </p>
            <p>
              I am also dabbling in several different fields and areas of technology in general, leaning towards
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 font-bold"> ML/AI</span>.
              Always learning, and I always love a challenge. Glad to know you actually decided to read this.
            </p>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="pt-4 border-t border-white/10 mt-4">
                    I lived and studied in the UAE for 15 years. High school in Canada, based in Mississauga. First year at Mac.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm font-medium text-purple-400 hover:text-pink-400 transition-colors flex items-center gap-2"
            >
              {isExpanded ? 'Show Less' : 'Learn More'}
              <svg
                className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex justify-center"
        >
          <a
            href={resume}
            download="Ammaar_Shareef_Resume.pdf"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all transform hover:scale-105"
          >
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
