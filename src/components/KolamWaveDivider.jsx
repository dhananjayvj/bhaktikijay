import React, { useId } from 'react'
import { motion } from 'framer-motion'

/** Decorative wave / kolam line used in Hero and invitation card back */
export default function KolamWaveDivider({ className = '', compact = false }) {
  const gid = useId()
  const gradId = `kolam-grad-${gid.replace(/:/g, '')}`

  return (
    <div aria-hidden="true" className={`relative mx-auto mt-0 max-w-[720px] ${className}`}>
      <svg viewBox="0 0 800 80" className={`w-full ${compact ? 'max-h-[52px]' : ''}`}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#7a2e3f" stopOpacity="0.35" />
            <stop offset="0.35" stopColor="#9a4a5c" stopOpacity="0.7" />
            <stop offset="1" stopColor="#8b6b7a" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <motion.path
          d="M10 40 C 90 10, 150 70, 230 40 S 370 70, 450 40 S 590 10, 770 40"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="6 10"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -160 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
        <motion.path
          d="M10 55 C 100 25, 170 85, 250 55 S 410 85, 490 55 S 620 25, 770 55"
          fill="none"
          stroke="#8b6b7a"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2 12"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -220 }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </div>
  )
}
