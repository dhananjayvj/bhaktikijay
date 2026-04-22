import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import MandapArchIcon from './MandapArchIcon.jsx'
import { BaraatIcon, HaldiIcon, MehendiIcon, ReceptionIcon, SangeetIcon } from './EventIcons.jsx'

function useIsMdUp() {
  const [mdUp, setMdUp] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const set = () => setMdUp(mq.matches)
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])
  return mdUp
}

function Dot() {
  return (
    <div className="relative flex h-4 w-4 items-center justify-center">
      <div className="relative z-[2] h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_16px_rgba(212,175,55,0.55)]" />
      <motion.div
        className="absolute left-1/2 top-1/2 z-[1] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/45"
        animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}

function EventCard({ event, side, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  const [burstOpen, setBurstOpen] = useState(false)
  const [burstId, setBurstId] = useState(0)

  const xOffset = side === 'left' ? -60 : 60

  const triggerBurst = () => {
    setBurstId((v) => v + 1)
    setBurstOpen(true)
    window.setTimeout(() => setBurstOpen(false), 900)
  }

  return (
    <div ref={ref} className="relative">
      <div
        data-no-sparkle="true"
        className={[
          'rounded-2xl border border-gold/25 bg-cream/90 backdrop-blur-sm shadow-sm',
          'p-5 md:p-6',
          'relative',
        ].join(' ')}
      >
        <motion.div
          initial={{ opacity: 0, x: xOffset }}
          animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : xOffset }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          className="relative"
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse') triggerBurst()
          }}
          onClick={() => triggerBurst()}
        >
          {/* Day badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-cream/80 px-3 py-1">
            <span className="font-cinzel text-gold-dark text-xs font-bold tracking-wide">
              {event.dayPill}
            </span>
          </div>

          <div className="mt-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="min-w-0 font-playfair text-stone-900 text-xl font-black tracking-tight">
                    {event.title}
                  </h3>
                  {event.icon === 'mandap' ? (
                    <MandapArchIcon className="shrink-0" size={28} />
                  ) : event.icon === 'haldi' ? (
                    <HaldiIcon className="shrink-0 opacity-85" size={28} />
                  ) : event.icon === 'mehendi' ? (
                    <MehendiIcon className="shrink-0 opacity-85" size={28} />
                  ) : event.icon === 'sangeet' ? (
                    <SangeetIcon className="shrink-0 opacity-85" size={28} />
                  ) : event.icon === 'baraat' ? (
                    <BaraatIcon className="shrink-0 opacity-85" size={28} />
                  ) : event.icon === 'reception' ? (
                    <ReceptionIcon className="shrink-0 opacity-85" size={28} />
                  ) : null}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <div className="font-lato text-terra text-sm font-semibold tracking-widest uppercase">
                  {event.time}
                </div>
              </div>
            </div>

            <p className="mt-2 font-cormorant text-stone-800/70 text-sm leading-relaxed">
              {event.subtitle}
            </p>
          </div>

          <div className="relative mt-3 h-0">
            <AnimatePresence>
              {burstOpen && (
                <div className="pointer-events-none absolute right-2 top-0 flex">
                  {event.burst.map((sym, i) => (
                    <motion.span
                      key={`${burstId}-${i}`}
                      initial={{ y: 0, opacity: 1, x: i % 2 === 0 ? -8 : 8 }}
                      animate={{ y: -42 - i * 6, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.75, delay: i * 0.06, ease: 'easeOut' }}
                      className="absolute text-[18px] leading-none"
                    >
                      {sym}
                    </motion.span>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <span className="sr-only">{`Timeline event ${index + 1}`}</span>
      </div>
    </div>
  )
}

export default function Timeline() {
  const mdUp = useIsMdUp()

  const events = useMemo(
    () => [
      {
        dayPill: 'Feb 23',
        day: 1,
        title: 'Haldi',
        icon: 'haldi',
        burst: ['✦', '✧', '✦', '✧'],
        time: '11:00 AM',
        subtitle: 'Turmeric, tradition, and laughter.',
      },
      {
        dayPill: 'Feb 23',
        day: 1,
        title: 'Mehendi',
        icon: 'mehendi',
        burst: ['✦', '✧', '✦', '✧'],
        time: '5:00 PM',
        subtitle: 'A celebration of color and henna.',
      },
      {
        dayPill: 'Feb 25',
        day: 2,
        title: 'Sangeet',
        icon: 'sangeet',
        /** Music-note only — restrained “digital blessing”, not confetti */
        burst: ['✦', '✧', '✦', '✧'],
        time: '3:00 PM',
        subtitle: 'An evening of music and dance.',
      },
      {
        dayPill: 'Feb 25',
        day: 2,
        title: 'Baraat',
        icon: 'baraat',
        burst: ['✦', '✧', '✦', '✧'],
        time: '5:30 PM',
        subtitle: "Join the groom's procession.",
      },
      {
        dayPill: 'Feb 26',
        day: 3,
        title: 'Muhurtham',
        icon: 'mandap',
        burst: ['✦', '✧', '✦', '✧'],
        time: '8:50 AM',
        subtitle: 'The auspicious ceremony.',
      },
      {
        dayPill: 'Feb 26',
        day: 3,
        title: 'Reception',
        icon: 'reception',
        burst: ['✦', '✧', '✦', '✧'],
        time: '12:30 PM',
        subtitle: 'A celebratory evening to follow.',
      },
    ],
    [],
  )

  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.12 })

  return (
    <motion.section
      id="timeline"
      className="defer-heavy-section reveal relative overflow-hidden border-t border-gold/20 bg-cream px-4 py-16 md:px-10 md:py-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <svg
          viewBox="0 0 260 260"
          className="absolute right-[-70px] top-[-60px] w-[260px] opacity-20"
          fill="none"
        >
          <circle cx="130" cy="130" r="96" stroke="#D4AF37" strokeOpacity="0.45" strokeWidth="2" />
          <circle cx="130" cy="130" r="62" stroke="#E2725B" strokeOpacity="0.25" strokeWidth="2" />
          <path
            d="M130 78c10-20 36-8 26 12-4 8-12 14-26 18-14-4-22-10-26-18-10-20 16-32 26-12Z"
            stroke="#D4AF37"
            strokeOpacity="0.35"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M88 170c14-12 26-28 32-44 6 16 18 32 32 44"
            stroke="#E2725B"
            strokeOpacity="0.25"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-5xl">
        <div ref={headerRef} className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="font-cinzel text-terra text-3xl font-bold tracking-wide md:text-4xl"
          >
            Celebration Timeline
          </motion.h2>
        </div>

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-5 top-2 bottom-2 w-[2px] md:left-1/2 md:-translate-x-1/2"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(212,175,55,0.45) 18%, rgba(212,175,55,1) 50%, rgba(240,208,96,0.35) 70%, rgba(0,0,0,0) 100%)',
            }}
          />

          <div className="space-y-10 md:space-y-16">
            {events.map((event, i) => {
              const side = mdUp ? (i % 2 === 0 ? 'left' : 'right') : 'left'
              const cardSideClasses =
                side === 'left'
                  ? 'md:pr-[4.5rem] md:pl-0'
                  : 'md:pl-[4.5rem] md:pr-0 md:ml-auto'

              return (
                <div key={`${event.title}-${event.time}-${i}`} className="relative">
                  <div
                    className={[
                      'absolute top-6 z-[2]',
                      'left-5 md:left-1/2 md:-translate-x-1/2',
                    ].join(' ')}
                  >
                    <Dot />
                  </div>

                  <div className={`pl-12 pr-2 ${cardSideClasses} md:pl-0 md:pr-0`}>
                    <EventCard event={event} side={side} index={i} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
