import React from 'react'
import { motion } from 'framer-motion'

const fadeIn = { duration: 1.4, ease: [0.16, 1, 0.3, 1] }

function CornerFlourish({ className, flipX = false, flipY = false }) {
  const transform = [flipX ? 'scaleX(-1)' : '', flipY ? 'scaleY(-1)' : ''].filter(Boolean).join(' ') || undefined

  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      style={{ transform }}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="flourishGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FBBF24" stopOpacity="0.35" />
          <stop offset="1" stopColor="#D97706" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="flourishTeal" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0F766E" stopOpacity="0.28" />
          <stop offset="1" stopColor="#134E4A" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <path
        d="M12 12c28 0 52 18 60 44"
        stroke="url(#flourishGold)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12 12c0 28 18 52 44 60"
        stroke="url(#flourishTeal)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M28 28c14 6 26 18 32 32"
        stroke="url(#flourishGold)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2.5" fill="#FBBF24" fillOpacity="0.22" />
      <circle cx="52" cy="12" r="1.5" fill="#0F766E" fillOpacity="0.2" />
      <circle cx="12" cy="52" r="1.5" fill="#0F766E" fillOpacity="0.2" />
    </svg>
  )
}

/** Delicate corner flourishes for the opening envelope backdrop */
export default function WeddingDoodles({ position = 'fixed', className = '' }) {
  const pos = position === 'absolute' ? 'absolute inset-0' : 'fixed inset-0'

  return (
    <div aria-hidden="true" className={`pointer-events-none ${pos} z-[1] overflow-hidden ${className}`}>
      <motion.div
        className="absolute left-[-8px] top-[12%] h-28 w-28 sm:h-36 sm:w-36 md:left-4 md:top-[14%]"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...fadeIn, delay: 0.05 }}
      >
        <CornerFlourish className="h-full w-full" />
      </motion.div>

      <motion.div
        className="absolute right-[-8px] top-[18%] h-28 w-28 sm:h-36 sm:w-36 md:right-4"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...fadeIn, delay: 0.12 }}
      >
        <CornerFlourish className="h-full w-full" flipX />
      </motion.div>

      <motion.div
        className="absolute bottom-[14%] left-[-8px] h-24 w-24 sm:h-32 sm:w-32 md:bottom-[16%] md:left-4"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...fadeIn, delay: 0.18 }}
      >
        <CornerFlourish className="h-full w-full" flipY />
      </motion.div>

      <motion.div
        className="absolute bottom-[10%] right-[-8px] h-24 w-24 sm:h-32 sm:w-32 md:bottom-[12%] md:right-4"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...fadeIn, delay: 0.24 }}
      >
        <CornerFlourish className="h-full w-full" flipX flipY />
      </motion.div>
    </div>
  )
}
