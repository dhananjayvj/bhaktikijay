import React, { memo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionReveal, { RevealItem } from './SectionReveal.jsx'
import SectionDoodleBackdrop from './SectionDoodleBackdrop.jsx'
import { PinIcon } from './EventIcons.jsx'
import { CELEBRATION_DAYS } from '../constants/siteContent.js'
import {
  easeSilk,
  fadeUpDuration,
  gpuLayerStyle,
  sectionReveal,
  staggerChildren,
  viewportOnce,
} from '../constants/motion.js'

function Dot() {
  return (
    <div className="relative flex h-4 w-4 items-center justify-center">
      <div className="relative z-[2] h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_16px_rgba(217,119,6,0.45)]" />
      <motion.div
        className="absolute left-1/2 top-1/2 z-[1] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/45"
        animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}

const dayCardReveal = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: fadeUpDuration, ease: easeSilk },
  },
}

const dayListStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
}

function DayCard({ day, index }) {
  return (
    <motion.article variants={dayCardReveal} className="soft-card relative p-5 md:p-7">
      <p className="meta-stationery">{day.day}</p>
      <h3 className="mt-2 font-playfair text-2xl font-bold text-primary-deep md:text-[1.65rem]">{day.title}</h3>

      <ul className="mt-4 space-y-2 border-t border-gold/20 pt-4" aria-label="Event schedule">
        {day.schedule.map((item) => (
          <li key={item.name} className="flex items-baseline justify-between gap-4">
            <span className="font-lato text-sm font-semibold text-stone-800">{item.name}</span>
            <span className="shrink-0 font-cormorant text-base font-semibold tabular-nums text-terra">{item.time}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 border-t border-gold/20 pt-4">
        <p className="font-lato text-xs font-semibold uppercase tracking-[0.2em] text-muted-fg">Venue</p>
        <p className="mt-1 font-cormorant text-lg font-medium text-stone-800">{day.venue}</p>
      </div>

      <p className="mt-4 font-cormorant text-base font-medium leading-relaxed text-stone-700">{day.tone}</p>

      {day.dressCode ? (
        <p className="mt-3 rounded-xl border border-accent/30 bg-sand/60 px-3 py-2 font-lato text-sm font-medium text-primary-deep">
          {day.dressCode}
        </p>
      ) : null}

      <a
        data-no-sparkle="true"
        href={day.mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={day.mapsLabel}
        className="mt-5 inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 font-lato text-sm font-semibold text-primary-deep transition-colors duration-200 hover:border-primary/40 hover:bg-primary/10"
      >
        <PinIcon size={18} />
        <span>View on maps</span>
      </a>

      <span className="sr-only">{`Celebration day ${index + 1}`}</span>
    </motion.article>
  )
}

function Timeline() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.12 })
  const listRef = useRef(null)
  const listInView = useInView(listRef, { once: true, amount: 0.08 })

  return (
    <SectionReveal
      id="timeline"
      className="defer-heavy-section reveal relative overflow-hidden border-t border-border px-4 py-16 md:px-10 md:py-20"
    >
      <SectionDoodleBackdrop variant="cream" />

      <div className="relative z-[1] mx-auto max-w-5xl">
        <RevealItem className="text-center">
          <p className="section-eyebrow">Mar 11 to 14, 2027</p>
          <div ref={headerRef}>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={sectionReveal}
              style={gpuLayerStyle}
              className="section-display-light mt-2"
            >
              Celebration timeline
            </motion.h2>
          </div>
          <p className="section-lead mt-3">Three days of rituals, music, and celebration in Bengaluru.</p>
        </RevealItem>

        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className="absolute left-5 top-2 bottom-2 w-[2px] md:left-8"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(217,119,6,0.45) 18%, rgba(15,118,110,0.8) 50%, rgba(217,119,6,0.35) 70%, rgba(0,0,0,0) 100%)',
            }}
          />

          <motion.div
            ref={listRef}
            className="space-y-8 md:space-y-10"
            variants={dayListStagger}
            initial="hidden"
            animate={listInView ? 'show' : 'hidden'}
          >
            {CELEBRATION_DAYS.map((day, i) => (
              <div key={day.id} className="relative pl-12 md:pl-16">
                <div className="absolute left-5 top-8 z-[2] md:left-8">
                  <Dot />
                </div>
                <DayCard day={day} index={i} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  )
}

export default memo(Timeline)
