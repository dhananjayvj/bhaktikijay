import React from 'react'
import { motion } from 'framer-motion'

/** Vector corner + flourish art — wine/ivory palette. Use `position="absolute"` inside overlays. */
export default function WeddingDoodles({ position = 'fixed', className = '' }) {
  const pos = position === 'absolute' ? 'absolute inset-0' : 'fixed inset-0'
  return (
    <div aria-hidden="true" className={`pointer-events-none ${pos} z-[1] ${className}`}>
      <motion.svg
        viewBox="0 0 220 220"
        className="absolute left-[-40px] top-[90px] text-invite-wine/25"
        initial={{ opacity: 0, scale: 0.98, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
      >
        <defs>
          <linearGradient id="inviteDoodleGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9a4a5c" stopOpacity="0.4" />
            <stop offset="0.5" stopColor="#7a2e3f" stopOpacity="0.55" />
            <stop offset="1" stopColor="#8b6b7a" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <circle cx="110" cy="110" r="84" fill="none" stroke="url(#inviteDoodleGrad)" strokeWidth="2" />
        <path
          d="M110 42c14 22 14 46 0 68-14-22-14-46 0-68Z"
          fill="none"
          stroke="url(#inviteDoodleGrad)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M48 110c24-10 48-10 72 0-24 10-48 10-72 0Z"
          fill="none"
          stroke="url(#inviteDoodleGrad)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M110 110c26-6 50-2 72 10-26 6-50 2-72-10Z"
          fill="none"
          stroke="url(#inviteDoodleGrad)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M88 156c10-8 18-18 22-28 4 10 12 20 22 28"
          fill="none"
          stroke="url(#inviteDoodleGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>

      <motion.svg
        viewBox="0 0 240 240"
        className="absolute right-[-60px] top-[210px] text-invite-wine/20"
        initial={{ opacity: 0, scale: 0.98, rotate: 4 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.77, 0, 0.175, 1] }}
      >
        <circle cx="120" cy="120" r="72" fill="none" stroke="#7a2e3f" strokeOpacity="0.45" strokeWidth="2" />
        <circle cx="120" cy="120" r="46" fill="none" stroke="#9a4a5c" strokeOpacity="0.35" strokeWidth="2" />
        <path
          d="M120 110c10-20 36-8 26 12-4 8-12 14-26 18-14-4-22-10-26-18-10-20 16-32 26-12Z"
          fill="none"
          stroke="#7a2e3f"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M170 70c6-6 16-2 12 7-2 4-7 7-12 9-5-2-10-5-12-9-4-9 6-13 12-7Z"
          fill="none"
          stroke="#9a4a5c"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M60 166c6-6 16-2 12 7-2 4-7 7-12 9-5-2-10-5-12-9-4-9 6-13 12-7Z"
          fill="none"
          stroke="#9a4a5c"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </motion.svg>

      <motion.svg
        viewBox="0 0 900 200"
        className="absolute bottom-[-30px] left-1/2 h-[180px] w-[900px] -translate-x-1/2 opacity-[0.22]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.25, ease: [0.77, 0, 0.175, 1] }}
      >
        <path
          d="M40 120c70-60 160-60 230 0s160 60 230 0 160-60 230 0"
          fill="none"
          stroke="#7a2e3f"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M60 140c65-45 145-45 210 0s145 45 210 0 145-45 210 0"
          fill="none"
          stroke="#9a4a5c"
          strokeOpacity="0.3"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  )
}
