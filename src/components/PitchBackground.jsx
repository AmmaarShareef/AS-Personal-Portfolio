const PitchBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-ink-950" />

      {/* Subtle grid */}
      <div className="absolute inset-0 pitch-grid opacity-60" />

      {/* Gold halo top */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full blur-3xl opacity-[0.18]"
        style={{
          background:
            'radial-gradient(closest-side, rgba(245,208,97,0.85), transparent 70%)',
        }}
      />
      {/* Cyan halo bottom-right */}
      <div
        className="absolute -bottom-40 -right-20 w-[800px] h-[800px] rounded-full blur-3xl opacity-[0.12]"
        style={{
          background:
            'radial-gradient(closest-side, rgba(94,233,255,0.7), transparent 70%)',
        }}
      />
      {/* Rose accent left */}
      <div
        className="absolute top-[55%] -left-40 w-[560px] h-[560px] rounded-full blur-3xl opacity-[0.10]"
        style={{
          background:
            'radial-gradient(closest-side, rgba(255,77,109,0.7), transparent 70%)',
        }}
      />

      {/* Faint vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Noise */}
      <div className="absolute inset-0 noise opacity-40 mix-blend-overlay" />
    </div>
  );
};

export default PitchBackground;
