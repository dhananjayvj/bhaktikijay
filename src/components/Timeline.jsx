import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import MandapArchIcon from './MandapArchIcon.jsx'
import { BaraatIcon, HaldiIcon, MehendiIcon, PinIcon, ReceptionIcon, SangeetIcon } from './EventIcons.jsx'
import { easeOutCubic, fadeUpDuration, gpuLayerStyle, sectionReveal, staggerChildren, viewportOnce } from '../constants/motion.js'

const MAPS_PRESTIGE_LAKE_RIDGE = 'https://maps.app.goo.gl/vyDCL9iZnM9jVQpb9'
const MAPS_SDM_KALYANA = 'https://maps.app.goo.gl/p7yrs8a2dHogMKHp9'

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

const cardReveal = {
  hidden: { opacity: 0, x: -48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: fadeUpDuration, ease: easeOutCubic },
  },
}

const cardRevealRight = {
  hidden: { opacity: 0, x: 48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: fadeUpDuration, ease: easeOutCubic },
  },
}

const timelineListStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren: 0.08 },
  },
}

function EventCard({ event, side, index }) {
  const ref = useRef(null)

  const [burstOpen, setBurstOpen] = useState(false)
  const [burstId, setBurstId] = useState(0)

  const triggerBurst = () => {
    setBurstId((v) => v + 1)
    setBurstOpen(true)
    window.setTimeout(() => setBurstOpen(false), 900)
  }

  const cardVariants = side === 'right' ? cardRevealRight : cardReveal

  return (
    <motion.div ref={ref} className="relative" variants={cardVariants}>
      <div
        data-no-sparkle="true"
        className={[
          'soft-card',
          'p-5 md:p-6',
          'relative',
        ].join(' ')}
      >
        <motion.div
          className="relative"
          style={gpuLayerStyle}
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse') triggerBurst()
          }}
          onClick={() => triggerBurst()}
        >
          {/* Day badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-cream/80 px-3 py-1">
            <span className="meta-stationery text-xs tracking-[0.18em]">
              {event.dayPill}
            </span>
          </div>

          <div className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
            <div className="min-w-0 w-full flex-1 sm:pr-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="min-w-0 max-w-full font-playfair text-stone-900 text-xl font-bold tracking-tight sm:text-2xl">
                  {event.title}
                </h3>
                {event.icon === 'mandap' ? (
                  <MandapArchIcon className="shrink-0 text-[#D4AF37]" size={26} />
                ) : event.icon === 'haldi' ? (
                  <HaldiIcon className="shrink-0 text-[#D4AF37]" size={26} />
                ) : event.icon === 'mehendi' ? (
                  <MehendiIcon className="shrink-0 text-[#2F6F3E]" size={26} />
                ) : event.icon === 'sangeet' ? (
                  <SangeetIcon className="shrink-0 text-[#7A2E3F]" size={26} />
                ) : event.icon === 'baraat' ? (
                  <BaraatIcon className="shrink-0 text-[#111827]" size={26} />
                ) : event.icon === 'reception' ? (
                  <ReceptionIcon className="shrink-0 text-[#8B6B7A]" size={26} />
                ) : null}
              </div>
              <p className="mt-2 font-cormorant text-[0.95rem] font-medium leading-relaxed text-stone-700">
                {event.subtitle}
              </p>
            </div>

            <div className="flex shrink-0 flex-row items-center justify-between gap-3 border-t border-gold/15 pt-2.5 sm:flex-col sm:items-end sm:justify-start sm:gap-0.5 sm:border-t-0 sm:pt-0 sm:text-right">
              <div className="meta-stationery">{event.time}</div>
              <div className="flex flex-col items-end gap-0.5 text-right">
                <a
                  data-no-sparkle="true"
                  href={event.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Open directions in maps (${event.pinLabel})`}
                  className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full text-terra-light transition-colors duration-200 hover:bg-terra/10 hover:text-terra-deep"
                >
                  <PinIcon size={22} />
                </a>
                <span className="meta-stationery max-w-[9.5rem] text-[0.65rem] leading-snug tracking-[0.14em]">
                  {event.pinLabel}
                </span>
              </div>
            </div>
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
                      transition={{ duration: 0.75, delay: i * 0.06, ease: easeOutCubic }}
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
    </motion.div>
  )
}

const MemoEventCard = memo(EventCard)

function Timeline() {
  const mdUp = useIsMdUp()

  const events = useMemo(
    () => [
      {
        dayPill: 'Mar 11 · Thursday',
        day: 1,
        title: 'Haldi',
        icon: 'haldi',
        burst: ['✦', '✧', '✦', '✧'],
        time: '3:30 PM',
        subtitle: 'Turmeric, tradition, and laughter.',
        mapsHref: MAPS_PRESTIGE_LAKE_RIDGE,
        pinLabel: 'PLR Clubhouse',
      },
      {
        dayPill: 'Mar 11 · Thursday',
        day: 1,
        title: 'Mehendi',
        icon: 'mehendi',
        burst: ['✦', '✧', '✦', '✧'],
        time: '5:30 PM',
        subtitle: 'A celebration of color and henna.',
        mapsHref: MAPS_PRESTIGE_LAKE_RIDGE,
        pinLabel: 'PLR Clubhouse',
      },
      {
        dayPill: 'Mar 13 · Saturday',
        day: 2,
        title: 'Sangeet',
        icon: 'sangeet',
        /** Music-note only — restrained “digital blessing”, not confetti */
        burst: ['✦', '✧', '✦', '✧'],
        time: '2:00 PM',
        subtitle: 'An afternoon of music and dance.',
        mapsHref: MAPS_SDM_KALYANA,
        pinLabel: 'SDM convention hall',
      },
      {
        dayPill: 'Mar 13 · Saturday',
        day: 2,
        title: 'Baraat',
        icon: 'baraat',
        burst: ['✦', '✧', '✦', '✧'],
        time: '5:00 PM',
        subtitle: "Join the groom's procession.",
        mapsHref: MAPS_SDM_KALYANA,
        pinLabel: 'SDM convention hall',
      },
      {
        dayPill: 'Mar 14 · Sunday',
        day: 3,
        title: 'Muhurtham',
        icon: 'mandap',
        burst: ['✦', '✧', '✦', '✧'],
        time: '8:48 AM',
        subtitle: 'The auspicious ceremony.',
        mapsHref: MAPS_SDM_KALYANA,
        pinLabel: 'SDM convention hall',
      },
      {
        dayPill: 'Mar 14 · Sunday',
        day: 3,
        title: 'Reception',
        icon: 'reception',
        burst: ['✦', '✧', '✦', '✧'],
        time: '12:30 PM',
        subtitle: 'A celebratory afternoon to follow.',
        mapsHref: MAPS_SDM_KALYANA,
        pinLabel: 'SDM convention hall',
      },
    ],
    [],
  )

  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.12 })
  const listRef = useRef(null)
  const listInView = useInView(listRef, { once: true, amount: 0.08 })

  return (
    <motion.section
      id="timeline"
      className="defer-heavy-section reveal relative overflow-hidden border-t border-gold/20 bg-cream px-4 py-16 md:px-10 md:py-20"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={sectionReveal}
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
          <p className="section-eyebrow">Mar 11 – 14, 2027</p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={sectionReveal}
            style={gpuLayerStyle}
            className="section-display-light mt-2"
          >
            Celebration timeline
          </motion.h2>
          <p className="section-lead mt-3">Six moments across three days — tap a card for a little sparkle.</p>
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

          <motion.div
            ref={listRef}
            className="space-y-10 md:space-y-16"
            variants={timelineListStagger}
            initial="hidden"
            animate={listInView ? 'show' : 'hidden'}
          >
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
                    <MemoEventCard event={event} side={side} index={i} />
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default memo(Timeline)
