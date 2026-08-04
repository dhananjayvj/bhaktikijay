import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { easeOutCubic } from '../constants/motion.js'

function AnimatedDigit({ value, className, digitKey }) {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`} style={{ minWidth: '0.55em' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digitKey}
          className="inline-block tabular-nums"
          initial={{ y: -14, opacity: 0, filter: 'blur(3px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: 14, opacity: 0, filter: 'blur(3px)' }}
          transition={{ duration: 0.38, ease: easeOutCubic }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Countdown({
  targetIso,
  className = '',
  dense = false,
  intro = null,
  heroReadable = false,
}) {
  const target = useMemo(() => new Date(targetIso), [targetIso])
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const { days, hours, minutes, seconds } = useMemo(() => {
    const diffMs = Math.max(0, target.getTime() - now)
    const totalSeconds = Math.floor(diffMs / 1000)
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return { days, hours, minutes, seconds }
  }, [now, target])

  const daysStr = String(days).padStart(2, '0')
  const hoursStr = String(hours).padStart(2, '0')
  const minutesStr = String(minutes).padStart(2, '0')
  const secondsStr = String(seconds).padStart(2, '0')

  const stackClass = dense
    ? 'mt-0 w-full flex flex-col items-center'
    : 'mt-6 w-full flex flex-col items-center sm:mt-8'

  const digitsRowClass = dense
    ? 'grid w-full max-w-sm grid-cols-4 gap-x-1 gap-y-2 sm:max-w-none sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-4 sm:gap-y-3 md:gap-x-5'
    : 'grid w-full max-w-md grid-cols-4 gap-x-2 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-5'

  const digitClass = dense
    ? `${heroReadable ? 'invite-countdown-digit' : 'letterpress-ink font-playfair font-black text-invite-wine'} tabular-nums text-[clamp(0.78rem,2.6vw,1.5rem)] leading-none sm:text-[clamp(1.05rem,3.4vw,2rem)] md:text-[clamp(1.2rem,4vw,2.2rem)]`
    : `${heroReadable ? 'invite-countdown-digit' : 'letterpress-ink font-playfair font-black text-invite-wine'} tabular-nums text-[clamp(0.95rem,3.2vw,2rem)] leading-none sm:text-[clamp(1.2rem,4vw,2.2rem)]`

  const labelClass = dense
    ? `${heroReadable ? 'invite-countdown-label' : 'meta-stationery letterpress-ink'} mt-1`
    : `${heroReadable ? 'invite-countdown-label' : 'meta-stationery letterpress-ink'} mt-1.5`

  return (
    <div className={`${stackClass} ${className}`.trim()}>
      {intro ? (
        <p
          className={`${heroReadable ? 'invite-countdown-intro' : 'meta-stationery letterpress-ink'} mb-4 w-full max-w-xl text-center ${
            dense ? 'sm:mb-5' : 'mb-5'
          }`}
        >
          {intro}
        </p>
      ) : null}
      <div className={digitsRowClass}>
      {[
        { label: 'Days', str: daysStr },
        { label: 'Hours', str: hoursStr },
        { label: 'Minutes', str: minutesStr },
        { label: 'Seconds', str: secondsStr },
      ].map((part, idx) => (
        <div key={part.label} className="text-center">
          <div className="flex items-baseline justify-center gap-0.5">
            {part.str.split('').map((d, digitIdx) => (
              <AnimatedDigit
                key={`${part.label}-${digitIdx}`}
                value={d}
                digitKey={`${idx}-${digitIdx}-${d}`}
                className={digitClass}
              />
            ))}
          </div>
          <div className={labelClass}>{part.label}</div>
        </div>
      ))}
      </div>
    </div>
  )
}
