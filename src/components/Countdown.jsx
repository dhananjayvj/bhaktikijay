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

export default function Countdown({ targetIso, className = '', dense = false, intro = null }) {
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
    ? 'flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-4 sm:gap-y-3 md:gap-x-5'
    : 'flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-5'

  const digitClass = dense
    ? 'font-playfair font-black text-invite-wine tabular-nums text-[clamp(0.78rem,2.6vw,1.5rem)] leading-none sm:text-[clamp(1.05rem,3.4vw,2rem)] md:text-[clamp(1.2rem,4vw,2.2rem)]'
    : 'font-playfair font-black text-invite-wine tabular-nums text-[clamp(0.95rem,3.2vw,2rem)] leading-none sm:text-[clamp(1.2rem,4vw,2.2rem)]'

  const labelClass = dense
    ? 'mt-0 font-lato text-[0.6rem] font-semibold uppercase tracking-widest text-invite-ink-soft/85 sm:mt-0.5 sm:text-[0.65rem] md:mt-1 md:text-xs'
    : 'mt-0.5 font-lato text-[0.65rem] font-semibold uppercase tracking-widest text-invite-ink-soft/85 sm:mt-1 sm:text-xs'

  return (
    <div className={`${stackClass} ${className}`.trim()}>
      {intro ? (
        <p
          className={`mb-3 w-full max-w-xl text-center font-lato font-bold uppercase tracking-[0.16em] text-invite-ink ${
            dense
              ? 'text-[0.65rem] leading-snug sm:mb-3.5 sm:text-[0.7rem]'
              : 'mb-4 text-xs tracking-[0.18em] sm:text-sm'
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
                key={`${part.label}-${d}-${digitIdx}`}
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
