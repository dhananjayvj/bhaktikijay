import React, { memo } from 'react'

const variants = {
  cream: {
    wash: 'from-sand/40 via-cream to-mint/30',
    patternOpacity: 0.11,
  },
  mint: {
    wash: 'from-mint/80 via-cream/90 to-sand/25',
    patternOpacity: 0.1,
  },
}

function CornerMark({ className, flipX = false }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      style={flipX ? { transform: 'scaleX(-1)' } : undefined}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="44" stroke="#0F766E" strokeOpacity="0.14" strokeWidth="1" />
      <circle cx="60" cy="60" r="28" stroke="#D97706" strokeOpacity="0.12" strokeWidth="0.9" />
      <path
        d="M60 16v16M60 88v16M16 60h16M88 60h16"
        stroke="#134E4A"
        strokeOpacity="0.1"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M28 28c16 8 32 8 48 0"
        stroke="#D97706"
        strokeOpacity="0.14"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Subtle kolam pattern wash for light content sections */
function SectionDoodleBackdrop({ variant = 'cream' }) {
  const tone = variants[variant] ?? variants.cream

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${tone.wash}`} />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/doodle-pattern-elegant.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '360px 360px',
          opacity: tone.patternOpacity,
        }}
      />
      <CornerMark className="absolute left-0 top-10 h-20 w-20 opacity-60 sm:h-36 sm:w-36 md:left-2" />
      <CornerMark className="absolute right-0 top-16 h-20 w-20 opacity-55 sm:h-32 sm:w-32 md:right-2" flipX />
      <CornerMark className="absolute bottom-8 left-0 h-16 w-16 opacity-50 sm:h-28 sm:w-28" />
      <CornerMark className="absolute bottom-12 right-0 h-16 w-16 opacity-50 sm:h-28 sm:w-28" flipX />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 40%, transparent 0%, transparent 55%, rgba(255, 251, 235, 0.45) 100%)',
        }}
      />
    </div>
  )
}

export default memo(SectionDoodleBackdrop)
