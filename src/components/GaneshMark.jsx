import React from 'react'

/**
 * Minimal Ganesh-inspired mark (abstract + symmetrical).
 * Intentionally subtle to avoid overpowering the invitation header.
 */
export default function GaneshMark({ className = '' }) {
  return (
    <div className={`mx-auto ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-8 w-8">
        <defs>
          <linearGradient id="ganesh-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F0D060" stopOpacity="0.55" />
            <stop offset="1" stopColor="#D4AF37" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* halo */}
        <circle cx="60" cy="58" r="34" fill="none" stroke="url(#ganesh-gold)" strokeWidth="1.2" opacity="0.55" />

        {/* crown / tilak */}
        <path
          d="M60 26c6 0 10 4 10 10s-4 10-10 10-10-4-10-10 4-10 10-10Z"
          fill="#D4AF37"
          fillOpacity="0.18"
          stroke="#D4AF37"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
        <path d="M60 30v16" stroke="#D4AF37" strokeOpacity="0.55" strokeWidth="1.1" strokeLinecap="round" />

        {/* abstract ears */}
        <path
          d="M32 50c-6 3-10 9-10 16 0 7 4 13 10 16"
          fill="none"
          stroke="#D4AF37"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M88 50c6 3 10 9 10 16 0 7-4 13-10 16"
          fill="none"
          stroke="#D4AF37"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* trunk / curve */}
        <path
          d="M60 52c0 14-6 14-6 24 0 7 6 10 12 10 7 0 12-4 12-10 0-5-3-8-7-10"
          fill="none"
          stroke="#D4AF37"
          strokeOpacity="0.55"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* subtle base dot */}
        <circle cx="60" cy="92" r="2.2" fill="#D4AF37" fillOpacity="0.28" />
      </svg>
    </div>
  )
}

