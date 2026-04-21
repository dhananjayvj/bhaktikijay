import React from 'react'

export default function SubtleGoldDivider({ className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-md ${className}`} aria-hidden="true">
      <svg viewBox="0 0 480 24" className="h-6 w-full">
        <defs>
          <linearGradient id="gold-divider-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="0.22" stopColor="#D4AF37" stopOpacity="0.18" />
            <stop offset="0.5" stopColor="#D4AF37" stopOpacity="0.32" />
            <stop offset="0.78" stopColor="#D4AF37" stopOpacity="0.18" />
            <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d="M18 12H210" stroke="url(#gold-divider-grad)" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M270 12H462" stroke="url(#gold-divider-grad)" strokeWidth="1.25" strokeLinecap="round" />

        <path
          d="M240 5.5 247.5 12 240 18.5 232.5 12 240 5.5Z"
          fill="#D4AF37"
          fillOpacity="0.22"
          stroke="#D4AF37"
          strokeOpacity="0.35"
          strokeWidth="0.75"
        />
      </svg>
    </div>
  )
}

