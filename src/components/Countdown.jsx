import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const easeSmooth = [0.77, 0, 0.175, 1]

function AnimatedDigit({ value, className, digitKey }) {
  return (
    <motion.span
      key={digitKey}
      className={className}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: easeSmooth }}
    >
      {value}
    </motion.span>
  )
}

export default function Countdown({ targetIso, className = '' }) {
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

  return (
    <div className={`mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:mt-8 sm:gap-x-5 ${className}`}>
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
                key={`${part.label}-${d}-${digitIdx}`}
                value={d}
                digitKey={`${idx}-${digitIdx}-${d}`}
                className="font-playfair font-black text-invite-wine tabular-nums text-[clamp(0.95rem,3.2vw,2rem)] leading-none sm:text-[clamp(1.2rem,4vw,2.2rem)]"
              />
            ))}
          </div>
          <div className="mt-0.5 font-lato text-[0.65rem] font-semibold uppercase tracking-widest text-invite-ink-soft/85 sm:mt-1 sm:text-xs">
            {part.label}
          </div>
        </div>
      ))}
    </div>
  )
}
